"use client";

export default function HomePage() {
  const services = [
    "GPCB Consent (CTE / CCA)",
    "BMW Authorization",
    "EPR Registration",
    "Used Oil EPR",
    "Hazardous Waste Authorization",
    "CGWA Clearance",
    "Environmental Audit",
    "Stack Monitoring",
    "Water & Air Analysis",
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
            padding: "25px 40px",
            borderRadius: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: "34px", color: "#166534" }}>
              GreenEnvis
            </h1>
            <p style={{ marginTop: "8px", color: "#64748b" }}>
              Simplifying Environmental Compliance
            </p>
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <a
              href="/login"
              style={{
                background: "#16a34a",
                color: "#fff",
                padding: "12px 18px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Client Login
            </a>

            <a
              href="/admin-login"
              style={{
                background: "#0f172a",
                color: "#fff",
                padding: "12px 18px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Admin Login
            </a>

            <a
              href="https://wa.me/918780723063"
              target="_blank"
              style={{
                background: "#25D366",
                color: "#fff",
                padding: "12px 18px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Free Consultation
            </a>
          </div>
        </div>

        {/* Hero Section */}
        <div
          style={{
            background: "#ffffff",
            padding: "40px",
            borderRadius: "16px",
            marginBottom: "40px",
          }}
        >
          <p style={{ color: "#15803d", fontWeight: "bold" }}>
            GPCB • CPCB • COMPLIANCE
          </p>

          <h2 style={{ fontSize: "42px", margin: "20px 0" }}>
            Environmental Compliance Made Simple
          </h2>

          <p style={{ fontSize: "18px", color: "#475569", lineHeight: "1.8" }}>
            CTE, CCA, BMW Authorization, EPR, CGWA, Environmental Audit,
            Consent Renewals — All in One Smart Dashboard
          </p>
        </div>

        {/* Services */}
        <div
          style={{
            background: "#ffffff",
            padding: "40px",
            borderRadius: "16px",
            marginBottom: "40px",
          }}
        >
          <h2 style={{ marginBottom: "25px" }}>Our Services</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #cbd5e1",
                  padding: "18px",
                  borderRadius: "10px",
                }}
              >
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Contact */}
        <div
          style={{
            background: "#ffffff",
            padding: "40px",
            borderRadius: "16px",
          }}
        >
          <h2>Quick Contact</h2>

          <p><strong>📞 Mobile:</strong> 8780723063</p>
          <p><strong>📧 Email:</strong> info@greenenvis.com</p>
          <p><strong>📍 Service Area:</strong> All Gujarat</p>
          <p><strong>🏢 Support:</strong> GPCB / CPCB / EPR Consultancy</p>
        </div>
      </div>
    </div>
  );
}