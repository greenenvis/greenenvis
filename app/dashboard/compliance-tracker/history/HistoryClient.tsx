"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../supabase";

function ComplianceHistoryContent() {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);

  const [versions, setVersions] = useState<any[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setId(params.get("id"));
  }, []);

  useEffect(() => {
    if (id) {
      loadHistory();
    }
  }, [id]);

  const loadHistory = async () => {
    if (!id) return;

    const { data } = await supabase
      .from("document_versions")
      .select("*")
      .eq("document_id", id)
      .order("uploaded_at", {
        ascending: false,
      });

    setVersions(data || []);
  };

  return (
    <div
  style={{
    padding: "30px",
    background: "#f4f7fb",
    minHeight: "100vh",
  }}
>
      <h1
  style={{
    color: "#166534",
    marginBottom: "20px",
  }}
>
  📄 Document History
</h1>

      <div
  style={{
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  }}
>
<table
      >
        <thead
  style={{
    background: "#166534",
    color: "#fff",
  }}
>
        <tr>
  <th style={{ padding: "14px" }}>File</th>
  <th style={{ padding: "14px" }}>Issue Date</th>
  <th style={{ padding: "14px" }}>Valid Upto</th>
  <th style={{ padding: "14px" }}>Uploaded</th>
  <th style={{ padding: "14px" }}>Action</th>
</tr>
        </thead>

        <tbody>
          {versions.map((v) => (
            <tr
  key={v.id}
  style={{
    borderBottom: "1px solid #e5e7eb",
  }}
>
              <td style={{ padding: "14px" }}>{v.file_name}</td>
              <td style={{ padding: "14px" }}>
  {v.issue_date || "-"}
</td>
              <td style={{ padding: "14px" }}>
  {v.valid_upto || "-"}
</td>
              <td style={{ padding: "14px" }}>
  {new Date(v.uploaded_at).toLocaleString()}
</td>

<td style={{ padding: "14px" }}>

  <button
    onClick={async () => {
      const { data } = await supabase.storage
        .from("documents")
        .createSignedUrl(v.file_path, 3600);

      if (data?.signedUrl) {
        window.open(data.signedUrl, "_blank");
      }
    }}
    style={{
      background: "#a239d3",
      color: "#fff",
      border: "none",
      padding: "6px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "13px",
      minWidth: "75px",
    }}
  >
    📄 Open
  </button>

  <button
    onClick={async () => {
      const { data } = await supabase.storage
        .from("documents")
        .createSignedUrl(v.file_path, 3600);

      if (!data?.signedUrl) return;

      const response = await fetch(data.signedUrl);

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = v.file_name;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);
    }}
    style={{
      marginLeft: "8px",
      background: "#2563eb",
      color: "#fff",
      border: "none",
      padding: "6px 12px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    Download
  </button>

<button
  onClick={async () => {
    const ok = confirm(
      "Are you sure you want to delete this document version?"
    );

    if (!ok) return;

    const { error } = await supabase
      .from("document_versions")
      .delete()
      .eq("id", v.id);

    if (error) {
      alert(error.message);
      return;
    }

    loadHistory();

    alert("Document version deleted successfully.");
  }}
  style={{
    marginLeft: "8px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  🗑 Delete
</button>

</td>
            </tr>
          ))}
        </tbody>
      </table>
</div>
      <button
  onClick={() => router.back()}
  style={{
    marginTop: "20px",
    background: "#374151",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  }}
>
  ← Back
</button>
    </div>
  );
}

export default function HistoryClient() {
  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
      <ComplianceHistoryContent />
    </Suspense>
  );
}