"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HomePage() {

  const [form, setForm] = useState({
    industry: "",
    person: "",
    mobile: "",
    email: "",
    service: "",
    details: "",
  });

  const [banner, setBanner] = useState("");

  // 🔥 DATE BASED ENVIRONMENT DAY
  useEffect(() => {
    const today = new Date();

    const key = `${today.getDate()}-${today.getMonth() + 1}`;

    const dayMap: any = {
      "5-6": "/environment-day-banner.jpg",
      "22-4": "/earth-day.jpg",
      "22-3": "/water-day.jpg",
    };

    if (dayMap[key]) {
      setBanner(dayMap[key]);
    } else {
      setBanner("/environment-day-banner.jpg");
    }
  }, []);

  // 🔥 SERVICE AUTO FILL + SCROLL
  const selectService = (s: string) => {
    setForm((prev) => ({ ...prev, service: s }));

    setTimeout(() => {
      document.getElementById("formSection")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 200);
  };

  // 🔥 WHATSAPP LEAD
  const sendWhatsApp = () => {
    const message = `
New Inquiry

Industry: ${form.industry}
Person: ${form.person}
Mobile: ${form.mobile}
Email: ${form.email}
Service: ${form.service}
Details: ${form.details}
`;

    window.open(
      `https://wa.me/918780723063?text=${encodeURIComponent(message)}`
    );
  };

  return (
    <div style={{ background: "#eef2f6", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{
        background: "#0f4c81",
        color: "#fff",
        padding: "15px 25px",
        fontSize: "20px",
        fontWeight: "bold"
      }}>
        GREENENVIS PORTAL
      </div>

      <div style={{ maxWidth: "1100px", margin: "auto", padding: "20px" }}>

        {/* 🔥 FULL BANNER */}
        <div style={{
          height: "260px",
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
          marginBottom: "20px"
        }}>
          {banner && (
            <Image
              src={banner}
              alt="banner"
              fill
              style={{ objectFit: "cover" }}
            />
          )}
        </div>

        {/* 🔥 SERVICES */}
        <div style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px"
        }}>
          <h3 style={{ marginBottom: "15px" }}>Our Services</h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "12px"
          }}>
            {[
              "CTE / CCA",
              "BMW Authorization",
              "EPR Registration",
              "Hazardous Waste",
              "CGWA Clearance",
              "Environmental Audit",
            ].map((s, i) => (
              <button
                key={i}
                onClick={() => selectService(s)}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  background: "#f8fafc",
                  cursor: "pointer",
                  fontWeight: "500"
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* 🔥 FORM */}
        <div
          id="formSection"
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Industry Inquiry Form</h3>

          <input
            placeholder="Industry Name"
            value={form.industry}
            onChange={(e) =>
              setForm({ ...form, industry: e.target.value })
            }
            style={input}
          />

          <input
            placeholder="Contact Person"
            value={form.person}
            onChange={(e) =>
              setForm({ ...form, person: e.target.value })
            }
            style={input}
          />

          <input
            placeholder="Mobile"
            value={form.mobile}
            onChange={(e) =>
              setForm({ ...form, mobile: e.target.value })
            }
            style={input}
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            style={input}
          />

          <input
            placeholder="Required Service"
            value={form.service}
            style={input}
            readOnly
          />

          <textarea
            placeholder="Requirement Details"
            onChange={(e) =>
              setForm({ ...form, details: e.target.value })
            }
            style={input}
          />

          <button
            onClick={sendWhatsApp}
            style={{
              width: "100%",
              padding: "12px",
              background: "#16a34a",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Send via WhatsApp
          </button>
        </div>

      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px"
};