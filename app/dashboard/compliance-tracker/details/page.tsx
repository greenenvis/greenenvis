"use client";

import { Suspense } from "react";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../../supabase";
import { validateDocument } from "@/lib/document-validator";

function ComplianceDetailsContent() {
  const router = useRouter();
  const [complianceId, setComplianceId] = useState<string | null>(null);
  console.log("Compliance ID:", complianceId);

  const [compliance, setCompliance] = useState<any>(null);
  const [document, setDocument] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressText, setProgressText] = useState("");
  const [openApplicable, setOpenApplicable] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setComplianceId(params.get("id"));
    }
  }, []);

  useEffect(() => {
    if (complianceId) {
      loadCompliance();
    }
  }, [complianceId]);

  async function loadCompliance() {
    if (!complianceId) return;

    setLoading(true);

    const { data: complianceData } = await supabase
      .from("compliance_master")
      .select("*")
      .eq("id", complianceId)
      .single();

    setCompliance(complianceData);

    if (complianceData) {
      const { data: documentData } = await supabase
        .from("industry_documents")
        .select("*")
        .eq("document_key", complianceData.document_key)
.order("uploaded_at", { ascending: false })
.limit(1)
.single();

      console.log(complianceData);
      setDocument(documentData);
      console.log("DOCUMENT DATA");
      console.log(documentData);
      console.log("REPORT");
      console.log(documentData?.compliance_report);
      console.log("AI STATUS", documentData?.ai_status);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        Loading...
      </div>
    );
  }

  return (
    <div
  style={{
    padding: "30px",
    background: "#f4f7fb",
    minHeight: "100vh",
  }}
>
  {isProcessing && (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        background: "#2563eb",
        color: "#fff",
        padding: "14px 20px",
        borderRadius: "10px",
        marginBottom: "20px",
        fontWeight: 600,
        textAlign: "center",
      }}
    >
      {progressText}
    </div>
  )}

  <div
    style={{
      background: "#fff",
      borderRadius: "12px",
      padding: "24px",
      boxShadow: "0 2px 8px rgba(0,0,0,.08)",
    }}
  >
    <h1 style={{ marginTop: 0, color: "#166534" }}>
      {compliance?.compliance_name}
    </h1>

    <p>
      <b>Required Document :</b>{" "}
      {compliance?.document_required}
    </p>

    <div
      style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        marginTop: "25px",
      }}
    >
      <button
        onClick={() =>
          router.push("/dashboard/compliance-tracker")
        }
        style={{
          background: "#374151",
          color: "#fff",
          border: "none",
          padding: "12px 18px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <button
        onClick={() => fileInputRef.current?.click()}
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "12px 18px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ⬆ Upload Document
      </button>

      <button
        onClick={() =>
          router.push(
            `/dashboard/compliance-tracker/history?id=${document?.id}`
          )
        }
        style={{
          background: "#6b7280",
          color: "#fff",
          border: "none",
          padding: "12px 18px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        📜 History
      </button>
    </div>

   <input
  ref={fileInputRef}
  type="file"
  accept=".pdf"
  style={{ display: "none" }}

  onChange={async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setIsProcessing(true);
  setProgressText("📤 Uploading document...");

  const fileName = `${Date.now()}_${file.name}`;

  const { data: uploadData, error } = await supabase.storage
    .from("documents")
    .upload(`uploads/${fileName}`, file);

  if (error) {
    setIsProcessing(false);
    alert(error.message);
    return;
  }
  setProgressText(" Please wait..Reading document...");

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/read-document", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    setIsProcessing(false);
    alert("AI Processing Failed");
    return;
  }

  setProgressText("✅ Document analyzed.");
  const aiData = await response.json();

const ai = JSON.parse(
  aiData.result
    .replace(/```json/g, "")
    .replace(/```/g, "")
);
console.log("AI RESPONSE");
console.log(ai);
console.log("Compliance Report");
console.log(ai.compliance_report);

const validation = validateDocument(
  compliance.document_key,
  ai
);

if (!validation.isValid) {
  setIsProcessing(false);
  setProgressText("");

  alert(`Wrong Document

Expected : ${compliance.document_key}

Detected : ${validation.documentKey}`);

  return;
}

setProgressText("💾 Saving document...");
let currentDocument = document;

if (currentDocument) {
  const { error: updateError } = await supabase
    .from("industry_documents")
    .update({
      document_name: compliance.document_required,
      document_key: compliance.document_key,
      file_name: file.name,
      file_path: uploadData.path,
      issue_date: validation.issueDate
  ? validation.issueDate.split("/").reverse().join("-")
  : null,

valid_upto: validation.validUpto
  ? validation.validUpto.split("/").reverse().join("-")
  : null,
      consent_no: validation.consentNo,
      document_type: validation.documentName,
      ai_status: "Completed",
      compliance_report:
  ai.compliance_report ??
  {
    applicable_compliances: [],
    pending_compliances: [],
    priority_action: "",
  },
      uploaded_at: new Date().toISOString(),
    })
    .eq("id", currentDocument.id);

  if (updateError) {
    setIsProcessing(false);
    setProgressText("");
    alert(updateError.message);
    return;
  }
} else {
  const { data: createdDoc, error: insertError } = await supabase
    .from("industry_documents")
    .insert({
      document_name: compliance.document_required,
      document_key: compliance.document_key,
      file_name: file.name,
      file_path: uploadData.path,
      issue_date: validation.issueDate
  ? validation.issueDate.split("/").reverse().join("-")
  : null,

valid_upto: validation.validUpto
  ? validation.validUpto.split("/").reverse().join("-")
  : null,
      consent_no: validation.consentNo,
      document_type: validation.documentName,
      ai_status: "Completed",
      compliance_report:
  ai.compliance_report ??
  {
    applicable_compliances: [],
    pending_compliances: [],
    priority_action: "",
  },
      uploaded_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (insertError) {
    setIsProcessing(false);
    setProgressText("");
    alert(insertError.message);
    return;
  }

  currentDocument = createdDoc;
}

setProgressText("📂 Saving history...");
await supabase
  .from("document_versions")
  .insert({
    document_id: currentDocument.id,
    file_name: file.name,
    file_path: uploadData.path,
    issue_date: validation.issueDate
  ? validation.issueDate.split("/").reverse().join("-")
  : null,

valid_upto: validation.validUpto
  ? validation.validUpto.split("/").reverse().join("-")
  : null,
    consent_no: validation.consentNo,
    document_type: validation.documentName,
    uploaded_at: new Date().toISOString(),
  });

setProgressText("🔄 Refreshing...");

console.log("Saved Successfully");
await loadCompliance();

setIsProcessing(false);
setProgressText("");

alert("✅ Document Uploaded Successfully");
  console.log(uploadData);

  setTimeout(() => {
    setIsProcessing(false);
    setProgressText("");
  }, 1000);
}}

/>
{document?.compliance_report && (
  <div
    style={{
      marginTop: 30,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 20,
    }}
  >
    {/* Applicable Compliance */}

    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 8px 25px rgba(0,0,0,.08)",
        borderLeft: "6px solid #16a34a",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          color: "#166534",
        }}
      >
        ✅ Applicable Compliance
      </h2>

      <p
        style={{
          color: "#6b7280",
          fontSize: 14,
          marginBottom: 25,
        }}
      >
        Applicable statutory compliances identified from your uploaded document.
      </p>

      <button
        onClick={() =>
          setOpenApplicable(!openApplicable)
        }
        style={{
          background: "#16a34a",
          color: "#fff",
          border: "none",
          padding: "12px 18px",
          borderRadius: 10,
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        View Applicable Compliance (
        {document.compliance_report.applicable_compliances?.length || 0}
        )
      </button>

      {openApplicable && (
        <ul
          style={{
            marginTop: 20,
            lineHeight: "32px",
            paddingLeft: 20,
          }}
        >
          {(document.compliance_report.applicable_compliances || []).map(
            (x: string, i: number) => (
              <li key={i}>✅ {x}</li>
            )
          )}
        </ul>
      )}
    </div>

    {/* Priority */}

    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 8px 25px rgba(0,0,0,.08)",
        borderLeft: "6px solid #ea580c",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          color: "#c2410c",
        }}
      >
        🟠 Priority Action Required
      </h2>

      <p
        style={{
          color: "#6b7280",
          fontSize: 14,
          marginBottom: 25,
        }}
      >
        Immediate statutory actions requiring your attention.
      </p>

      <button
        onClick={() =>
          setOpenPriority(!openPriority)
        }
        style={{
          background: "#ea580c",
          color: "#fff",
          border: "none",
          padding: "12px 18px",
          borderRadius: 10,
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        View Priority Actions (
        {document.compliance_report.pending_compliances?.length || 0}
        )
      </button>

      {openPriority && (
        <ul
          style={{
            marginTop: 20,
            lineHeight: "32px",
            paddingLeft: 20,
          }}
        >
          {(document.compliance_report.pending_compliances || []).map(
            (x: string, i: number) => (
              <li key={i}>🟠 {x}</li>
            )
          )}
        </ul>
      )}
    </div>
  </div>
)}
  </div>
    </div>
  );
}
export default function ComplianceDetailsV2() {
  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
      <ComplianceDetailsContent />
    </Suspense>
  );
}