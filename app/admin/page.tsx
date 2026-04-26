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
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
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
            <h1
              style={{
                margin: 0,
                fontSize: "36px",
                color: "#166534",
              }}
            >
              GreenEnvis
            </h1>
            <p
              style={{
                marginTop: "8px",
                color: "#64748b",
                fontSize: "16px",
              }}
            >
              Simplifying Environmental Compliance
            </p>
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <a
              href="/login"
              style={{
                padding: "12px 22px",
                border: "1px solid #cbd5e1",
                borderRadius: "10px",
                color: "#0f172a",
                background: "#fff",
                fontWeight: "bold",
              }}
            >
              Client Login
            </a>

            <a
              href="https://wa.me/918780723063"
              target="_blank"
              style={{
                padding: "12px 22px",
                borderRadius: "10px",
                color: "#fff",
                background: "#16a34a",
                fontWeight: "bold",
              }}
            >
              Free Consultation
            </a>
          </div>
        </div>

        {/* Hero */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "30px",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "40px",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <p
              style={{
                color: "#15803d",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              GPCB • CPCB • COMPLIANCE
            </p>

            <h2
              style={{
                fontSize: "42px",
                marginBottom: "20px",
                color: "#0f172a",
              }}
            >
              Environmental Compliance Made Simple
            </h2>

            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.8",
                color: "#475569",
              }}
            >
              CTE, CCA, BMW Authorization, EPR, CGWA, Environmental Audit,
              Consent Renewals — All in One Smart Dashboard
            </p>

            <div
              style={{
                marginTop: "30px",
                display: "flex",
                gap: "15px",
              }}
            >
              <a
                href="/dashboard"
                style={{
                  padding: "14px 24px",
                  background: "#16a34a",
                  color: "#fff",
                  borderRadius: "12px",
                  fontWeight: "bold",
                }}
              >
                Client Dashboard
              </a>
            </div>
          </div>

          {/* Contact */}
          <div
            style={{
              background: "#ffffff",
              padding: "30px",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ marginBottom: "20px" }}>Quick Contact</h3>
            <p style={{ marginBottom: "12px" }}>📞 8780723063</p>
            <p style={{ marginBottom: "12px" }}>✉️ info@greenenvis.com</p>
            <p>📍 Gujarat, India</p>
          </div>
        </div>

        {/* Services */}
        <div
          style={{
            background: "#ffffff",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h3
            style={{
              fontSize: "28px",
              marginBottom: "30px",
            }}
          >
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
                  fontWeight: "500",
                }}
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}