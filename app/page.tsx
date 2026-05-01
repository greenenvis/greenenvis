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

  const [notices, setNotices] = useState<any[]>([]);
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ SLIDER IMAGES
  const banners = [
    "/environment-day-banner.jpg",
    "/earth-day.jpg",
    "/water-day.jpg",
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  // ✅ AUTO CHANGE SLIDER
  useEffect(() => {
    fetchNotices();

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ✅ FETCH NOTICE
  const fetchNotices = async () => {
    const { data } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false });

    if (!data) return;

    setNotices(data.filter((i) => i.notice_type === "notice"));
    setAds(data.filter((i) => i.notice_type === "advertisement"));
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleServiceClick = (service: string) => {
    setForm({ ...form, service });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("inquiries").insert([form]);

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

  // ✅ SERVICES
  const services = [
    "CTE / CCA",
    "BMW Authorization",
    "EPR Registration",
    "Used Oil EPR",
    "Hazardous Waste",
    "CGWA Clearance",
    "Environmental Audit",
    "Stack Monitoring",
    "Water & Air Analysis",
  ];

  return (
    <div style={{ background: "#edf2f7", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{ background: "#083b84", color: "#fff", padding: "12px 20px", fontWeight: "bold" }}>
        GreenEnvis Compliance Portal
      </div>

      {/* SLIDER */}
      <div style={{ maxWidth: "1100px", margin: "20px auto" }}>
        <div style={{ height: "250px", position: "relative", borderRadius: "10px", overflow: "hidden" }}>
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
        <h3>Our Services</h3>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "10px"
        }}>
          {services.map((s, i) => (
            <button key={i} onClick={() => handleServiceClick(s)} style={btn}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* FORM */}
      <div style={{ maxWidth: "1100px", margin: "20px auto" }}>
        <h3>Inquiry Form</h3>

        <form onSubmit={handleSubmit}>
          <input name="industry_name" placeholder="Industry Name" value={form.industry_name} onChange={handleChange} style={input} />
          <input name="contact_person" placeholder="Contact Person" value={form.contact_person} onChange={handleChange} style={input} />
          <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} style={input} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} style={input} />
          <input name="service" placeholder="Service" value={form.service} onChange={handleChange} style={input} />
          <textarea name="details" placeholder="Details" value={form.details} onChange={handleChange} style={input} />

          <button style={submit}>
            {loading ? "Submitting..." : "Submit Inquiry"}
          </button>
        </form>
      </div>

      {/* WHATSAPP */}
      <a href="https://wa.me/918780723063" target="_blank" style={wa}>
        WhatsApp
      </a>

    </div>
  );
}

// 🔥 LIVE SCROLL
function LiveBox({ title, data }: any) {
  return (
    <div style={{ background: "#fff", borderRadius: "10px", padding: "10px" }}>
      <h4>{title}</h4>

      <div style={{ height: "250px", overflow: "hidden" }}>
        <div style={{ animation: "scroll 12s linear infinite" }}>
          {data.map((item: any, i: number) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <b>📅 {new Date(item.created_at).toLocaleDateString()}</b>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

const btn = {
  padding: "10px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
};

const submit = {
  width: "100%",
  padding: "12px",
  background: "green",
  color: "#fff",
};

const wa = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "#25D366",
  color: "#fff",
  padding: "10px 15px",
  borderRadius: "50px",
};