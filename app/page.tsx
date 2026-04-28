"use client";

import { useEffect, useState } from "react";
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

  const [notices, setNotices] = useState<any[]>([]);
  const [advertisements, setAdvertisements] = useState<any[]>([]);

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

  useEffect(() => {
    fetchLiveNotices();
  }, []);

  const fetchLiveNotices = async () => {
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    const noticeData =
      data?.filter((item) => item.notice_type === "notice") || [];

    const advertisementData =
      data?.filter((item) => item.notice_type === "advertisement") || [];

    setNotices(noticeData);
    setAdvertisements(advertisementData);
  };

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
      service,
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
      <div
        style={{
          background: "#083b84",
          color: "white",
          padding: "8px 30px",
          fontSize: "13px",
          fontWeight: "600",
        }}
      >
        GreenEnvis Professional Compliance Portal
      </div>

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
              width={80}
              height={80}
            />

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "34px",
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
                Smart Environmental Compliance Management System
              </p>
            </div>
          </div>
        </div>
      </div>

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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <MovingCard title="Notice Board" items={notices} />
          <MovingCard title="Current Advertisement" items={advertisements} />
        </div>

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
                  padding: "14px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  background: "#ffffff",
                  cursor: "pointer",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                {service}
              </button>
            ))}
          </div>
        </Section>

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
                cursor: "pointer",
              }}
            >
              {loading ? "Submitting..." : "Submit Inquiry"}
            </button>
          </form>
        </Section>

        <Section title="Quick Contact">
          <p>📞 Mobile: 8780723063</p>
          <p>📧 Email: info@greenenvis.com</p>
          <p>🌍 Service Area: All India</p>
          <p>🛠 Support: GPCB / CPCB / EPR Consultancy</p>
        </Section>
      </div>

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
  items: any[];
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #dbe3ea",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <h2>{title}</h2>

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #dbe3ea",
            padding: "14px",
            marginBottom: "12px",
            borderRadius: "8px",
          }}
        >
          <p>
            📅 {new Date(item.created_at).toLocaleDateString()}
          </p>

          <p>{item.title}</p>
        </div>
      ))}
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
        padding: "24px",
        borderRadius: "10px",
        marginBottom: "24px",
      }}
    >
      <h2>{title}</h2>
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