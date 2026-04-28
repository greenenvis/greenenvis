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
        background: "#eef2f7",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* TOP HEADER */}
      <div
        style={{
          background: "#ffffff",
          borderBottom: "2px solid #dbe3ea",
          padding: "25px 40px",
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
            gap: "20px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "40px",
                color: "#0b5c2f",
                fontWeight: "bold",
              }}
            >
              GreenEnvis
            </h1>

            <p
              style={{
                marginTop: "8px",
                color: "#475569",
                fontSize: "15px",
              }}
            >
              Smart Environmental Compliance Management Portal
            </p>
          </div>

          <div
            style={{
              textAlign: "right",
            }}
          >
            <p
              style={{
                margin: 0,
                fontWeight: "bold",
                color: "#0f172a",
              }}
            >
              GPCB • CPCB • Compliance
            </p>

            <p
              style={{
                marginTop: "6px",
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              Gujarat Environmental Consultancy System
            </p>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div
        style={{
          background: "#0b4f7d",
          padding: "0",
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
            ["Client Dashboard", "/dashboard"],
            ["Admin Panel", "/admin"],
            ["Application Details", "/application-details"],
            ["Services", "#services"],
            ["Contact", "#contact"],
          ].map(([label, link], index) => (
            <a
              key={index}
              href={link}
              style={{
                color: "#ffffff",
                textDecoration: "none",
                padding: "18px 24px",
                fontWeight: "bold",
                borderRight: "1px solid rgba(255,255,255,0.15)",
                fontSize: "14px",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          maxWidth: "1300px",
          margin: "30px auto",
          padding: "0 20px",
        }}
      >
        {/* NOTICE SECTION */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid #dbe3ea",
            }}
          >
            <div
              style={{
                background: "#0b4f7d",
                color: "#ffffff",
                padding: "14px 20px",
                fontWeight: "bold",
              }}
            >
              Notice Board
            </div>

            <div style={{ padding: "20px" }}>
              {[
                "New GPCB CTE / CCA Applications Open",
                "BMW Authorization Fresh Submission Notice",
                "Used Oil EPR Annual Return Update",
                "Hazardous Waste Compliance Circular",
                "Environmental Audit Renewal Schedule",
              ].map((item, index) => (
                <p key={index} style={{ marginBottom: "14px" }}>
                  ▸ {item}
                </p>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid #dbe3ea",
            }}
          >
            <div
              style={{
                background: "#0b4f7d",
                color: "#ffffff",
                padding: "14px 20px",
                fontWeight: "bold",
              }}
            >
              Current Updates
            </div>

            <div style={{ padding: "20px" }}>
              <p>CTE Applications Active</p>
              <p>CCA Renewals Running</p>
              <p>BMW Annual Compliance</p>
              <p>CGWA Submission Window</p>
              <p>EPR Portal Live</p>
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <div
          id="services"
          style={{
            background: "#ffffff",
            borderRadius: "10px",
            padding: "25px",
            border: "1px solid #dbe3ea",
            marginBottom: "25px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Our Services
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            {[
              "GPCB Consent (CTE / CCA)",
              "BMW Authorization",
              "Used Oil EPR",
              "Hazardous Waste Authorization",
              "CGWA Clearance",
              "Environmental Audit",
              "Stack Monitoring",
              "Water & Air Analysis",
              "Compliance Renewals",
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #cbd5e1",
                  padding: "18px",
                  borderRadius: "8px",
                  background: "#f8fafc",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* INQUIRY FORM */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "10px",
            padding: "25px",
            border: "1px solid #dbe3ea",
            marginBottom: "25px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Industry Inquiry Form
          </h2>

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
                height: "150px",
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
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {loading ? "Submitting..." : "Submit Inquiry"}
            </button>
          </form>
        </div>

        {/* CONTACT */}
        <div
          id="contact"
          style={{
            background: "#ffffff",
            borderRadius: "10px",
            padding: "25px",
            border: "1px solid #dbe3ea",
            marginBottom: "40px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Quick Contact
          </h2>

          <p>📞 Mobile: 8780723063</p>
          <p>📧 Email: info@greenenvis.com</p>
          <p>📍 Service Area: All Gujarat</p>
          <p>🛠 Support: GPCB / CPCB / EPR Consultancy</p>
        </div>
      </div>
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