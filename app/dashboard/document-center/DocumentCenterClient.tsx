"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../../supabase";
import { useRouter, useSearchParams } from "next/navigation";

function DocumentCenterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [documents, setDocuments] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

const [documentList, setDocumentList] = useState<string[]>([]);
const [industryProfile, setIndustryProfile] = useState<any>(null);
const applicableDocuments = documentList.filter((doc) => {
  if (!industryProfile) return false;

  switch (doc) {
    case "Biomedical Waste Authorization":
      return industryProfile.biomedical_waste;

    case "Hazardous Waste Authorization":
      return industryProfile.hazardous_waste;

    case "Plastic EPR Certificate":
      return industryProfile.plastic_epr;

    case "E-Waste EPR Certificate":
      return industryProfile.ewaste_epr;

    case "Used Oil EPR Certificate":
      return industryProfile.used_oil_epr;

    case "Battery EPR Certificate":
      return industryProfile.battery_epr;

    case "Tyre EPR Certificate":
      return industryProfile.tyre_epr;

    case "CGWA NOC":
      return industryProfile.cgwa_noc;

    case "Factory License":
      return industryProfile.factory_license;

    case "Fire NOC":
      return industryProfile.fire_noc;

    default:
      return true;
  }
});

const fetchDocuments = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setDocuments([]);
    return;
  }

  const { data } = await supabase
    .from("industry_documents")
    .select("*")
    .eq("user_id", user.id)
    .order("uploaded_at", { ascending: false });

  setDocuments(data || []);

  const { data: profile } = await supabase
    .from("industry_profile")
    .select("*")
    .eq("user_id", user.id)
    .single();

  setIndustryProfile(profile);

  const { data: masterDocs } = await supabase
    .from("document_master")
    .select("document_name")
    .eq("is_active", true)
    .order("display_order");

  setDocumentList(masterDocs?.map((d) => d.document_name) || []);
};
  
useEffect(() => {
const filter = searchParams.get("filter");

if (filter) {
  setStatusFilter(filter);
}
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
<div
  style={{
    padding: "30px",
    background: "#f4f7fb",
    minHeight: "100vh",
  }}
>
  <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <button
    onClick={() => router.push("/dashboard")}
    style={{
      background: "#166534",
      color: "#ffffff",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    ← Back to Dashboard
  </button>
</div>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "25px",
    }}
  >
    <div>
      <h1
        style={{
          margin: 0,
          color: "#166534",
        }}
      >
        📂 Document Center
      </h1>

      <p
        style={{
          marginTop: "8px",
          color: "#6b7280",
        }}
      >
        Manage all statutory documents in one secure place.
      </p>
    </div>
  </div>

<div
  style={{
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
  }}
>
  <input
    type="text"
    placeholder="🔍 Search document..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      flex: 1,
      minWidth: "250px",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #d1d5db",
      outline: "none",
      fontSize: "14px",
    }}
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    style={{
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #d1d5db",
      minWidth: "180px",
    }}
  >
    <option>All</option>
    <option>Active</option>
    <option>Renewal Due</option>
    <option>Expired</option>
    <option>Missing</option>
    <option>Invalid</option>
  </select>
</div>


