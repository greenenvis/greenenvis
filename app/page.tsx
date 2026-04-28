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

  const noticeItems = [
    { date: "08/04/2026", text: "New CTE / CCA Applications Open" },
    { date: "18/03/2026", text: "BMW Authorization Fresh Applications Started" },
    { date: "17/03/2026", text: "Used Oil EPR Annual Return Submission Live" },
    { date: "13/02/2026", text: "Hazardous Waste Authorization Updates" },
    { date: "04/02/2026", text: "CGWA Clearance Compliance Window Open" },
  ];

  const advertisementItems = [
    { date: "08/04/2026", text: "Free Consultation For New Industries" },
    { date: "18/03/2026", text: "Stack Monitoring Schedule Live" },
    { date: "17/03/2026", text: "Water & Air Analysis Support Available" },
    { date: "13/02/2026", text: "Plastic Waste EPR Registration Open" },
    { date: "04/02/2026", text: "Ground Water NOC Support Available" },
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

  const handleServiceClick = (service: string) => {
    setForm((prev) => ({
      ...prev,
      service: service,
    }));
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
      console.log(error);
      alert("Error saving inquiry");
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
      {/* TOP BAR */}
      <div
        style={{
          background: "#083b84",
          color: "white",
          padding: "8px 30px",
          fontSize: "13px",
          fontWeight: "600",
        }}
      >
        Gujarat Pollution Control Board Style Professional Portal
      </div>

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
              alt="GreenEnvis Logo"
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
                  fontSize: "14px",
                  color: "#64748b",
                }}
              >
                Smart Environmental Compliance Management Portal
              </p>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <p
              style={{
                margin: 0,
                fontSize: "15px",
                fontWeight: "700",
                color: "#166534",
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
              Apply for Various Permissions of the Board
            </p>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div style={{ background: "#0b5a8a" }}>
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {[
            "Home",
            "Client Login",
            "Admin Login",
            "Client Dashboard",
            "Admin Panel",
            "Services",
            "Contact",
          ].map((item, i) => (
            <div
              key={i}
              style={{
                color: "white",
                padding: "16px 22px",
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              {item}
            </div>
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
        {/* NOTICE + ADVERTISEMENT */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <MovingCard title="Notice Board" items={noticeItems} />
          <MovingCard title="Current Advertisement" items={advertisementItems} />
        </div>

        {/* SERVICES */}
        <Section title="Our Services">
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
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  textAlign: "left",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                {service}
              </button>
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
        <Section title="Quick Contact">
          <p>📞 Mobile: 8780723063</p>
          <p>📧 Email: info@greenenvis.com</p>
          <p>🌍 Service Area: All India</p>
          <p>🛠 Support: GPCB / CPCB / EPR Consultancy</p>
        </Section>
      </div>

      {/* WHATSAPP BUTTON */}
      <a
        href="https://wa.me/918780723063"
        target="_blank"
        style={{
          position: "fixed",
          right: "30px",
          bottom: "30px",
          background: "#25D366",
          color: "white",
          padding: "14px 20px",
          borderRadius: "50px",
          textDecoration: "none",
          fontWeight: "700",
          zIndex: 999,
        }}
      >
        WhatsApp Us
      </a>
    </div>
  );
}

function MovingCard({
  title,
  items,
}: {
  title: string;
  items: { date: string; text: string }[];
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #dbe3ea",
        borderRadius: "10px",
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
          height: "340px",
          overflowY: "auto",
          padding: "14px",
          background: "#f8fafc",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              background: "#ffffff",
              border: "1px solid #dbe3ea",
              marginBottom: "14px",
              padding: "14px",
              borderRadius: "6px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: "#2ca02c",
                color: "white",
                padding: "6px 12px",
                borderRadius: "6px",
                fontWeight: "700",
                fontSize: "13px",
                marginBottom: "10px",
              }}
            >
              📅 {item.date}
            </div>

            <div
              style={{
                fontSize: "14px",
                color: "#334155",
                fontWeight: "500",
              }}
            >
              {item.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({
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