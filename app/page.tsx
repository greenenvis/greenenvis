"use client";

import { useState } from "react";
import Image from "next/image";
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
        background: "#edf2f7",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#ffffff",
          padding: "20px 40px",
          borderBottom: "1px solid #dbe3ea",
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
          {/* LEFT LOGO */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Image
              src="/logo.png"
              alt="GreenEnvis Logo"
              width={80}
              height={80}
            />

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "34px",
                  color: "#0b5c2f",
                  fontWeight: "bold",
                }}
              >
                GreenEnvis
              </h1>

              <p
                style={{
                  marginTop: "6px",
                  color: "#64748b",
                  fontSize: "14px",
                }}
              >
                Simplifying Environmental Compliance
              </p>
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                margin: 0,
                fontWeight: "bold",
                color: "#166534",
              }}
            >
              GPCB • CPCB • COMPLIANCE
            </p>

            <p
              style={{
                marginTop: "6px",
                color: "#64748b",
                fontSize: "13px",
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
          ].map(([name, link], index) => (
            <a
              key={index}
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

      {/* MAIN */}
      <div
        style={{
          maxWidth: "1300px",
          margin: "30px auto",
          padding: "0 20px",
        }}
      >
        {/* HERO */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            padding: "30px",
            marginBottom: "25px",
            border: "1px solid #dbe3ea",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              fontSize: "34px",
              color: "#0f172a",
            }}
          >
            Environmental Compliance Made Simple
          </h2>

          <p
            style={{
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.8",
            }}
          >
            CTE, CCA, BMW Authorization, EPR, CGWA, Environmental Audit,
            Consent Renewals — All in One Professional Smart Portal.
          </p>
        </div>

        {/* NOTICE + ADS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <Card title="Notice Board">
            <p>• New CTE / CCA Applications Open</p>
            <p>• BMW Authorization Fresh Applications</p>
            <p>• Used Oil EPR Annual Return Submission</p>
            <p>• Hazardous Waste Authorization Updates</p>
            <p>• CGWA Clearance Compliance Window Open</p>
          </Card>

          <Card title="Current Advertisement">
            <p>• Environmental Audit Renewal Live</p>
            <p>• CPCB Filing Started</p>
            <p>• Free Industry Consultation</p>
            <p>• Stack Monitoring Schedule</p>
            <p>• Water Analysis Support</p>
          </Card>
        </div>

        {/* SERVICES */}
        <Section title="Our Services" id="services">
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
              "EPR Registration",
              "Used Oil EPR",
              "Hazardous Waste Authorization",
              "CGWA Clearance",
              "Environmental Audit",
              "Stack Monitoring",
              "Water & Air Analysis",
            ].map((item, i) => (
              <div
                key={i}
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
        </Section>

        {/* FORM */}
        <Section title="Industry Inquiry Form">
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
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              {loading ? "Submitting..." : "Submit Inquiry"}
            </button>
          </form>
        </Section>

        {/* CONTACT */}
        <Section title="Quick Contact" id="contact">
          <div style={{ lineHeight: "2" }}>
            <p>📞 Mobile: 8780723063</p>
            <p>📧 Email: info@greenenvis.com</p>
            <p>📍 Service Area: All Gujarat</p>
            <p>🛠 Support: GPCB / CPCB / EPR Consultancy</p>
            <p>💬 Free Consultation Available</p>
          </div>
        </Section>

        {/* FOOTER */}
        <div
          style={{
            textAlign: "center",
            padding: "30px 0",
            color: "#64748b",
          }}
        >
          © 2026 GreenEnvis — Professional Environmental Compliance Portal
        </div>
      </div>
    </div>
  );
}

function Card({
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

function Section({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <div
      id={id}
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