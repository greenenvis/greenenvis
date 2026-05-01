"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CSSProperties } from "react";

export default function HomePage() {

  const [banner, setBanner] = useState(0);

  const banners = [
    "/environment-day-banner.jpg",
    "/earth-day.jpg",
    "/water-day.jpg",
  ];

  useEffect(() => {
    const i = setInterval(() => {
      setBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(i);
  }, []);

  const notices = [
    "Used Oil EPR Filing Deadline",
    "BMW Authorization Update",
    "Environmental Audit Notice"
  ];

  const ads = [
    "Hazardous Waste Compliance",
    "CGWA Clearance Window Open"
  ];

  return (
    <div style={{ background: "#f1f5f9" }}>

      {/* HEADER */}
      <div style={header}>
        <div style={{ fontSize: "22px", fontWeight: "bold" }}>
          GREENENVIS
        </div>
        <div style={{ fontSize: "12px" }}>
          Smart Compliance Management System
        </div>
      </div>

      {/* NAVBAR */}
      <div style={nav}>
        {["Home", "Client Login", "Admin Panel", "Services", "Contact"].map((n,i)=>(
          <span key={i} style={navItem}>{n}</span>
        ))}
      </div>

      {/* CONTAINER */}
      <div style={container}>

        {/* SLIDER */}
        <div style={slider}>
          <Image
            src={banners[banner]}
            alt="banner"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* NOTICE SECTION */}
        <div style={grid}>
          <ScrollBox title="Notice Board" items={notices} />
          <ScrollBox title="Current Advertisement" items={ads} />
        </div>

        {/* SERVICES */}
        <div style={card}>
          <h3>Our Services</h3>
          <div style={serviceGrid}>
            {[
              "CTE / CCA",
              "BMW Authorization",
              "EPR Registration",
              "Hazardous Waste",
              "CGWA Clearance",
              "Environmental Audit"
            ].map((s,i)=>(
              <button key={i} style={serviceBtn}>{s}</button>
            ))}
          </div>
        </div>

        {/* FORM */}
        <div style={card}>
          <h3>Industry Inquiry Form</h3>

          <input placeholder="Industry Name" style={input}/>
          <input placeholder="Contact Person Name" style={input}/>
          <input placeholder="Mobile Number" style={input}/>
          <input placeholder="Email Address" style={input}/>
          <input placeholder="Required Service" style={input}/>
          <textarea placeholder="Requirement Details" style={input}/>

          <button style={submit}>Submit Inquiry</button>
        </div>

      </div>

      {/* WHATSAPP */}
      <a href="https://wa.me/918780723063" target="_blank" style={wa}>
        WhatsApp
      </a>

    </div>
  );
}

/* 🔥 SCROLL BOX */
function ScrollBox({ title, items }: any) {
  return (
    <div style={box}>
      <h4 style={{ marginBottom: "10px" }}>{title}</h4>

      <div style={{ height: "200px", overflow: "hidden" }}>
        <div style={scroll}>
          {items.map((t:any,i:number)=>(
            <div key={i} style={{ marginBottom: "10px" }}>
              <b style={{ color:"green" }}>
                📅 {new Date().toLocaleDateString()}
              </b>
              <div>{t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 🔥 STYLES */

const container: CSSProperties = {
  maxWidth: "1100px",
  margin: "auto",
  padding: "20px"
};

const header: CSSProperties = {
  background: "#0f4c81",
  color: "#fff",
  padding: "12px 20px"
};

const nav: CSSProperties = {
  background: "#1e73be",
  color: "#fff",
  padding: "10px 20px",
  display: "flex",
  gap: "20px"
};

const navItem: CSSProperties = {
  cursor: "pointer",
  fontSize: "14px"
};

const slider: CSSProperties = {
  height: "260px",
  borderRadius: "10px",
  overflow: "hidden",
  position: "relative",
  marginBottom: "20px"
};

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "20px",
  marginBottom: "20px"
};

const box: CSSProperties = {
  background: "#fff",
  padding: "15px",
  borderRadius: "10px"
};

const scroll: CSSProperties = {
  animation: "scroll 12s linear infinite"
};

const card: CSSProperties = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px"
};

const serviceGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "10px"
};

const serviceBtn: CSSProperties = {
  padding: "10px",
  border: "1px solid #ccc",
  background: "#f8fafc",
  borderRadius: "5px"
};

const input: CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px"
};

const submit: CSSProperties = {
  width: "100%",
  padding: "12px",
  background: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: "5px"
};

const wa: CSSProperties = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "#25D366",
  color: "#fff",
  padding: "10px 15px",
  borderRadius: "50px"
};