"use client";

import { useRouter } from "next/navigation";

export default function ClientDashboard() {
  const router = useRouter();

  const company = {
    company: "ABC Industries Pvt Ltd",
    status: "Active",
    nextRenewal: "15 July 2026",
    support: "GreenEnvis Support Team",
  };

  const complianceStatus = [
    "GPCB Consent (CCA) - Approved",
    "BMW Authorization - Pending",
    "Used Oil EPR - Submitted",
    "Hazardous Waste Authorization - In Process",
    "Annual Return Filing - Upcoming",
  ];

  const documents = [
    {
      name: "CCA Certificate",
      status: "Approved",
      renewal: "15 Dec 2026",
    },
    {
      name: "BMW Authorization",
      status: "Pending",
      renewal: "05 Aug 2026",
    },
    {
      name: "Annual Return",
      status: "Need Upload",
      renewal: "30 June 2026",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ margin: 0, color: "#166534" }}>
            Client Dashboard
          </h1>
          <p style={{ color: "#64748b" }}>
            Welcome to your compliance management portal
          </p>
        </div>

        {/* Company Information */}
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            marginBottom: "30px",
          }}
        >
          <h2>Company Information</h2>

          <p>
            <strong>Company:</strong> {company.company}
          </p>

          <p>
            <strong>Status:</strong> {company.status}
          </p>

          <p>
            <strong>Next Renewal:</strong> {company.nextRenewal}
          </p>

          <p>
            <strong>Support:</strong> {company.support}
          </p>
        </div>

        {/* Compliance Status */}
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            marginBottom: "30px",
          }}
        >
          <h2>Compliance Status</h2>

          <div style={{ display: "grid", gap: "14px" }}>
            {complianceStatus.map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #cbd5e1",
                  padding: "16px",
                  borderRadius: "10px",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Upload Documents */}
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            marginBottom: "30px",
          }}
        >
          <h2>Upload Documents</h2>

          <input
            type="file"
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          />

          <button
            style={{
              background: "#16a34a",
              color: "#fff",
              border: "none",
              padding: "14px 20px",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Upload File
          </button>
        </div>

        {/* Document Tracking */}
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            marginBottom: "30px",
          }}
        >
          <h2>Document Tracking</h2>

          <div style={{ display: "grid", gap: "16px" }}>
            {documents.map((doc, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #cbd5e1",
                  padding: "18px",
                  borderRadius: "10px",
                }}
              >
                <p>
                  <strong>Document:</strong> {doc.name}
                </p>

                <p>
                  <strong>Status:</strong> {doc.status}
                </p>

                <p>
                  <strong>Renewal Date:</strong> {doc.renewal}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
          }}
        >
          <button
            onClick={() => {
              alert("Logged Out Successfully");
              router.push("/login");
            }}
            style={{
              background: "#dc2626",
              color: "#fff",
              border: "none",
              padding: "14px 20px",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}