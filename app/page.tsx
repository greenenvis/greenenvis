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
    "Hazardous Waste Management",
    "Biomedical Waste Management",
    "EPR Compliance",
    "Plastic Waste Management",
    "Water & Air Analysis",
  ];

  useEffect(() => {
    fetchLiveNotices();
  }, []);

  const fetchLiveNotices = async () => {
    const { data } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false });

    if (!data) return;

    setNotices(
      data.filter((item) => item.notice_type === "notice")
    );

    setAdvertisements(
      data.filter((item) => item.notice_type === "advertisement")
    );
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
          color: "#ffffff",
          padding: "10px 30px",
          fontWeight: "bold",
        }}
      >
        GreenEnvis Professional Compliance Portal
      </div>

      {/* HEADER */}
      <div
        style={{
          background: "#ffffff",
          padding: "20px 40px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
          />

          <div>
            <h1 style={{ margin: 0, color: "#0b5c2f" }}>
              GreenEnvis
            </h1>

            <p style={{ marginTop: "6px", color: "#64748b" }}>
              Smart Environmental Compliance Portal
            </p>
          </div>
        </div>
      </div>

      {/* ENVIRONMENT DAY BANNER */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "20px auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #dbe3ea",
          }}
        >
          <Image
            src="/environment-day-banner.jpg"
            alt="Environment Day Banner"
            width={1400}
            height={420}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* LIVE NOTICE + ADVERTISEMENT */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "30px auto",
          padding: "0 20px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >
        <LiveRunningCard
          title="Notice Board"
          items={notices}
        />

        <LiveRunningCard
          title="Current Advertisement"
          items={advertisements}
        />
      </div>

      {/* SERVICES */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "20px auto",
          padding: "0 20px",
        }}
      >
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
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  textAlign: "left",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {service}
              </button>
            ))}
          </div>
        </Section>

        {/* INQUIRY FORM */}
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
              style={{
                width: "100%",
                background: "#16a34a",
                color: "#ffffff",
                padding: "16px",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
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

      {/* WHATSAPP */}
      <a
        href="https://wa.me/918780723063"
        target="_blank"
        style={{
          position: "fixed",
          right: "30px",
          bottom: "30px",
          background: "#25D366",
          color: "#ffffff",
          padding: "14px 20px",
          borderRadius: "50px",
          textDecoration: "none",
          fontWeight: "bold",
          zIndex: 999,
        }}
      >
        WhatsApp Us
      </a>
    </div>
  );
}

function LiveRunningCard({
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

      <div
        style={{
          height: "350px",
          overflow: "hidden",
          padding: "14px",
        }}
      >
        <div
          style={{
            animation: "scrollUp 20s linear infinite",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                marginBottom: "14px",
                padding: "14px",
                border: "1px solid #dbe3ea",
                borderRadius: "8px",
                background: "#f8fafc",
              }}
            >
              <p style={{ margin: 0, color: "#16a34a", fontWeight: "bold" }}>
                📅 {new Date(item.created_at).toLocaleDateString()}
              </p>

              <p style={{ marginTop: "10px" }}>
                {item.title}
              </p>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes scrollUp {
            0% {
              transform: translateY(100%);
            }
            100% {
              transform: translateY(-100%);
            }
          }
        `}</style>
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
};