"use client";
import { useRouter } from "next/navigation";
export default function AdminPanel() {
  const router = useRouter(); = [
    { title: "Total Clients", value: "128" },
    { title: "Pending Approvals", value: "14" },
    { title: "Expiring Consents", value: "9" },
    { title: "Documents Uploaded", value: "342" },
  ];

  const quickActions = [
    "Add New Client",
    "Update Compliance Status",
    "Approve Uploaded Documents",
    "Send Renewal Reminder",
    "Generate Client Report",
  ];

  return (<button
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
    marginTop: "20px",
  }}
>
  Admin Logout
</button>
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
            padding: "30px 40px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ margin: 0, color: "#166534" }}>
            Admin Panel
          </h1>
          <p style={{ marginTop: "10px", color: "#64748b" }}>
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
          {adminStats.map((item) => (
            <div
              key={item.title}
              style={{
                background: "#ffffff",
                padding: "30px",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              }}
            >
              <p style={{ color: "#64748b", marginBottom: "10px" }}>
                {item.title}
              </p>

              <h2 style={{ margin: 0, color: "#166534" }}>
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div
          style={{
            background: "#ffffff",
            padding: "35px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ marginBottom: "25px" }}>
            Quick Actions
          </h2>

          <div style={{ display: "grid", gap: "15px" }}>
            {quickActions.map((action) => (
              <div
                key={action}
                style={{
                  background: "#f8fafc",
                  padding: "18px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                }}
              >
                {action}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}