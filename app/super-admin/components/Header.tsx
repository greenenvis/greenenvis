"use client";

export default function Header() {
  return (
    <header
      style={{
        height: 70,
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      <div>
        <h3 style={{ margin: 0 }}>Super Admin Dashboard</h3>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span>🔔</span>
        <span>👤 Super Admin</span>
      </div>
    </header>
  );
}
export const HEADER_TEST = "OK";