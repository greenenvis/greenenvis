"use client";

import { useRouter } from "next/navigation";

export default function ClientDashboard() {
  const router = useRouter();

  const sidebarMenu = [
    "Dashboard",
    "Client Profile",
    "Apply for Consent",
    "BMW Authorization",
    "EPR Registration",
    "Used Oil EPR",
    "Renewal Applications",
    "Document Upload",
    "Payment Details",
    "Reports",
    "Support",
  ];

  const summaryCards = [
    { title: "Drafts", value: "04", color: "#7c3aed" },
    { title: "Submitted", value: "12", color: "#16a34a" },
    { title: "Pending Action", value: "03", color: "#dc2626" },
    { title: "Completed", value: "18", color: "#059669" },
  ];

  const applications = [
    {
      appNo: "GE-2026-001",
      project: "ABC Industries Pvt Ltd",
      type: "CCA Renewal",
      status: "Pending",
    },
    {
      appNo: "GE-2026-002",
      project: "XYZ Chemicals",
      type: "BMW Authorization",
      status: "Approved",
    },
    {
      appNo: "GE-2026-003",
      project: "Sun Pharma Unit",
      type: "Used Oil EPR",
      status: "In Review",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "280px",
          background: "#ffffff",
          borderRight: "1px solid #dbe4ee",
          padding: "20px",
        }}
      >
        <div style={{ marginBottom: "30px", textAlign: "center" }}>
          <img
            src="/logo.png"
            alt="GreenEnvis Logo"
            style={{
              width: "180px",
              marginBottom: "10px",
            }}
          />
        </div>

        <div style={{ display: "grid", gap: "12px" }}>
          {sidebarMenu.map((item, index) => (
            <div
              key={index}
              style={{
                padding: "14px 16px",
                borderRadius: "10px",
                background: index === 0 ? "#e0f2fe" : "#ffffff",
                border: "1px solid #dbe4ee",
                cursor: "pointer",
                fontWeight: index === 0 ? "bold" : "normal",
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            alert("Logged Out Successfully");
            router.push("/login");
          }}
          style={{
            marginTop: "30px",
            width: "100%",
            background: "#dc2626",
            color: "#ffffff",
            border: "none",
            padding: "14px",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        {/* Top Header */}
        <div
          style={{
            background: "#ffffff",
            padding: "20px 30px",
            borderRadius: "14px",
            marginBottom: "25px",
          }}
        >
          <h1 style={{ margin: 0, color: "#166534" }}>
            Welcome to GreenEnvis Portal
          </h1>
          <p style={{ color: "#64748b", marginTop: "8px" }}>
            Smart Environmental Compliance Management System
          </p>
        </div>

        {/* Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {summaryCards.map((card, index) => (
            <div
              key={index}
              style={{
                background: card.color,
                color: "#ffffff",
                padding: "24px",
                borderRadius: "14px",
              }}
            >
              <h3 style={{ margin: 0 }}>{card.title}</h3>
              <h1 style={{ marginTop: "10px" }}>{card.value}</h1>
            </div>
          ))}
        </div>

        {/* Applications Table */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            padding: "30px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Applications for Compliance Management
          </h2>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
              }}
            >
              <thead>
                <tr style={{ background: "#0b4f84", color: "#ffffff" }}>
                  <th style={thStyle}>Application No</th>
                  <th style={thStyle}>Project Name</th>
                  <th style={thStyle}>Application Type</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app, index) => (
                  <tr key={index}>
                    <td style={tdStyle}>{app.appNo}</td>
                    <td style={tdStyle}>{app.project}</td>
                    <td style={tdStyle}>{app.type}</td>
                    <td style={tdStyle}>{app.status}</td>
                    <td style={tdStyle}>
                      <button
                        style={{
                          background: "#16a34a",
                          color: "#ffffff",
                          border: "none",
                          padding: "8px 14px",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/918780723063"
          target="_blank"
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            background: "#25D366",
            color: "#ffffff",
            padding: "16px 22px",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "bold",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            zIndex: 999,
          }}
        >
          WhatsApp Us
        </a>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "14px",
  textAlign: "left" as const,
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #e2e8f0",
};