"use client";

export default function ComplianceLibrary() {
  const libraries = [
    {
      title: "GPCB",
      description: "Consent, CCA, Hazardous Waste, Environmental Audit",
      icon: "🏭",
    },
    {
      title: "CPCB",
      description: "National Environmental Compliance Guidelines",
      icon: "🌍",
    },
    {
      title: "CGWA",
      description: "Ground Water NOC & Compliance",
      icon: "💧",
    },
    {
      title: "Plastic EPR",
      description: "Plastic Waste Management Compliance",
      icon: "♻️",
    },
    {
      title: "E-Waste EPR",
      description: "E-Waste Registration & Returns",
      icon: "💻",
    },
    {
      title: "Battery Waste EPR",
      description: "Battery Waste Management Rules",
      icon: "🔋",
    },
    {
      title: "Biomedical Waste",
      description: "BMW Authorization & Compliance",
      icon: "🏥",
    },
    {
      title: "Hazardous Waste",
      description: "Storage, Manifest & Annual Return",
      icon: "⚠️",
    },
    {
      title: "Environmental Clearance",
      description: "EC, EIA & Compliance Conditions",
      icon: "📑",
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
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            color: "#065f46",
            marginBottom: "10px",
          }}
        >
          Compliance Library
        </h1>

        <p
          style={{
            color: "#64748b",
          }}
        >
          Access all environmental compliance information from one place.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        {libraries.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#ffffff",
              borderRadius: "15px",
              padding: "25px",
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
              {item.icon}
            </div>

            <h2
              style={{
                color: "#065f46",
                marginBottom: "10px",
              }}
            >
              {item.title}
            </h2>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.6",
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}