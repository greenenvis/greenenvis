export default function HomePage() {
  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#f8fafc",
        minHeight: "100vh",
        color: "#1e293b",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ color: "#15803d", margin: 0 }}>GreenEnvis</h1>
          <p style={{ margin: 0, color: "#64748b" }}>
            Simplifying Environmental Compliance
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <a
            href="/login"
            style={{
              padding: "10px 18px",
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              textDecoration: "none",
              color: "#0f172a",
              background: "#fff",
            }}
          >
            Client Login
          </a>

          <a
            href="https://wa.me/918780723063"
            target="_blank"
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              textDecoration: "none",
              color: "#fff",
              background: "#16a34a",
            }}
          >
            Free Consultation
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "60px auto",
          padding: "0 20px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <div>
          <p style={{ color: "#15803d", fontWeight: "bold" }}>
            GPCB • CPCB • COMPLIANCE
          </p>

          <h2 style={{ fontSize: "48px", marginBottom: "20px" }}>
            Environmental Compliance Made Simple
          </h2>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "#475569",
            }}
          >
            CTE, CCA, BMW Authorization, EPR, CGWA, Environmental Audit,
            Consent Renewals — All in One Smart Dashboard
          </p>

          <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
            <a
              href="https://wa.me/918780723063"
              target="_blank"
              style={{
                padding: "14px 24px",
                background: "#16a34a",
                color: "#fff",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Get Free Consultation
            </a>

            <a
              href="/dashboard"
              style={{
                padding: "14px 24px",
                border: "1px solid #cbd5e1",
                borderRadius: "12px",
                textDecoration: "none",
                color: "#0f172a",
                background: "#fff",
              }}
            >
              Client Dashboard
            </a>
          </div>
        </div>

        {/* Contact Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            border: "1px solid #e2e8f0",
          }}
        >
          <h3>Quick Contact</h3>
          <p>📞 8780723063</p>
          <p>✉️ info@greenenvis.com</p>
          <p>📍 Gujarat, India</p>
        </div>
      </section>

      {/* Services */}
      <section
        style={{
          background: "#ffffff",
          padding: "70px 20px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "auto" }}>
          <h3 style={{ fontSize: "32px", marginBottom: "30px" }}>
            Our Services
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {[
              "GPCB Consent (CTE / CCA)",
              "BMW Authorization",
              "EPR Registration",
              "Used Oil EPR",
              "Hazardous Waste Authorization",
              "CGWA Clearance",
              "Environmental Audit",
              "Stack Monitoring",
              "Water & Air Analysis",
            ].map((service) => (
              <div
                key={service}
                style={{
                  background: "#f8fafc",
                  padding: "20px",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  fontWeight: "500",
                }}
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}