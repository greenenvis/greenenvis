"use client";
import { useRouter } from "next/navigation";
export default function ClientDashboard() {
  const router = useRouter(); = {
    company: "ABC Industries Pvt Ltd",
    status: "Active",
    nextRenewal: "15 July 2026",
    consultant: "GreenEnvis Support Team",
  };

  const complianceItems = [
    "GPCB Consent (CCA) - Approved",
    "BMW Authorization - Pending",
    "Used Oil EPR - Submitted",
    "Hazardous Waste Authorization - In Process",
    "Annual Return Filing - Upcoming",
  ];

  return (<button
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
    marginTop: "20px",
  }}
>
  Logout
</button>
    <div
      style={{
        background: "#f5f7fa",
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
            padding: "25px 40px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ margin: 0, color: "#166534" }}>
            Client Dashboard
          </h1>
          <p style={{ color: "#64748b", marginTop: "10px" }}>
            Welcome to your compliance management portal
          </p>
        </div>

        {/* Company Info */}
        <div
          style={{
            background: "#ffffff",
            padding: "35px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            Company Information
          </h2>

          <p><strong>Company:</strong> {clientData.company}</p>
          <p><strong>Status:</strong> {clientData.status}</p>
          <p><strong>Next Renewal:</strong> {clientData.nextRenewal}</p>
          <p><strong>Support:</strong> {clientData.consultant}</p>
        </div>

        {/* Compliance Status */}
        <div
          style={{
            background: "#ffffff",
            padding: "35px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ marginBottom: "25px" }}>
            Compliance Status
          </h2>

          <div style={{ display: "grid", gap: "15px" }}>
            {complianceItems.map((item) => (
              <div
                key={item}
                style={{
                  background: "#f8fafc",
                  padding: "18px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Upload Section */}
        <div
          style={{
            background: "#ffffff",
            padding: "35px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            Upload Documents
          </h2>

          <input
            type="file"
            style={{
              padding: "12px",
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              width: "100%",
              marginBottom: "20px",
            }}
          />

          <button
            style={{
              background: "#16a34a",
              color: "#fff",
              border: "none",
              padding: "14px 24px",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Upload File
          </button>
        </div>
      </div>
    </div>
  );
}