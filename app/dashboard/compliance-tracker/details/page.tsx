"use client";
import { validateDocument } from "@/lib/document-validator";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../../../supabase";

export default function ComplianceDetailsPage() {
const router = useRouter();
const searchParams = useSearchParams();

const complianceId = searchParams.get("id");

const [compliance, setCompliance] = useState<any>(null);
const [document, setDocument] = useState<any>(null);
const [isProcessing, setIsProcessing] = useState(false);
const getCurrentStatus = () => {
  if (!document) {
    return {
      status: "Missing",
      color: "#6b7280",
    };
  }

  if (!document.valid_upto) {
    return {
      status: "Pending",
      color: "#f59e0b",
    };
  }

  const expiry = new Date(document.valid_upto);
  const today = new Date();

  const diffDays = Math.ceil(
    (expiry.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) {
    return {
      status: "Overdue",
      color: "#dc2626",
    };
  }

  if (diffDays <= (compliance?.reminder_days || 30)) {
    return {
      status: "Upcoming",
      color: "#d97706",
    };
  }

  return {
    status: "Active",
    color: "#16a34a",
  };
};
const fileInputRef = useRef<HTMLInputElement>(null);
useEffect(() => {
  if (complianceId) {
    loadCompliance();
  }
}, [complianceId]);

const loadCompliance = async () => {
  if (!complianceId) return;

  const { data } = await supabase
    .from("compliance_master")
    .select("*")
    .eq("id", complianceId)
    .single();

  setCompliance(data);
  console.log(data);
  if (data?.document_required) {
  const { data: doc } = await supabase
    .from("industry_documents")
    .select("*")
    .eq("document_key", data.document_key)
    .maybeSingle();

  setDocument(doc);
  if (doc) {
  setDocument(doc);
}
}
};
  return (
    <div
      style={{
        padding: "30px",
        background: "#f4f7fb",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ color: "#166534", marginTop: 0 }}>
  {compliance?.compliance_name || "Compliance Details"}
</h1>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <tbody>
            <tr>
              <td style={{ padding: "12px", fontWeight: "bold", width: "250px" }}>
                Compliance Name
              </td>
              <td>{compliance?.compliance_name || "-"}</td>
            </tr>

            <tr>
              <td style={{ padding: "12px", fontWeight: "bold" }}>
                Required Document
              </td>
              <td>{compliance?.document_required || "-"}</td>
            </tr>

            <tr>
              <td style={{ padding: "12px", fontWeight: "bold" }}>
                Current Status
              </td>
              <td>
                {(() => {
  const status = getCurrentStatus();

  return (
    <span
      style={{
        background: status.color + "20",
        color: status.color,
        padding: "6px 12px",
        borderRadius: "20px",
        fontWeight: "bold",
      }}
    >
      {status.status}
    </span>
  );
})()}
              </td>
            </tr>

            <tr>
              <td style={{ padding: "12px", fontWeight: "bold" }}>
                Due Date
              </td>
 <td>
  {compliance?.is_renewal
    ? (
        document?.valid_upto
          ? new Date(
              document.valid_upto
            ).toLocaleDateString("en-GB")
          : "-"
      )
    : (
        compliance?.due_month || "-"
      )}
</td>
            </tr>

            <tr>
              <td style={{ padding: "12px", fontWeight: "bold" }}>
                Reminder
              </td>
 <td>
  {compliance?.is_renewal
    ? (
        document?.valid_upto
          ? (() => {
              const reminderDate = new Date(
                document.valid_upto
              );

              reminderDate.setDate(
                reminderDate.getDate() -
                  (compliance?.reminder_days || 30)
              );

              return reminderDate.toLocaleDateString(
                "en-GB"
              );
            })()
          : "-"
      )
    : `${compliance?.reminder_days} Days Before`}
</td>
            </tr>

            <tr>
              <td style={{ padding: "12px", fontWeight: "bold" }}>
                Description

              </td>
              <td>
                Renew Consent to Operate before expiry to maintain statutory compliance.
              </td>
            </tr>
          </tbody>
        </table>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            gap: "15px",
          }}
        >
          {document?.compliance_report && (
  <div
    style={{
      marginTop: "30px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
      gap: "20px",
    }}
  >
    {/* Applicable Compliances */}
    <div
      style={{
        background: "#ecfdf5",
        border: "1px solid #86efac",
        borderRadius: "10px",
        padding: "18px",
      }}
    >
      <h3 style={{ marginTop: 0 }}>
       {document?.compliance_report && (
  <div
    style={{
      marginTop: "30px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    }}
  >
    {/* Header */}
    <div
      style={{
        background: "#166534",
        color: "#fff",
        padding: "18px 24px",
        borderRadius: "12px",
      }}
    >
      <h2 style={{ margin: 0 }}>
        📋 Your Compliance Report
      </h2>

      <p
        style={{
          marginTop: "8px",
          marginBottom: 0,
          opacity: 0.9,
        }}
      >
        Based on your uploaded documents, below is your current compliance
        status.
      </p>
    </div>

    {/* Compliance Score */}
    <div
      style={{
        background: "#ecfdf5",
        border: "1px solid #86efac",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <h3 style={{ marginTop: 0 }}>
        📊 Compliance Score
      </h3>

      <h1
        style={{
          color: "#15803d",
          margin: 0,
        }}
      >
        {document.compliance_report.compliance_score ?? 0}%
      </h1>
    </div>

    {/* Applicable */}
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <h3>✅ Applicable to Your Industry</h3>

      <ul>
        {document.compliance_report.applicable_compliances?.map(
          (item: string, i: number) => (
            <li key={i}>{item}</li>
          )
        )}
      </ul>
    </div>

    {/* Completed */}
    <div
      style={{
        background: "#f0fdf4",
        border: "1px solid #bbf7d0",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <h3>🟠 Action Required</h3>

      <ul>
        {document.compliance_report.pending_compliances?.map(
          (item: string, i: number) => (
            <li key={i}>{item}</li>
          )
        )}
      </ul>
    </div>

    {/* Pending */}
    <div
      style={{
        background: "#fff7ed",
        border: "1px solid #fdba74",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <h3>🟠 Action Required</h3>

      <ul>
        {document.compliance_report.pending_compliances?.map(
          (item: string, i: number) => (
            <li key={i}>{item}</li>
          )
        )}
      </ul>
    </div>

    {/* Priority */}
    <div
      style={{
        background: "#fef2f2",
        border: "1px solid #fca5a5",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <h3>🔴 Highest Priority</h3>

      <strong>
        {document.compliance_report.priority_action || "-"}
      </strong>
    </div>

    {/* Recommendations */}
    <div
      style={{
        background: "#eff6ff",
        border: "1px solid #93c5fd",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
    </div>
  </div>
)}
      </h3>

      <ul>
        {document.compliance_report.recommendations?.map(
          (item: string, i: number) => (
            <li key={i}>{item}</li>
          )
        )}
      </ul>
    </div>
  </div>
)}
          <button
  onClick={async () => {
    if (!document) {
      alert("Document not uploaded.");
      return;
    }

    const { data } = await supabase.storage
      .from("documents")
      .createSignedUrl(document.file_path, 3600);

    if (data?.signedUrl) {
      window.open(data.signedUrl, "_blank");
    }
  }}
  style={{
    background: "#166534",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  📄 Open Document
</button>

          <>
  <button
    onClick={() => fileInputRef.current?.click()}

    style={{
      background: "#2563eb",
      color: "#fff",
      border: "none",
      padding: "12px 20px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    ⬆ Upload New Version
  </button>

<input
  ref={fileInputRef}
  type="file"
  accept=".pdf"
  style={{ display: "none" }}
  onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsProcessing(true);
    console.log("STEP-1");

    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = `${Date.now()}_${file.name}`;

    const { data: uploadData, error: uploadError } =
      await supabase.storage
        .from("documents")
        .upload(`uploads/${fileName}`, file);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    let currentDocument = document;

    if (currentDocument) {
      await supabase.storage
        .from("documents")
        .remove([currentDocument.file_path]);

      await supabase
        .from("industry_documents")
        
        .update({
          file_name: file.name,
          file_path: uploadData.path,
          document_key: compliance.document_key,
          ai_status: "Processing",
          uploaded_at: new Date().toISOString(),
        })
        .eq("id", currentDocument.id);
    } else {
      const { data: createdDoc, error: createError } =
        await supabase
          .from("industry_documents")
          .insert({
            document_name: compliance.document_required,
            document_key: compliance.document_key,
            file_name: file.name,
            file_path: uploadData.path,
            ai_status: "Processing",
            uploaded_at: new Date().toISOString(),
          })
          .select()
          .single();

      if (createError) {
        alert(createError.message);
        return;
      }

      currentDocument = createdDoc;
    }

    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/read-document", {
      method: "POST",
      body: formData,
    });
if (!response.ok) {
  await supabase
    .from("industry_documents")
    
    .update({
      ai_status: "Failed",
    })
    .eq("id", currentDocument.id);

  setIsProcessing(false);
  alert("AI Processing Failed");
  return;
}

    const aiData = await response.json();

    const ai = JSON.parse(
      aiData.result
        .replace(/```json/g, "")
        .replace(/```/g, "")
    );
const validation = validateDocument(
  compliance.document_key,
  ai
);

if (!validation.isValid) {
  alert(
    `Wrong document uploaded.

Expected : ${compliance.document_key}

Detected : ${validation.documentKey}`
  );

  return;
}
   await supabase
  .from("industry_documents")
  
  .update({
    issue_date: ai.issue_date
      ? ai.issue_date.split("/").reverse().join("-")
      : null,
    valid_upto: ai.valid_upto
      ? ai.valid_upto.split("/").reverse().join("-")
      : null,
    consent_no: ai.consent_no,
    document_type: ai.document_type,
    ai_summary: ai.ai_summary,
compliance_report: ai.compliance_report,
    ai_status: "Completed",
  })
  .eq("id", currentDocument.id);
await supabase
  .from("document_versions")
  .insert({
    document_id: currentDocument.id,
    file_name: file.name,
    file_path: uploadData.path,
    issue_date: ai.issue_date
      ? ai.issue_date.split("/").reverse().join("-")
      : null,
    valid_upto: ai.valid_upto
      ? ai.valid_upto.split("/").reverse().join("-")
      : null,
    consent_no: ai.consent_no,
    document_type: ai.document_type,
    uploaded_at: new Date().toISOString(),
  });
    await loadCompliance();

    setIsProcessing(false);
    alert("Document Uploaded Successfully");

await loadCompliance();

setDocument((prev: any) => ({
  ...prev,
  issue_date: ai.issue_date
    ? ai.issue_date.split("/").reverse().join("-")
    : null,
  valid_upto: ai.valid_upto
    ? ai.valid_upto.split("/").reverse().join("-")
    : null,
  consent_no: ai.consent_no,
  document_type: ai.document_type,
  ai_status: "Completed",
}));
  }}
/>
</>
{isProcessing && (
  <div
    style={{
      marginTop: "25px",
      marginBottom: "25px",
      padding: "20px",
      background: "#eff6ff",
      border: "1px solid #93c5fd",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <h3 style={{ margin: 0, color: "#1d4ed8" }}>
      ⏳ Analyzing your document...
    </h3>

    <p
      style={{
        marginTop: "10px",
        color: "#475569",
      }}
    >
      This usually takes less than a minute.
    </p>
  </div>
)}
<button
  onClick={() => router.back()}
  style={{
    background: "#374151",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  ← Back
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
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  History
</button>
        </div>
      </div>
    </div>
  );
}