<div
  style={{
  display: "grid",
  gridTemplateColumns: "repeat(5, minmax(180px, 1fr))",
  gap: "15px",
  marginBottom: "25px",
  alignItems: "stretch",
}}
>
  <div
    style={{
      background: "#dcfce7",
      padding: "18px",
      borderRadius: "12px",
      textAlign: "center",

      minHeight: "90px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    
    <h3 style={{ margin: 0 }}>
  {
    applicableDocuments.filter((doc) => {
      const uploaded = documents.find(
        (d) => d.document_name === doc
      );

      if (!uploaded || !uploaded.valid_upto) return false;

      const diff = Math.ceil(
        (new Date(uploaded.valid_upto).getTime() -
          new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      );

      return (
  uploaded &&
  uploaded.ai_status === "Completed" &&
  diff > 30
);
    }).length
  }
</h3>

    <small>🟢 Active</small>
  </div>

  <div
    style={{
      background: "#fef3c7",
padding: "18px",
borderRadius: "12px",
textAlign: "center",

minHeight: "90px",
display: "flex",
flexDirection: "column",
justifyContent: "center",
alignItems: "center",
    }}
  >
    <h3 style={{ margin: 0 }}>
  {
    applicableDocuments.filter((doc) => {
      const uploaded = documents.find(
        (d) => d.document_name === doc
      );

      if (!uploaded || !uploaded.valid_upto) return false;

      const diff = Math.ceil(
        (new Date(uploaded.valid_upto).getTime() -
          new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      );

      return (
  uploaded &&
  uploaded.ai_status === "Completed" &&
  diff >= 0 &&
  diff <= 30
);
    }).length
  }
</h3>

    <small>🟠 Renewal Due</small>
  </div>

  <div
    style={{
background: "#fee2e2",
padding: "18px",
borderRadius: "12px",
textAlign: "center",

minHeight: "90px",
display: "flex",
flexDirection: "column",
justifyContent: "center",
alignItems: "center",
    }}
  >
    <h3 style={{ margin: 0 }}>
  {
    applicableDocuments.filter((doc) => {
      const uploaded = documents.find(
        (d) => d.document_name === doc
      );

    return (
  uploaded &&
  uploaded.ai_status === "Completed" &&
  uploaded.valid_upto &&
  new Date(uploaded.valid_upto) < new Date()
);
    }).length
  }
</h3>

    <small>🔴 Expired</small>
  </div>

  <div
    style={{
background: "#f3f4f6",
padding: "18px",
borderRadius: "12px",
textAlign: "center",

minHeight: "90px",
display: "flex",
flexDirection: "column",
justifyContent: "center",
alignItems: "center",
    }}
  >
    <h3 style={{ margin: 0 }}>
  {
    applicableDocuments.filter((doc) => {
      return !documents.find(
        (d) => d.document_name === doc
      );
    }).length
  }
</h3>

    <small>⚫ Missing</small>
  </div>
<div
  style={{
    background: "#fee2e2",
    padding: "18px",
    borderRadius: "12px",
    textAlign: "center",
    minHeight: "90px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <h3 style={{ margin: 0 }}>
    {
      applicableDocuments.filter((doc) => {
        const uploaded = documents.find(
          (d) => d.document_name === doc
        );

        return uploaded?.ai_status === "Failed";
      }).length
    }
  </h3>

  <small>❌ Invalid</small>
</div>
</div>

  <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 6px 18px rgba(0,0,0,.08)",
  }}
      >
        <thead
  style={{
    background: "#166534",
    color: "#fff",
    position: "sticky",
    top: 0,
  }}
>
          <tr>
            <th>Document</th>
            <th>Status</th>
            <th>Consent No.</th>
            <th>Document Type</th>
            <th>Issue Date</th>
            <th>Valid Upto</th>
            <th>Verification</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {documentList
            .filter((doc) =>
              doc.toLowerCase().includes(search.toLowerCase())
    )

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

.filter((doc) => {
  const uploaded = documents.find(
    (d) => d.document_name === doc
  );

  let status = "Missing";

  if (uploaded) {
  if (uploaded &&
      uploaded.ai_status === "Failed") {
    status = "Invalid";
  } else if (!uploaded.valid_upto) {
    status = "Pending";
  } else if (
    new Date(uploaded.valid_upto) < new Date()
  ) {
    status = "Expired";
  } else {
    const diff = Math.ceil(
      (new Date(uploaded.valid_upto).getTime() -
        new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );

    status =
      diff <= 30
        ? "Renewal Due"
        : "Active";
  }
}
if (statusFilter === "Completed") {
  return uploaded?.ai_status === "Completed";
}

if (statusFilter === "Processing") {
  return uploaded?.ai_status === "Processing";
}
  return (
    statusFilter === "All" ||
    status === statusFilter
  );
})

  .map((doc) => {
            const uploaded = documents.find(
              (d) => d.document_name === doc
            );

let status = "Missing";

if (uploaded) {
  // AI Verification Failed
  if (uploaded &&
      uploaded.ai_status === "Failed") {
    status = "Invalid";
  } else if (!uploaded.valid_upto) {
    status = "Pending";
  } else {
    const diff = Math.ceil(
      (new Date(uploaded.valid_upto).getTime() -
        new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diff < 0) {
      status = "Expired";
    } else if (diff <= 30) {
      status = "Renewal Due";
    } else {
      status = "Active";
    }
  }
}

let verificationStatus = "Missing";
let verificationReason = "";

if (uploaded) {
  if (uploaded && 
      uploaded.ai_status === "Completed") {
    verificationStatus = "Verified";
  } else if (uploaded.ai_status === "Failed") {
    verificationStatus = "Failed";
    verificationReason =
      uploaded.verification_reason ||
      "Processing failed.";
  } else {
    verificationStatus = "Failed";
    verificationReason = "Processing failed.";
  }
} 

return (
<tr
  key={doc}
  style={{
    borderBottom: "1px solid #e5e7eb",
    transition: "0.2s",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#f8fafc";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "#ffffff";
  }}
>
<td
  style={{
    padding: "18px 14px",
    fontWeight: 600,
  }}
>
  📄 {doc}
</td>

<td style={{ padding: "18px 14px" }}>
  <span
    style={{
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "bold",
      background:
  status === "Active"
    ? "#dcfce7"
    : status === "Renewal Due"
    ? "#fef3c7"
    : status === "Expired"
    ? "#fee2e2"
    : status === "Invalid"
    ? "#fee2e2"
    : "#f3f4f6",
color:
  status === "Active"
    ? "#166534"
    : status === "Renewal Due"
    ? "#b45309"
    : status === "Expired"
    ? "#b91c1c"
    : status === "Invalid"
    ? "#b91c1c"
    : "#374151",
    }}
  >
    {status}
  </span>
</td>

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
        <td style={{ padding: "18px 14px" }}>
        {uploaded?.issue_date || "-"}
        </td>

  <td style={{ padding: "18px 14px" }}>
  {uploaded?.valid_upto || "-"}
   </td>

<td style={{ padding: "18px 14px" }}>
  {verificationStatus === "Verified" ? (
    <span
      style={{
        background: "#dcfce7",
        color: "#166534",
        padding: "6px 12px",
        borderRadius: "20px",
        fontWeight: "bold",
        fontSize: "12px",
      }}
    >
      ✅ Verified
    </span>
  ) : verificationStatus === "Failed" ? (
    <div>
      <span
        style={{
          background: "#fee2e2",
          color: "#b91c1c",
          padding: "6px 12px",
          borderRadius: "20px",
          fontWeight: "bold",
          fontSize: "12px",
          display: "inline-block",
        }}
      >
        ❌ Verification Failed
      </span>

      <div
        style={{
          marginTop: "6px",
          color: "#b91c1c",
          fontSize: "12px",
          lineHeight: "18px",
        }}
      >
        {verificationReason}
      </div>
    </div>
  ) : (
    "-"
  )}
</td>

<td style={{ padding: "18px 14px", whiteSpace: "nowrap" }}>
  {uploaded ? (
    <>
    <button
  onClick={async () => {

    const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) return;

    const { data } = await supabase.storage
      .from("documents")
      .createSignedUrl(uploaded.file_path, 3600);

    if (data?.signedUrl) {
      window.open(data.signedUrl, "_blank");
    }
  }}

  style={{
    background: "#ffffff",
    color: "#2563eb",
    border: "2px solid #2563eb",
    padding: "8px 16px",
    minWidth: "95px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "0.2s",
  }}
>
  👁 View
</button>

                      <button
  onClick={() => uploadDocument(doc)}
  style={{
    marginLeft: "8px",
    background: "#ffffff",
    color: "#d97706",
    border: "2px solid #d97706",
    padding: "8px 16px",
    minWidth: "95px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "0.2s",
  }}
>
  🔄 Replace
</button>

                      <button
                        style={{
  marginLeft: "8px",
  background: "#dc2626",
  color: "#ffffff",
  border: "2px solid #dc2626",
  padding: "8px 16px",
  minWidth: "95px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 600,
  transition: "0.2s",
  }}
  
  onClick={async () => {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login again.");
    return;
  }

  if (!confirm("Delete document?")) return;

await supabase.storage
.from("documents")
.remove([uploaded.file_path]);

await supabase
  .from("industry_documents")
  .delete()
  .eq("id", uploaded.id);
await supabase
  .from("notifications")
  .insert({
    user_id: user.id,
    title: "🗑 Document Deleted",
    message: `${uploaded.document_name} deleted successfully.`,
    document_name: uploaded.document_name,
    notification_type: "Delete",
    priority: "Medium",
    is_read: false,
  });
fetchDocuments();
}}
>
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
  onClick={() => uploadDocument(doc)}
  style={{
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
  }}
>
  📤 Upload
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

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  if (!currentUser) {
    alert("Please login again.");
    return;
  }

  const { data: existingDocument } = await supabase
    .from("industry_documents")
    .select("id")
    .eq("user_id", currentUser.id)
    .eq("document_name", documentName)
    .maybeSingle();

  const fileName = `${Date.now()}_${file.name}`;

  const { data: uploadData, error: uploadError } =
    await supabase.storage
      .from("documents")
      .upload(`uploads/${fileName}`, file);
    
  if (uploadError) {
    alert(uploadError.message);
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/ai-parser", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    alert("Unable to process document.");
    return;
  }

const aiData = await response.json();

  let ai;

try {
  ai =
    typeof aiData.result === "string"
      ? JSON.parse(aiData.result)
      : aiData.result;
} catch {
  ai = null;
}

if (!ai || typeof ai !== "object") {
  await supabase
    .from("industry_documents")
    .upsert(
      {
        user_id: currentUser.id,
        document_name: documentName,
        file_name: file.name,
        file_path: uploadData.path,
        ai_status: "Failed",
        verification_reason: "Corrupted or unreadable PDF.",
      },
      {
        onConflict: "document_name",
      }
    );

  await fetchDocuments();

  alert("Corrupted or unreadable PDF.");

  e.target.value = "";

  return;
}

if (!ai) {
  await supabase
    .from("industry_documents")
    .insert({
      user_id: currentUser.id,
      document_name: documentName,
      file_name: file.name,
      file_path: uploadData.path,
      ai_status: "Failed",
      verification_reason: "Corrupted or unreadable PDF.",
    });

  await fetchDocuments();

  alert("Corrupted or unreadable PDF.");

  e.target.value = "";

  return;
}

    const verificationStatus = aiData.verification_status;
    const verificationReason = aiData.verification_reason;
const expectedDocumentKeys: Record<string, string> = {
  "Consent to Operate (CCA)": "cca",
  "CGWA NOC": "cgwa",
  "Hazardous Waste Authorization": "hazardous_waste",
  "Factory License": "factory_license",
  "Fire NOC": "fire_noc",
  "Plastic EPR Certificate": "plastic_epr",
  "Battery EPR Certificate": "battery_epr",
  "E-Waste EPR Certificate": "ewaste_epr",
  "Used Oil EPR Certificate": "used_oil_epr",
  "Tyre EPR Certificate": "tyre_epr",
  "Environment Statement (Form-5)": "form5",
};

let finalStatus = verificationStatus;
let finalReason = verificationReason;

const expectedKey = expectedDocumentKeys[documentName];

if (
  expectedKey &&
  ai.document_key &&
  ai.document_key !== expectedKey
) {
  finalStatus = "Failed";
  finalReason = "Wrong document uploaded.";
}

    const { error: saveError } = await supabase

  .from("industry_documents")
  .upsert(
  {
      user_id: currentUser.id,
      document_name: documentName,
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

      ai_status: finalStatus,

      verification_reason: finalReason,
    },
    {
      onConflict: "document_name",
    }
  );

if (saveError) {
  await supabase.storage
    .from("documents")
    .remove([uploadData.path]);

  alert(saveError.message);

  e.target.value = "";

  return;
}
const { data: notificationData, error: notificationError } = await supabase
  .from("notifications")
  .insert({
    user_id: currentUser.id,
    document_name: documentName,
    notification_type: finalStatus === "Failed" ? "Invalid" : "Upload",
    title:
      finalStatus === "Failed"
        ? "Wrong Document Uploaded"
        : existingDocument
        ? "Document Replaced"
        : "Document Uploaded",
    message:
      finalStatus === "Failed"
        ? `${documentName} - ${finalReason}`
        : existingDocument
        ? `${documentName} replaced successfully.`
        : `${documentName} uploaded successfully.`,
    priority: finalStatus === "Failed" ? "High" : "Low",
    is_read: false,
  })
  .select();

console.log("Notification Data:", notificationData);
console.log("Notification Error:", notificationError);

if (notificationError) {
  alert(notificationError.message);
} else {
  console.log("Notification Inserted Successfully");
}

await fetchDocuments();

window.dispatchEvent(new Event("notifications-updated"));

alert("✅ Document Uploaded Successfully");

e.target.value = "";
  }}
  />
  </div>
  );
}
export default function DocumentCenterClient() {
  return <DocumentCenterContent />;
}