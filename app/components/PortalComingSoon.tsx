"use client";

import { useRouter } from "next/navigation";

type Props = {
  title: string;
  description: string;
  features: string[];
};

export default function PortalComingSoon({
  title,
  description,
  features,
}: Props) {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef4fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "700px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "50px",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,.10)",
        }}
      >
        <div style={{ fontSize: "70px" }}>🚧</div>

        <h1
          style={{
            color: "#0B4F84",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "18px",
            lineHeight: "30px",
          }}
        >
          {description}
        </p>

        <div
          style={{
            marginTop: "35px",
            textAlign: "left",
            background: "#f8fafc",
            padding: "25px",
            borderRadius: "12px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Upcoming Features</h3>

          {features.map((item, index) => (
            <p key={index}>✔ {item}</p>
          ))}
        </div>

        <div
          style={{
            marginTop: "30px",
            color: "#16a34a",
            fontWeight: "bold",
          }}
        >
          Thank you for your patience.
        </div>

        <button
          onClick={() => router.push("/")}
          style={{
            marginTop: "30px",
            background: "#0B4F84",
            color: "#ffffff",
            border: "none",
            padding: "14px 30px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ← Back to Homepage
        </button>
      </div>
    </div>
    
  );
}