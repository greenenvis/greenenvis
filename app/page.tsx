"use client";

import { useState, useEffect } from "react";
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
  const [noticeIndex, setNoticeIndex] = useState(0);
  const [adIndex, setAdIndex] = useState(0);

  const notices = [
    "New CTE / CCA Applications Open",
    "BMW Authorization Fresh Applications Started",
    "Used Oil EPR Annual Return Submission Live",
    "Hazardous Waste Authorization Updates",
    "CGWA Clearance Compliance Window Open",
    "Environmental Audit Renewal Started",
  ];

  const advertisements = [
    "Free Consultation For New Industries",
    "Stack Monitoring Schedule Live",
    "Water & Air Analysis Support Available",
    "CPCB Annual Compliance Filing Started",
    "Plastic Waste EPR Registration Open",
    "Ground Water NOC Support Available",
  ];

  const services = [
    "Consent to Establish (CTE)",
    "Consent to Operate (CTO)",
    "Environmental Clearance (EC)",
    "Pollution Compliance",
    "Ground Water NOC",
    "Annual Returns",
    "AMC - XGN Portal Service",
    "Environmental Statements",
    "Closure Revocation Application",
    "Hazardous Waste Management",
    "Biomedical Waste Management",
    "Waste Import Export License",
    "E-Waste & Battery Waste Management",
    "EPR Compliance",
    "Plastic Waste Management",
    "Construction & Demolition Management",
    "Municipal Solid Waste Management",
  ];

  useEffect(() => {
    const noticeTimer = setInterval(() => {
      setNoticeIndex((prev) => (prev + 1) % notices.length);
    }, 2500);

    const adTimer = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % advertisements.length);
    }, 3000);

    return () => {
      clearInterval(noticeTimer);
      clearInterval(adTimer);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceClick = (service: string) => {
    setForm({
      ...form,
      service: service,
    });

    window.location.href = "#inquiry-form";
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
        background: "#eef3f8",
        minHeight: "100vh",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#ffffff",
          padding: "20px 40px",
          borderBottom: "1px solid #d9e2ec",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <Image
              src="/logo.png"
              alt="GreenEnvis Logo"
              width={85}
              height={85}
            />

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "40px",
                  fontWeight: "bold",
                  color: "#0b5c2f",
                }}
              >
                GreenEnvis
              </h1>

              <p
                style={{
                  marginTop: "6px",
                  color: "#64748b",
                  fontSize: "15px",
                }}
              >
                Simplifying Environmental Compliance
              </p>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <p
              style={{
                margin: 0,
                fontWeight: "bold",
                color: "#166534",
                fontSize: "16px",
              }}
            >
              GPCB • CPCB • COMPLIANCE
            </p>

            <p
              style={{
                marginTop: "6px",
                color: "#64748b",
                fontSize: "14px",
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
          ].map(([name, link], i) => (
            <a
              key={i}
              href={link}
              style={{
                color: "#ffffff",
                textDecoration: "none",
                padding: "18px 22px",
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
          maxWidth: "1400px",
          margin: "30px auto",
          padding: "0 20px",
        }}
      >
        {/* HERO */}
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "12px",
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
              fontSize: "16px",
              color: "#475569",
              lineHeight: "1.8",
            }}
          >
            CTE, CTO, BMW Authorization, EPR, CGWA, Environmental Audit,
            Consent Renewals — All in One Professional Smart Portal.
          </p>
        </div>

        {/* NOTICE + ADVERTISEMENT */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <LiveCard
            title="Notice Board"
            text={notices[noticeIndex]}
          />

          <LiveCard
            title="Current Advertisement"
            text={advertisements[adIndex]}
          />
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
            {services.map((service, i) => (
              <button
                key={i}
                onClick={() => handleServiceClick(service)}
                style={{
                  padding: "18px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  background: "#ffffff",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  textAlign: "left",
                }}
              >
                {service}
              </button>
            ))}
          </div>
        </Section>

        {/* INQUIRY FORM */}
        <Section title="Industry Inquiry Form" id="inquiry-form">
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
          <div
            style={{
              lineHeight: "2.2",
              fontSize: "16px",
            }}
          >
            <p>📞 Mobile: 8780723063</p>
            <p>📧 Email: info@greenenvis.com</p>
            <p>🌍 Service Area: All India</p>
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
            fontSize: "14px",
          }}
        >
          © 2026 GreenEnvis — Professional Environmental Compliance Portal
        </div>
      </div>
    </div>
  );
}

function LiveCard({
  title,
  text,
}: {
  title: string;
  text: string;
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
          fontSize: "16px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          padding: "24px",
          fontSize: "15px",
          minHeight: "120px",
          display: "flex",
          alignItems: "center",
          fontWeight: "500",
        }}
      >
        • {text}
      </div>
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
        border: "1px solid #dbe3ea",
        borderRadius: "10px",
        padding: "25px",
        marginBottom: "25px",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          fontSize: "28px",
          color: "#0f172a",
        }}
      >
        {title}
      </h2>

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