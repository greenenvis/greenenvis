"use client";

import { useRouter } from "next/navigation";

const forms = [
  {
    icon: "🏥",
    title: "Biomedical Waste Annual Return",
    form: "Form IV",
    description:
      "Annual return for biomedical waste generation, handling, treatment and disposal.",
    path: "/annual-return/bmw",
  },
  {
    icon: "♻️",
    title: "E-Waste Annual Return",
    form: "Form III",
    description:
      "Annual return for e-waste generation, collection, storage and management.",
    path: "/annual-return/e-waste",
  },
  {
    icon: "🏭",
    title: "General Industry Annual Return",
    form: "Form IV",
    description:
      "Annual return for general industries to submit applicable environmental information.",
    path: "/annual-return/general-industry",
  },
];

export default function FormsPage() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px",
        background: "#f8fafc",
      }}
    >
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            margin: 0,
            color: "#0B4F84",
            fontSize: "28px",
          }}
        >
          📄 Forms
        </h1>

        <p
          style={{
            marginTop: "8px",
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Select the required annual return form and complete your compliance
          submission.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {forms.map((item) => (
          <div
            key={item.path}
            style={{
              background: "#ffffff",
              border: "1px solid #dbe4ee",
              borderRadius: "14px",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(15, 23, 42, 0.05)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: "34px",
                marginBottom: "14px",
              }}
            >
              {item.icon}
            </div>

            <div
              style={{
                display: "inline-block",
                width: "fit-content",
                background: "#e0f2fe",
                color: "#0369a1",
                padding: "5px 10px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 700,
                marginBottom: "12px",
              }}
            >
              {item.form}
            </div>

            <h2
              style={{
                margin: "0 0 10px 0",
                fontSize: "19px",
                color: "#1e293b",
              }}
            >
              {item.title}
            </h2>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "14px",
                lineHeight: "1.6",
                flex: 1,
              }}
            >
              {item.description}
            </p>

            <button
              onClick={() => router.push(item.path)}
              style={{
                marginTop: "22px",
                width: "100%",
                background: "#0B4F84",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              Open Form →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}