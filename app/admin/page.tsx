"use client";

import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const adminStats = [
    { title: "Total Clients", value: "128" },
    { title: "Pending Approvals", value: "14" },
    { title: "Expiring Consents", value: "9" },
    { title: "Documents Uploaded", value: "342" },
  ];

  const clientStatusUpdates = [
    {
      company: "ABC Industries Pvt Ltd",
      document: "CCA Certificate",
      status: "Approved",
    },
    {
      company: "XYZ Chemicals",
      document: "BMW Authorization",
      status: "Pending",
    },
    {
      company: "Sun Pharma Unit",
      document: "Annual Return",
      status: "Need Upload",
    },
  ];

  const quickActions = [
    "Add New Client",
    "Update Compliance Status",
    "Approve Uploaded Documents",
    "Send Renewal Reminder",
    "Generate Client Report",
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
            Admin Panel
          </h1>
          <p style={{ color: "#64748b" }}>
            GreenEnvis Internal Management Dashboard
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {adminStats.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#ffffff",
                padding: "25px",
                borderRadius: "16px",
              }}
            >
              <p style={{ margin: 0, color: "#64748b" }}>
                {item.title}
              </p>

              <h2 style={{ marginTop: "10px", color: "#166534" }}>
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Client Status Update System */}
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            marginBottom: "30px",
          }}
        >
          <h2>Client Status Update System</h2>

          <div style={{ display: "grid", gap: "16px" }}>
            {clientStatusUpdates.map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #cbd5e1",
                  padding: "18px",
                  borderRadius: "10px",
                }}
              >
                <p>
                  <strong>Company:</strong> {item.company}
                </p>

                <p>
                  <strong>Document:</strong> {item.document}
                </p>

                <p>
                  <strong>Status:</strong> {item.status}
                </p>

                <button
                  style={{
                    marginTop: "10px",
                    background: "#16a34a",
                    color: "#fff",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Update Status
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            marginBottom: "30px",
          }}
        >
          <h2>Quick Actions</h2>

          <div style={{ display: "grid", gap: "14px" }}>
            {quickActions.map((action, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #cbd5e1",
                  padding: "16px",
                  borderRadius: "10px",
                }}
              >
                {action}
              </div>
            ))}
          </div>
        </div>

        {/* Admin Logout */}
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
          }}
        >
          <button
            onClick={() => {
              alert("Admin Logged Out");
              router.push("/admin-login");
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
            Admin Logout
          </button>
        </div>
      </div>
    </div>
  );
}