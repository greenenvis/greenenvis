"use client";

import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function CCAPage() {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState("");
  const [documents, setDocuments] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from("cca_documents")
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

  const uploadFile = async () => {
    try {
      if (!file) {
        alert("Please select PDF file");
        return;
      }

      if (!documentType) {
        alert("Please select document type");
        return;
      }

      setUploading(true);

      const fileName = `${Date.now()}-${file.name}`;

      // Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from("cca-documents")
        .upload(fileName, file);

      if (uploadError) {
        alert("Storage Error : " + uploadError.message);
        setUploading(false);
        return;
      }

      // Get Public URL
      const { data } = supabase.storage
        .from("cca-documents")
        .getPublicUrl(fileName);

      const publicUrl = data.publicUrl;

      // Save Record in Table
      const { error: insertError } = await supabase
        .from("cca_documents")
        .insert([
          {
            document_type: documentType,
            file_name: file.name,
            file_url: publicUrl,
          },
        ]);

      if (insertError) {
        alert("Table Error : " + insertError.message);
        console.log(insertError);
        setUploading(false);
        return;
      }

      alert("Document Uploaded Successfully");

      setFile(null);
      setDocumentType("");

      fetchDocuments();
    } catch (err) {
      console.log(err);
      alert("Unexpected Error");
    }

    setUploading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px",
      }}
    >
      {/* Header */}

      <div
        style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "25px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        }}
      >
        <h1
          style={{
            color: "#065f46",
            marginBottom: "10px",
          }}
        >
          Consent To Operate / Consolidated Consent & Authorization (CTO / CCA)
        </h1>

        <p
          style={{
            color: "#64748b",
          }}
        >
          Store Fresh, Renewal and Amendment (CTO / CCA) copies securely.
        </p>
      </div>

      {/* Upload Section */}

      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "25px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        }}
      >
        <h2
          style={{
            color: "#065f46",
            marginBottom: "20px",
          }}
        >
          Upload (CTO / CCA) Document
        </h2>

        <select
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <option value="">Select Document Type</option>
          <option value="Fresh CCA">Fresh CCA</option>
          <option value="Renewal CCA">Renewal CCA</option>
          <option value="Amendment CCA">Amendment CCA</option>
        </select>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files ? e.target.files[0] : null)
          }
        />

        <br />
        <br />

        <button
          onClick={uploadFile}
          style={{
            background: "#065f46",
            color: "#ffffff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </button>
      </div>

      {/* Documents List */}

      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        }}
      >
        <h2
          style={{
            color: "#065f46",
            marginBottom: "20px",
          }}
        >
          Uploaded Documents
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "12px" }}>
                Document Type
              </th>

              <th style={{ textAlign: "left", padding: "12px" }}>
                File Name
              </th>

              <th style={{ textAlign: "left", padding: "12px" }}>
                View
              </th>
            </tr>
          </thead>

          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td style={{ padding: "12px" }}>
                  {doc.document_type}
                </td>

                <td style={{ padding: "12px" }}>
                  {doc.file_name}
                </td>

                <td style={{ padding: "12px" }}>
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "#065f46",
                      fontWeight: "bold",
                    }}
                  >
                    View PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}