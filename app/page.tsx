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
      {/* Header */}
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
            <h1 style={{ margin: 0, fontSize: "42px", color: "#0b2a6f" }}>
              GREENENVIS
            </h1>
            <p style={{ marginTop: "8px", color: "#475569" }}>
              Gujarat Environmental Compliance Portal
            </p>
          </div>

          <div>
            <p style={{ margin: 0, fontWeight: "bold", color: "#166534" }}>
              GPCB • CPCB • COMPLIANCE
            </p>
            <p style={{ marginTop: "8px", color: "#64748b" }}>
              Smart Compliance Management System
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ background: "#0b4f84" }}>
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
          ].map((item, index) => (
            <a
              key={index}
              href={item[1]}
              style={{
                color: "#ffffff",
                padding: "18px 24px",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              {item[0]}
            </a>
          ))}
        </div>
      </div>

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
          <div
            style={{
              background: "#ffffff",
              borderRadius: "10px",
              border: "1px solid #dbe4ee",
            }}
          >
            <div
              style={{
                background: "#0b4f84",
                color: "#ffffff",
                padding: "16px 20px",
                fontWeight: "bold",
              }}
            >
              Notice Board
            </div>

            <div style={{ padding: "25px" }}>
              {notices.map((notice, index) => (
                <p key={index}>▸ {notice}</p>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "10px",
              border: "1px solid #dbe4ee",
            }}
          >
            <div
              style={{
                background: "#0b4f84",
                color: "#ffffff",
                padding: "16px 20px",
                fontWeight: "bold",
              }}
            >
              Current Advertisement
            </div>

            <div style={{ padding: "25px" }}>
              {advertisements.map((item, index) => (
                <p key={index}>▸ {item}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "10px",
            marginBottom: "30px",
            border: "1px solid #dbe4ee",
          }}
        >
          <h2>Our Services</h2>

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
                }}
              >
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* Working Inquiry Form */}
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "10px",
            marginBottom: "30px",
            border: "1px solid #dbe4ee",
          }}
        >
          <h2>Industry Inquiry Form</h2>

          <div style={{ display: "grid", gap: "16px" }}>
            <input placeholder="Industry Name" style={inputStyle} />
            <input placeholder="Contact Person Name" style={inputStyle} />
            <input placeholder="Mobile Number" style={inputStyle} />
            <input placeholder="Email Address" style={inputStyle} />
            <input placeholder="Required Service" style={inputStyle} />

            <textarea
              placeholder="Requirement Details"
              style={{
                ...inputStyle,
                minHeight: "140px",
                resize: "none",
              }}
            />

            <button
              style={{
                background: "#16a34a",
                color: "#ffffff",
                border: "none",
                padding: "16px",
                borderRadius: "10px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Submit Inquiry
            </button>
          </div>
        </div>

        {/* Contact */}
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "10px",
            border: "1px solid #dbe4ee",
          }}
        >
          <h2>Quick Contact</h2>

          <p><strong>Mobile:</strong> 8780723063</p>
          <p><strong>Email:</strong> info@greenenvis.com</p>
          <p><strong>Service Area:</strong> All Gujarat</p>
          <p><strong>Support:</strong> GPCB / CPCB / EPR Consultancy</p>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "15px",
  outline: "none",
};