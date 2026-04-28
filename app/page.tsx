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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceClick = (service: string) => {
    setForm((prev) => ({
      ...prev,
      service: service,
    }));

    setTimeout(() => {
      const formSection = document.getElementById("inquiry-form");
      formSection?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
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
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      {/* TOP HEADER */}
      <div
        style={{
          background: "#083b84",
          color: "white",
          padding: "8px 30px",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        Gujarat Pollution Control Board Style Portal
      </div>

      {/* MAIN HEADER */}
      <div
        style={{
          background: "#ffffff",
          padding: "20px 40px",
          borderBottom: "1px solid #dbe3ea",
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
              alt="Logo"
              width={85}
              height={85}
            />

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "38px",
                  fontWeight: "700",
                  color: "#0b5c2f",
                }}
              >
                GreenEnvis
              </h1>

              <p
                style={{
                  marginTop: "6px",
                  color: "#475569",
                  fontSize: "14px",
                }}
              >
                Smart Environmental Compliance Portal
              </p>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <p
              style={{
                margin: 0,
                fontWeight: "700",
                color: "#166534",
                fontSize: "15px",
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
              Apply for Various Permissions
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
                padding: "16px 22px",
                fontWeight: "700",
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
          maxWidth: "1400px",
          margin: "30px auto",
          padding: "0 20px",
        }}
      >
        {/* LIVE NOTICE + ADVERTISEMENT */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <LiveMovingCard
            title="Notice Board"
            items={notices}
          />

          <LiveMovingCard
            title="Current Advertisement"
            items={advertisements}
          />
        </div>

        {/* SERVICES */}
        <Section title="Our Services" id="services">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "14px",
            }}
          >
            {services.map((service, i) => (
              <button
                key={i}
                onClick={() => handleServiceClick(service)}
                style={{
                  padding: "16px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  background: "#ffffff",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {service}
              </button>
            ))}
          </div>
        </Section>

        {/* FORM */}
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
                color: "white",
                border: "none",
                padding: "16px",
                borderRadius: "8px",
                fontWeight: "700",
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
          <div style={{ lineHeight: "2.2", fontSize: "16px" }}>
            <p>📞 Mobile: 8780723063</p>
            <p>📧 Email: info@greenenvis.com</p>
            <p>🌍 Service Area: All India</p>
            <p>🛠 Support: GPCB / CPCB / EPR Consultancy</p>
            <p>💬 Free Consultation Available</p>
          </div>
        </Section>
      </div>
    </div>
  );
}

function LiveMovingCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "10px",
        border: "1px solid #dbe3ea",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#0b5a8a",
          color: "white",
          padding: "14px 18px",
          fontWeight: "700",
          fontSize: "16px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          height: "220px",
          overflow: "hidden",
          padding: "20px",
        }}
      >
        <marquee
          direction="up"
          scrollAmount="2"
          style={{
            height: "180px",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          {items.map((item, i) => (
            <p key={i}>• {item}</p>
          ))}
        </marquee>
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
        background: "white",
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