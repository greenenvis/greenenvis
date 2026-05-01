"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CSSProperties } from "react";

export default function HomePage() {

  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    "/environment-day-banner.jpg",
    "/earth-day.jpg",
    "/water-day.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const notices = [
    { title: "New CTE / CCA Applications Open" },
    { title: "BMW Authorization Updates" },
    { title: "Used Oil EPR Filing Deadline" },
  ];

  const ads = [
    { title: "Environmental Audit Notice" },
    { title: "Hazardous Waste Compliance" },
  ];

  return (
    <div style={{ background: "#edf2f7", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{
        background: "#083b84",
        color: "#fff",
        padding: "12px 20px",
        fontWeight: "bold",
        fontSize: "18px"
      }}>
        GreenEnvis Compliance Portal
      </div>

      {/* SLIDER */}
      <div style={{ maxWidth: "1100px", margin: "20px auto" }}>
        <div style={{
          height: "250px",
          position: "relative",
          borderRadius: "10px",
          overflow: "hidden"
        }}>
          <Image
            src={banners[currentBanner]}
            alt="banner"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* NOTICE + ADS */}
      <div style={{
        maxWidth: "1100px",
        margin: "20px auto",
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "20px"
      }}>
        <LiveBox title="Notice Board" data={notices} />
        <LiveBox title="Current Advertisement" data={ads} />
      </div>

      {/* SERVICES */}
      <div style={{ maxWidth: "1100px", margin: "20px auto" }}>
        <h3 style={{ marginBottom: "10px" }}>Our Services</h3>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "10px"
        }}>
          {[
            "CTE / CCA",
            "BMW Authorization",
            "EPR Registration",
            "Hazardous Waste",
            "CGWA Clearance",
            "Environmental Audit"
          ].map((s, i) => (
            <button key={i} style={btn}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* INQUIRY FORM */}
      <div style={{ maxWidth: "1100px", margin: "20px auto" }}>
        <h3>Industry Inquiry Form</h3>

        <input placeholder="Industry Name" style={input} />
        <input placeholder="Contact Person Name" style={input} />
        <input placeholder="Mobile Number" style={input} />
        <input placeholder="Email Address" style={input} />
        <input placeholder="Required Service" style={input} />
        <textarea placeholder="Requirement Details" style={input} />

        <button style={submit}>Submit Inquiry</button>
      </div>

      {/* WHATSAPP BUTTON */}
      <a href="https://wa.me/918780723063" target="_blank" style={wa}>
        WhatsApp
      </a>

    </div>
  );
}

/* 🔥 LIVE SCROLL COMPONENT */
function LiveBox({ title, data }: any) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: "10px",
      padding: "10px"
    }}>
      <h4 style={{ marginBottom: "10px" }}>{title}</h4>

      <div style={{
        height: "250px",
        overflow: "hidden",
        position: "relative"
      }}>
        <div style={{
          position: "absolute",
          width: "100%",
          animation: "scrollUp 10s linear infinite"
        }}>
          {data.map((item: any, i: number) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <b style={{ color: "green" }}>
                📅 {new Date().toLocaleDateString()}
              </b>
              <p style={{ fontSize: "14px" }}>{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollUp {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
    </div>
  );
}

/* 🔥 STYLES */

const input: CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px"
};

const btn: CSSProperties = {
  padding: "10px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
  borderRadius: "5px"
};

const submit: CSSProperties = {
  width: "100%",
  padding: "12px",
  background: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontWeight: "bold"
};

const wa: CSSProperties = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "#25D366",
  color: "#fff",
  padding: "10px 15px",
  borderRadius: "50px",
  textDecoration: "none"
};