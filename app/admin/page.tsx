"use client";

import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const actions = [
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
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ margin: 0, color: "#166534" }}>Admin Panel</h1>
          <p style={{ color: "#64748b" }}>
            GreenEnvis Internal Management Dashboard
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {[
            ["Total Clients", "128"],
            ["Pending Approvals", "14"],
            ["Expiring Consents", "9"],
            ["Documents Uploaded", "342"],
          ].map((item, index) => (
            <div
              key={index}
              style={{
                background: "#ffffff",
                padding: "20px",
                borderRadius: "14px",
              }}
            >
              <p style={{ margin: 0, color: "#64748b" }}>{item[0]}</p>
              <h2 style={{ marginTop: "10px", color: "#166534" }}>
                {item[1]}
              </h2>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
          }}
        >
          <h2>Quick Actions</h2>

          <div style={{ display: "grid", gap: "14px" }}>
            {actions.map((action, index) => (
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
              marginTop: "25px",
            }}
          >
            Admin Logout
          </button>
        </div>
      </div>
    </div>
  );
}