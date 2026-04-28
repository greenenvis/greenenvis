"use client";

import { useState } from "react";
import { supabase } from "./supabase";

export default function HomePage() {
  const [form, setForm] = useState({
    industry_name: "",
    contact_person: "",
    mobile: "",
    email: "",
    service: "",
    details: "",
  });

  const [loading, setLoading] = useState(false);

  const notices = [
    "New CTE / CCA Applications Open",
    "BMW Authorization Fresh Applications",
    "Used Oil EPR Annual Return Submission",
    "Hazardous Waste Authorization Updates",
    "CGWA Clearance Compliance Window Open",
  ];

  const advertisements = [
    "Environmental Audit Renewal Started",
    "CPCB Annual Compliance Filing Live",
    "Stack Monitoring Schedule Updated",
    "Water & Air Analysis Special Support",
    "Free Consultation for New Industries",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.from("inquiries").insert([
      {
        industry_name: form.industry_name,
        contact_person: form.contact_person,
        mobile: form.mobile,
        email: form.email,
        service: form.service,
        details: form.details,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error saving inquiry");
      console.log(error);
      return;
    }

    alert("Inquiry Submitted Successfully!");

    setForm({
      industry_name: "",
      contact_person: "",
      mobile: "",
      email: "",
      service: "",
      details: "",
    });
  };

  return (
    <div
      style={{
        background: "#edf2f7",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #dbe3ea",
          padding: "20px 40px",
        }}
      >
        <div
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#0b5c2f",
                fontSize: "38px",
                fontWeight: "bold",
              }}
            >
              GreenEnvis
            </h1>

            <p
              style={{
                marginTop: "8px",
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              Smart Environmental Compliance Portal
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <p
              style={{
                margin: 0,
                color: "#166534",
                fontWeight: "bold",
              }}
            >
              GPCB • CPCB • COMPLIANCE
            </p>

            <p
              style={{
                marginTop: "6px",
                fontSize: "13px",
                color: "#64748b",
              }}
            >
              Smart Compliance Management System
            </p>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div
        style={{
          background: "#0b5a8a",
        }}
      >
        <div
          style={{
            maxWidth: "1300px",
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
          ].map(([name, link], i) => (
            <a
              key={i}
              href={link}
              style={{
                color: "#ffffff",
                textDecoration: "none",
                padding: "16px 22px",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              {name}
            </a>
          ))}
        </div>
      </div>

      <div
        style={{
          maxWidth: "1300px",
          margin: "30px auto",
          padding: "0 20px",
        }}
      >
        {/* NOTICE + ADS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <SectionCard title="Notice Board">
            {notices.map((item, i) => (
              <p key={i}>• {item}</p>
            ))}
          </SectionCard>

          <SectionCard title="Current Advertisement">
            {advertisements.map((item, i) => (
              <p key={i}>• {item}</p>
            ))}
          </SectionCard>
        </div>

        {/* SERVICES */}
        <div id="services">
          <SectionBox title="Our Services">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "15px",
              }}
            >
              {services.map((item, i) => (
                <div
                  key={i}
                  style={{
                    border: "1px solid #cbd5e1",
                    padding: "16px",
                    borderRadius: "8px",
                    background: "#f8fafc",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </SectionBox>
        </div>

        {/* FORM */}
        <SectionBox title="Industry Inquiry Form">
          <form onSubmit={handleSubmit}>
            <input
              name="industry_name"
              placeholder="Industry Name"
              value={form.industry_name}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="contact_person"
              placeholder="Contact Person Name"
              value={form.contact_person}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="service"
              placeholder="Required Service"
              value={form.service}
              onChange={handleChange}
              style={inputStyle}
            />

            <textarea
              name="details"
              placeholder="Requirement Details"
              value={form.details}
              onChange={handleChange}
              style={{
                ...inputStyle,
                height: "140px",
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "#16a34a",
                color: "#ffffff",
                border: "none",
                padding: "16px",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              {loading ? "Submitting..." : "Submit Inquiry"}
            </button>
          </form>
        </SectionBox>

        {/* CONTACT */}
        <div id="contact">
          <SectionBox title="Quick Contact">
            <div style={{ lineHeight: "2" }}>
              <p>📞 Mobile: 8780723063</p>
              <p>📧 Email: info@greenenvis.com</p>
              <p>📍 Service Area: All Gujarat</p>
              <p>🛠 Support: GPCB / CPCB / EPR Consultancy</p>
              <p>💬 Free Consultation Available</p>
            </div>
          </SectionBox>
        </div>

        {/* FOOTER */}
        <div
          style={{
            textAlign: "center",
            padding: "30px 0",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          © 2026 GreenEnvis — Professional Environmental Compliance Portal
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "10px",
        border: "1px solid #dbe3ea",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#0b5a8a",
          color: "#ffffff",
          padding: "14px 18px",
          fontWeight: "bold",
        }}
      >
        {title}
      </div>

      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
}

function SectionBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "10px",
        border: "1px solid #dbe3ea",
        padding: "25px",
        marginBottom: "25px",
      }}
    >
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "16px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "15px",
};