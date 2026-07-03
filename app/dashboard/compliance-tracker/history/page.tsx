"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "../../../supabase";

export default function DocumentHistoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [versions, setVersions] = useState<any[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
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
      background: "#166534",
      color: "#fff",
      border: "none",
      padding: "6px 12px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
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