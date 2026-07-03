"use client";

import { supabase } from "../../supabase";
import { useEffect, useRef, useState } from "react";

export default function DocumentCenterPage() {

const fileInputRef = useRef<HTMLInputElement>(null);

const [documents, setDocuments] = useState<any[]>([]);

const fetchDocuments = async () => {
  const { data, error } = await supabase
    .from("industry_documents")
    .select("*")
    .order("uploaded_at", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  setDocuments(data || []);
};

useEffect(() => {
  fetchDocuments();
}, []);

const uploadDocument = (documentName: string) => {
  if (fileInputRef.current) {
    fileInputRef.current.setAttribute("data-document", documentName);
    fileInputRef.current.click();
  }
};

    return (
    <div style={{ padding: "20px" }}>
      <h1>Document Center</h1>

      <p style={{ color: "#666" }}>
        Upload and manage all environmental documents in one place.
      </p>
      <div style={{ marginTop: "30px" }}>

  <h2>Document Register</h2>

  <table
  border={1}
  cellPadding={8}
  style={{
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    marginTop: "15px",
  }}
>
    <thead
  style={{
    background: "#166534",
    color: "#fff",
  }}
>
  <tr>
    <th style={{ padding: "14px" }}>Document</th>
    <th style={{ padding: "14px" }}>Status</th>
    <th style={{ padding: "14px" }}>Issue Date</th>
    <th style={{ padding: "14px" }}>Valid Upto</th>
    <th style={{ padding: "14px" }}>AI Status</th>
    <th style={{ padding: "14px" }}>Action</th>
  </tr>
</thead>

    <tbody>
   {[
  "Consent to Operate (CCA)",
  "Consent to Establish (CTE)",
  "Biomedical Waste Authorization",
  "Hazardous Waste Authorization",
].map((doc) => {
    const uploaded = documents.find(
      (d) => d.document_name === doc
    );

    return (
      <tr
  key={doc}
  style={{
    borderBottom: "1px solid #e5e7eb",
  }}
>
<td style={{ padding: "14px", fontWeight: 600 }}>
  📄 {doc}
</td>

<td>
  {uploaded?.ai_status || "-"}
</td>
        <td>
          {uploaded
            ? "-"
            : "-"}
        </td>

<td>
  {uploaded?.valid_upto || "-"}
</td>

        <td>
  {uploaded ? (
    <span
      style={{
        background: "#fff3cd",
        color: "#856404",
        padding: "5px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "bold",
      }}
    >
      AI Pending
    </span>
  ) : (
    "-"
  )}
</td>

        <td>
          {uploaded ? (
            <>
              <span
                onClick={async () => {
                  const { data, error } = await supabase.storage
                    .from("documents")
                    .createSignedUrl(uploaded.file_path, 3600);

                  if (error) {
                    alert(error.message);
                    return;
                  }

                  window.open(data.signedUrl, "_blank");
                }}
                style={{
                  color: "#0d6efd",
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: "block",
                }}
              >
                <span
  onClick={async () => {
    const { data, error } = await supabase.storage
      .from("documents")
      .createSignedUrl(uploaded.file_path, 3600);

    if (error) {
      alert(error.message);
      return;
    }

    window.open(data.signedUrl, "_blank");
  }}
  style={{
    background: "#0d6efd",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "inline-block",
    fontSize: "13px",
    fontWeight: "bold",
  }}
>
  View PDF
</span>
              </span>
              <span
                onClick={async (e) => {
                  e.stopPropagation();

                  if (!confirm("Replace this document?")) return;

                  const { error: storageError } =
                    await supabase.storage
                      .from("documents")
                      .remove([uploaded.file_path]);

                  if (storageError) {
                    alert(storageError.message);
                    return;
                  }

                  const { error: dbError } = await supabase
                    .from("industry_documents")
                    .delete()
                    .eq("id", uploaded.id);

                  if (dbError) {
                    alert(dbError.message);
                    return;
                  }

                  await fetchDocuments();

                  alert("Document Replaced Successfully");
                }}
                style={{
                  color: "red",
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: "block",
                  marginTop: "6px",
                }}
              >
<>
  <br />

  <span
    onClick={() => uploadDocument(doc)}
    style={{
      background: "#ffc107",
      color: "#000",
      padding: "6px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      display: "inline-block",
      marginTop: "6px",
      fontSize: "13px",
      fontWeight: "bold",
    }}
  >
    Replace
  </span>

  <br />

  <span
    onClick={async (e) => {
      e.stopPropagation();

      if (!confirm("Delete this document?")) return;

      const { error: storageError } = await supabase.storage
        .from("documents")
        .remove([uploaded.file_path]);

      if (storageError) {
        alert(storageError.message);
        return;
      }

      const { error: dbError } = await supabase
        .from("industry_documents")
        .delete()
        .eq("id", uploaded.id);

      if (dbError) {
        alert(dbError.message);
        return;
      }

      await fetchDocuments();

      alert("Document Deleted Successfully");
    }}
    style={{
      background: "#dc3545",
      color: "#fff",
      padding: "6px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      display: "inline-block",
      marginTop: "6px",
      fontSize: "13px",
      fontWeight: "bold",
    }}
  >
    Delete
  </span>
</>
              </span>
            </>
          ) : (
            <button
              onClick={() => uploadDocument(doc)}
              style={{
                padding: "6px 12px",
                background: "#198754",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Upload
            </button>
          )}
        </td>
      </tr>
    );
  })}
</tbody>

  </table>

</div>
<input
  type="file"
  ref={fileInputRef}
  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
  style={{ display: "none" }}
onChange={async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const documentName =
    fileInputRef.current?.getAttribute("data-document") || "";

  // AI Read
  const formData = new FormData();
  formData.append("file", file);

  const aiResponse = await fetch("/api/read-document", {
    method: "POST",
    body: formData,
  });

  const aiData = await aiResponse.json();

  const aiResult = JSON.parse(
    aiData.result.replace(/```json/g, "").replace(/```/g, "")
  );

  // Upload Storage
  const fileName = `${Date.now()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from("documents")
    .upload(`uploads/${fileName}`, file);

  if (error) {
    alert(error.message);
    return;
  }

  // DB Insert
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

alert(`${documentName} Successfully Uploaded`);

fetch("/api/read-document", {
  method: "POST",
  body: formData,
})
  .then((res) => res.json())
  .then(async (aiData) => {
    const aiResult = JSON.parse(
      aiData.result.replace(/```json/g, "").replace(/```/g, "")
    );

    await supabase
      .from("industry_documents")
      .update({
        issue_date: aiResult.issue_date
          ? aiResult.issue_date.split("/").reverse().join("-")
          : null,
        valid_upto: aiResult.valid_upto
          ? aiResult.valid_upto.split("/").reverse().join("-")
          : null,
        consent_no: aiResult.consent_no,
        document_type: aiResult.document_type,
        ai_status: "Completed",
      })
      .eq("file_path", data.path);

    await fetchDocuments();
  });

  await fetchDocuments();

  alert(`${documentName} Successfully Uploaded`);

  e.target.value = "";
}}
/>
    </div>
  );
}