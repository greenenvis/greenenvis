"use client";

export default function GPCBPage() {
  const modules = [
    {
      title: "Consent to Establish (CTE / NOC)",
      description:
        "Store Fresh, Renewal and Amendment CTE copies securely.",
      icon: "🏗️",
    },
    {
      title: "Consent to Operate (CTO / CCA)",
      description:
        "Store Fresh, Renewal and Amendment CCA copies securely.",
      icon: "🏭",
    },
    {
      title: "Hazardous Waste Authorization",
      description:
        "Store Hazardous Waste Authorization documents.",
      icon: "⚠️",
    },
    {
      title: "Environmental Audit Reports",
      description:
        "Maintain year-wise Environmental Audit Reports.",
      icon: "📊",
    },
    {
      title: "Annual Return Filing",
      description:
        "Fill annual return through smart digital form.",
      icon: "📝",
    },
    {
      title: "Annual Environmental Statement",
      description:
        "Submit Form-V through digital smart form.",
      icon: "📋",
    },
    {
      title: "Other Useful Forms & Formats",
      description:
        "Download useful compliance forms and formats.",
      icon: "📂",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "30px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#065f46",
          }}
        >
          GPCB Compliance Center
        </h1>

        <p
          style={{
            color: "#64748b",
            marginTop: "10px",
          }}
        >
          Store, manage and access all GPCB related documents from one place.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
          gap: "20px",
        }}
      >
        {modules.map((module, index) => (
          <div
            key={index}
            style={{
              background: "#ffffff",
              padding: "25px",
              borderRadius: "15px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                fontSize: "40px",
                marginBottom: "15px",
              }}
            >
              {module.icon}
            </div>

            <h2
              style={{
                color: "#065f46",
                marginBottom: "10px",
              }}
            >
              {module.title}
            </h2>

            <p
              style={{
                color: "#64748b",
              }}
            >
              {module.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}