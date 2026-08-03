"use client";

export default function UnderDevelopmentPage() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "40px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ fontSize: "64px" }}>🚧</div>

        <h1
          style={{
            marginTop: "16px",
            marginBottom: "10px",
            color: "#0B4F84",
          }}
        >
          UNDER DEVELOPMENT
        </h1>

        <p
          style={{
            fontSize: "17px",
            color: "#4b5563",
            lineHeight: 1.8,
          }}
        >
          This feature is currently under development.
          <br />
          It will be available in an upcoming update.
        </p>

        <div
          style={{
            marginTop: "20px",
            color: "#16a34a",
            fontWeight: 600,
          }}
        >
          Thank you for your patience and cooperation.
        </div>

        <button
          onClick={() => window.history.back()}
          style={{
            marginTop: "30px",
            padding: "12px 24px",
            borderRadius: "10px",
            border: "none",
            background: "#0B4F84",
            color: "#ffffff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}