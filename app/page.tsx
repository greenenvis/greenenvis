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
        background: "#f1f5f9",
        minHeight: "100vh",
        fontFamily: "Arial",
        padding: "20px",
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
            padding: "25px",
            borderRadius: "14px",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ color: "#166534", marginBottom: "8px" }}>
            GreenEnvis Portal
          </h1>

          <p style={{ color: "#475569" }}>
            Professional Environmental Compliance Management System
          </p>
        </div>

        {/* Top Actions */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <a href="/dashboard" style={cardStyle}>
            Client Dashboard
          </a>

          <a href="/admin" style={cardStyle}>
            Admin Panel
          </a>

          <a href="/application-details" style={cardStyle}>
            Application Details
          </a>

          <a href="/login" style={cardStyle}>
            Client Login
          </a>
        </div>

        {/* Services */}
        <div
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "14px",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            Our Services
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "15px",
            }}
          >
            {[
              "GPCB Consent (CTE / CCA)",
              "BMW Authorization",
              "Used Oil EPR",
              "Hazardous Waste Authorization",
              "CGWA Clearance",
              "Environmental Audit",
            ].map((item, index) => (
              <div key={index} style={serviceBox}>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Inquiry Form */}
        <div
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "14px",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>
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
                borderRadius: "10px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {loading ? "Submitting..." : "Submit Inquiry"}
            </button>
          </form>
        </div>

        {/* Contact */}
        <div
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "14px",
          }}
        >
          <h2>Quick Contact</h2>

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

const cardStyle = {
  background: "#16a34a",
  color: "#ffffff",
  padding: "18px",
  borderRadius: "12px",
  textAlign: "center" as const,
  textDecoration: "none",
  fontWeight: "bold",
};

const serviceBox = {
  border: "1px solid #cbd5e1",
  padding: "18px",
  borderRadius: "10px",
};