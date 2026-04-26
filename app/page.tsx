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
        position: "relative",
      }}
    >
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918780723063"
        target="_blank"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          background: "#25D366",
          color: "#fff",
          padding: "16px 22px",
          borderRadius: "50px",
          textDecoration: "none",
          fontWeight: "bold",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          zIndex: 999,
        }}
      >
        WhatsApp Us
      </a>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            background: "#ffffff",
            padding: "25px 40px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: "36px", color: "#166534" }}>
              GreenEnvis
            </h1>
            <p style={{ marginTop: "8px", color: "#64748b" }}>
              Simplifying Environmental Compliance
            </p>
          </div>

          <a
            href="https://wa.me/918780723063"
            target="_blank"
            style={{
              padding: "12px 22px",
              borderRadius: "10px",
              color: "#fff",
              background: "#16a34a",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Free Consultation
          </a>
        </div>

        {/* Hero Section */}
        <div
          style={{
            background: "#ffffff",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
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

        {/* Services Section */}
        <div
          style={{
            background: "#ffffff",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            marginBottom: "40px",
          }}
        >
          <h3 style={{ fontSize: "28px", marginBottom: "30px" }}>
            Our Services
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {services.map((service) => (
              <div
                key={service}
                style={{
                  background: "#f8fafc",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                }}
              >
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div
          style={{
            background: "#ffffff",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ fontSize: "28px", marginBottom: "30px" }}>
            Quick Contact
          </h3>

          <div style={{ lineHeight: "2", fontSize: "18px", color: "#334155" }}>
            <p><strong>📞 Mobile:</strong> 8780723063</p>
            <p><strong>📧 Email:</strong> info@greenenvis.com</p>
            <p><strong>📍 Service Area:</strong> All Gujarat</p>
            <p><strong>🏢 Support:</strong> GPCB / CPCB / EPR / Compliance Consultancy</p>
          </div>
        </div>
      </div>
    </div>
  );
}