"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../../supabase";

export default function DocumentCenterPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [documents, setDocuments] = useState<any[]>([]);
const [documentList, setDocumentList] = useState<string[]>([]);
const [industryProfile, setIndustryProfile] = useState<any>(null);

const fetchDocuments = async () => {
  const { data } = await supabase
    .from("industry_documents")
    .select("*")
    .order("uploaded_at", { ascending: false });

  setDocuments(data || []);

 const { data: profile } = await supabase
  .from("industry_profile")
  .select("*")
  .limit(1)
  .single();

console.log("Industry Profile:", profile);

setIndustryProfile(profile);

const { data: masterDocs } = await supabase
    .from("document_master")
    .select("document_name")
    .eq("is_active", true)
    .order("display_order");

  setDocumentList(masterDocs?.map((d) => d.document_name) || []);
};
  
  useEffect(() => {
    fetchDocuments();
  }, []);

const uploadDocument = (doc: string) => {
  const allowed = documentList.filter((d) => {
    if (!industryProfile) return true;

    if (d === "Biomedical Waste Authorization")
      return industryProfile.biomedical_waste;

    if (d === "Hazardous Waste Authorization")
      return industryProfile.hazardous_waste;

    if (d === "Plastic EPR Certificate")
      return industryProfile.plastic_epr;

    if (d === "E-Waste EPR Certificate")
      return industryProfile.ewaste_epr;

    if (d === "Used Oil EPR Certificate")
      return industryProfile.used_oil_epr;

    if (d === "Battery EPR Certificate")
      return industryProfile.battery_epr;

    if (d === "Tyre EPR Certificate")
      return industryProfile.tyre_epr;

    if (d === "CGWA NOC")
      return industryProfile.cgwa_noc;

    if (d === "Factory License")
      return industryProfile.factory_license;

    if (d === "Fire NOC")
      return industryProfile.fire_noc;

    return true;
  });

  if (!allowed.includes(doc)) {
    alert("This document is not applicable for your industry.");
    return;
  }

  fileInputRef.current?.setAttribute("data-document", doc);
  fileInputRef.current?.click();
};

  return (
    <div style={{ padding: 20 }}>

    <h1>Document Center</h1>

      <table
        border={1}
        cellPadding={10}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 20,
        }}
      >
        <thead style={{ background: "#166534", color: "#fff" }}>
          <tr>
            <th>Document</th>
            <th>Status</th>
<th>Consent No.</th>
<th>Document Type</th>
            <th>Issue Date</th>
            <th>Valid Upto</th>
            <th>Compliance Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {documentList
  .filter((doc) => {
    if (!industryProfile) return true;

    if (doc === "Biomedical Waste Authorization")
      return industryProfile.biomedical_waste;

    if (doc === "Hazardous Waste Authorization")
      return industryProfile.hazardous_waste;

    if (doc === "Plastic EPR Certificate")
      return industryProfile.plastic_epr;

    if (doc === "E-Waste EPR Certificate")
      return industryProfile.ewaste_epr;

    if (doc === "Used Oil EPR Certificate")
      return industryProfile.used_oil_epr;

    if (doc === "Battery EPR Certificate")
      return industryProfile.battery_epr;

    if (doc === "Tyre EPR Certificate")
      return industryProfile.tyre_epr;

    if (doc === "CGWA NOC")
      return industryProfile.cgwa_noc;

    if (doc === "Factory License")
      return industryProfile.factory_license;

    if (doc === "Fire NOC")
      return industryProfile.fire_noc;

    return true;
  })
  .map((doc) => {
            const uploaded = documents.find(
              (d) => d.document_name === doc
            );

            return (
              <tr key={doc}>
                <td>{doc}</td>

                <td>{uploaded ? "Uploaded" : "Missing"}</td>
                <td>
  {uploaded?.consent_no ? (
    <span
      style={{
        fontWeight: "bold",
        color: "#0f766e",
      }}
    >
      {uploaded.consent_no}
    </span>
  ) : (
    "-"
  )}
</td>

                <td>
  {uploaded?.document_type ? (
    <span
      style={{
        background: "#dbeafe",
        color: "#1d4ed8",
        padding: "5px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "bold",
      }}
    >
      {uploaded.document_type}
    </span>
  ) : (
    "-"
  )}
</td>

                <td>{uploaded?.issue_date || "-"}</td>

                <td>{uploaded?.valid_upto || "-"}</td>

                <td>
  {!uploaded ? (
    <span
  style={{
    background: "#f3f4f6",
    color: "#6b7280",
    padding: "5px 10px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "12px",
  }}
>
  Missing
</span>
  ) : !uploaded.valid_upto ? (
    "Pending"
  ) : new Date(uploaded.valid_upto) < new Date() ? (
    <span
  style={{
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "5px 10px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "12px",
  }}
>
  Expired
</span>
  ) : (
    (() => {
  const expiry = new Date(uploaded.valid_upto);
  const today = new Date();

  const diffDays = Math.ceil(
    (expiry.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (diffDays <= 30) {
    return (
      <span style={{ color: "#f59e0b", fontWeight: "bold" }}>
        Renewal Due
      </span>
    );
  }

  return (
    <span
  style={{
    background: "#dcfce7",
    color: "#166534",
    padding: "5px 10px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "12px",
  }}
>
  Active
</span>
  );
})()
  )}
</td>

                <td>
                                  {uploaded ? (
                    <>
                      <button
                        onClick={async () => {
                          const { data } = await supabase.storage
                            .from("documents")
                            .createSignedUrl(uploaded.file_path, 3600);

                          if (data?.signedUrl) {
                            window.open(data.signedUrl, "_blank");
                          }
                        }}
                      >
                        View
                      </button>

                      <button
                        onClick={() => uploadDocument(doc)}
                        style={{ marginLeft: 8 }}
                      >
                        Replace
                      </button>

                      <button
                        style={{ marginLeft: 8 }}
                        onClick={async () => {
                          if (!confirm("Delete document?")) return;

                          await supabase.storage
                            .from("documents")
                            .remove([uploaded.file_path]);

                          await supabase
                            .from("industry_documents")
                            .delete()
                            .eq("id", uploaded.id);

                          fetchDocuments();
                        }}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button onClick={() => uploadDocument(doc)}>
                      Upload
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
            <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        style={{ display: "none" }}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          const documentName =
            fileInputRef.current?.getAttribute("data-document") || "";

          const fileName = `${Date.now()}_${file.name}`;

          const { data, error } = await supabase.storage
            .from("documents")
            .upload(`uploads/${fileName}`, file);

          if (error) {
            alert(error.message);
            return;
          }

          const { error: dbError } = await supabase
            .from("industry_documents")
            .insert([
              {
                document_name: documentName,
                file_name: file.name,
                file_path: data.path,
                ai_status: "Processing",
              },
            ]);

          if (dbError) {
            alert(dbError.message);
            return;
          }

          await fetchDocuments();

          alert("Document Uploaded Successfully");

          const formData = new FormData();
          formData.append("file", file);

          fetch("/api/read-document", {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then(async (aiData) => {
              const ai = JSON.parse(
                aiData.result
                  .replace(/```json/g, "")
                  .replace(/```/g, "")
              );

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
                  ai_status: "Completed",
                })
                .eq("file_path", data.path);

              await fetchDocuments();
            });

          e.target.value = "";
        }}
      />
    </div>
  );
}