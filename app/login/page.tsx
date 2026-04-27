"use client";

export default function HomePage() {
  const notices = [
    "Provisional List of Candidates for Environmental Compliance Review",
    "Exam Syllabus (Prelim) of GPCB Environmental Engineer Compliance Audit",
    "Provisional Answerkey of Used Oil EPR Compliance Review",
    "Assistant Director Environmental Audit Notification",
    "Important Notice Regarding Renewal Submission Deadline",
  ];

  const advertisements = [
    "New CTE / CCA Applications Open",
    "BMW Authorization Fresh Applications",
    "Used Oil EPR Annual Return Submission",
    "Hazardous Waste Authorization Updates",
    "CGWA Clearance Compliance Window Open",
  ];

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
        backgroundColor: "#f4f7fb",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          background: "#ffffff",
          padding: "20px 40px",
          borderBottom: "1px solid #dbe4ee",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "42px",
                color: "#0b2a6f",
                fontWeight: "bold",
              }}
            >
              GREENENVIS
            </h1>

            <p
              style={{
                marginTop: "8px",
                color: "#475569",
                fontSize: "16px",
              }}
            >
              Gujarat Environmental Compliance Portal
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontWeight: "bold", color: "#166534" }}>
              GPCB • CPCB • COMPLIANCE
            </p>
            <p style={{ marginTop: "8px", color: "#64748b" }}>
              Smart Compliance Management System
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div
        style={{
          background: "#0b4f84",
          padding: "0",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {[
            ["Home", "/"],
            ["Client Login", "/login"],
            ["Admin Login", "/admin-login"],
            ["Client Dashboard", "/dashboard"],
            ["Admin Panel", "/admin"],
            ["Services", "#services"],
            ["Contact", "#contact"],
          ].map((item, index) => (
            <a
              key={index}
              href={item[1]}
              style={{
                color: "#ffffff",
                padding: "18px 24px",
                textDecoration: "none",
                borderRight: "1px solid rgba(255,255,255,0.15)",
                fontWeight: "500",
              }}
            >
              {item[0]}
            </a>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "30px auto",
          padding: "0 20px",
        }}
      >
        {/* Notice + Advertisement */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "30px",
            marginBottom: "30px",
          }}
        >
          {/* Notice Board */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid #dbe4ee",
            }}
          >
            <div
              style={{
                background: "#0b4f84",
                color: "#ffffff",
                padding: "16px 20px",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Notice Board
            </div>

            <div style={{ padding: "25px" }}>
              {notices.map((notice, index) => (
                <p
                  key={index}
                  style={{
                    marginBottom: "18px",
                    color: "#1e3a8a",
                    lineHeight: "1.6",
                  }}
                >
                  ▸ {notice}
                </p>
              ))}
            </div>
          </div>

          {/* Current Advertisement */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid #dbe4ee",
            }}
          >
            <div
              style={{
                background: "#0b4f84",
                color: "#ffffff",
                padding: "16px 20px",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Current Advertisement
            </div>

            <div style={{ padding: "25px" }}>
              {advertisements.map((item, index) => (
                <p
                  key={index}
                  style={{
                    marginBottom: "18px",
                    color: "#1e3a8a",
                    lineHeight: "1.6",
                  }}
                >
                  ▸ {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div
          id="services"
          style={{
            background: "#ffffff",
            borderRadius: "10px",
            padding: "30px",
            marginBottom: "30px",
            border: "1px solid #dbe4ee",
          }}
        >
          <h2 style={{ marginTop: 0, color: "#0b2a6f" }}>
            Our Services
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "18px",
            }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #cbd5e1",
                  padding: "18px",
                  borderRadius: "8px",
                  background: "#f8fafc",
                }}
              >
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div
          id="contact"
          style={{
            background: "#ffffff",
            borderRadius: "10px",
            padding: "30px",
            border: "1px solid #dbe4ee",
          }}
        >
          <h2 style={{ marginTop: 0, color: "#0b2a6f" }}>
            Quick Contact
          </h2>

          <p><strong>Mobile:</strong> 8780723063</p>
          <p><strong>Email:</strong> info@greenenvis.com</p>
          <p><strong>Service Area:</strong> All Gujarat</p>
          <p><strong>Support:</strong> GPCB / CPCB / EPR Consultancy</p>
        </div>
      </div>
    </div>
  );
}