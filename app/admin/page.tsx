"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const summaryCards = [
    { title: "Total Clients", value: "128", color: "#2563eb" },
    { title: "Pending Approval", value: "14", color: "#dc2626" },
    { title: "Renewal Due", value: "09", color: "#f59e0b" },
    { title: "Payments Received", value: "342", color: "#16a34a" },
  ];

  const [clients, setClients] = useState([
    {
      name: "ABC Industries Pvt Ltd",
      service: "CCA Renewal",
      status: "Pending",
      payment: "Paid",
    },
    {
      name: "XYZ Chemicals",
      service: "BMW Authorization",
      status: "Approved",
      payment: "Pending",
    },
    {
      name: "Sun Pharma Unit",
      service: "Used Oil EPR",
      status: "In Review",
      payment: "Paid",
    },
  ]);

  const updateStatus = (index: number, newStatus: string) => {
    const updatedClients = [...clients];
    updatedClients[index].status = newStatus;
    setClients(updatedClients);

    alert(`Client status updated to: ${newStatus}`);
  };

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
          {[
            "Admin Dashboard",
            "Client Management",
            "Pending Approvals",
            "Renewal Reminder",
            "Payment Status",
            "Reports",
            "Support",
          ].map((item, index) => (
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
            alert("Admin Logged Out");
            router.push("/admin-login");
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
        {/* Header */}
        <div
          style={{
            background: "#ffffff",
            padding: "20px 30px",
            borderRadius: "14px",
            marginBottom: "25px",
          }}
        >
          <h1 style={{ margin: 0, color: "#166534" }}>
            Real Approve / Reject System
          </h1>
          <p style={{ color: "#64748b", marginTop: "8px" }}>
            Admin can update client application status instantly
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

        {/* Client Table */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            padding: "30px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Client Status Management
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
                  <th style={thStyle}>Client Name</th>
                  <th style={thStyle}>Service</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Payment</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>

              <tbody>
                {clients.map((client, index) => (
                  <tr key={index}>
                    <td style={tdStyle}>{client.name}</td>
                    <td style={tdStyle}>{client.service}</td>
                    <td style={tdStyle}>{client.status}</td>
                    <td style={tdStyle}>{client.payment}</td>

                    <td style={tdStyle}>
                      <button
                        onClick={() => updateStatus(index, "Approved")}
                        style={{
                          background: "#16a34a",
                          color: "#ffffff",
                          border: "none",
                          padding: "8px 14px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          marginRight: "10px",
                        }}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(index, "Rejected")}
                        style={{
                          background: "#dc2626",
                          color: "#ffffff",
                          border: "none",
                          padding: "8px 14px",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* WhatsApp */}
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