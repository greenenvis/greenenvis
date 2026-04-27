"use client";

import { useRouter } from "next/navigation";

export default function ApplicationDetailsPage() {
  const router = useRouter();

  const application = {
    companyName: "ABC Industries Pvt Ltd",
    applicationNo: "GE-2026-001",
    serviceType: "CCA Renewal",
    currentStatus: "Pending Approval",
    renewalDate: "15 December 2026",
    paymentStatus: "Paid",
    adminRemarks: "Documents verified. Awaiting final GPCB approval.",
    uploadedDocuments: [
      {
        name: "CCA Certificate.pdf",
        file: "/documents/cca-certificate.pdf",
      },
      {
        name: "Previous Consent Copy.pdf",
        file: "/documents/previous-consent-copy.pdf",
      },
      {
        name: "Annual Return 2025.pdf",
        file: "/documents/annual-return-2025.pdf",
      },
      {
        name: "Water Analysis Report.pdf",
        file: "/documents/water-analysis-report.pdf",
      },
    ],
  };

  return (
    <div
      style={{
        backgroundColor: "#f1f5f9",
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
            Application Details
          </h1>
          <p style={{ color: "#64748b", marginTop: "8px" }}>
            Full Compliance Application Tracking System
          </p>
        </div>

        {/* Application Information */}
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            marginBottom: "30px",
          }}
        >
          <h2>Application Information</h2>

          <p>
            <strong>Company Name:</strong> {application.companyName}
          </p>

          <p>
            <strong>Application Number:</strong> {application.applicationNo}
          </p>

          <p>
            <strong>Service Type:</strong> {application.serviceType}
          </p>

          <p>
            <strong>Current Status:</strong> {application.currentStatus}
          </p>

          <p>
            <strong>Renewal Date:</strong> {application.renewalDate}
          </p>

          <p>
            <strong>Payment Status:</strong> {application.paymentStatus}
          </p>

          <p>
            <strong>Admin Remarks:</strong> {application.adminRemarks}
          </p>
        </div>

        {/* Real Document Download System */}
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            marginBottom: "30px",
          }}
        >
          <h2>Uploaded Documents</h2>

          <div style={{ display: "grid", gap: "14px" }}>
            {application.uploadedDocuments.map((doc, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #cbd5e1",
                  padding: "16px",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{doc.name}</span>

                <a
                  href={doc.file}
                  download
                  target="_blank"
                  style={{
                    background: "#16a34a",
                    color: "#ffffff",
                    textDecoration: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                  }}
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
          }}
        >
          <button
            onClick={() => router.push("/dashboard")}
            style={{
              background: "#0b4f84",
              color: "#ffffff",
              border: "none",
              padding: "14px 22px",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}