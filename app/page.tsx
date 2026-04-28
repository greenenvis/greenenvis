"use client";

import { useState } from "react";
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

  const handleSubmit = async () => {
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
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "12px",
        }}
      >
        <h1>Industry Inquiry Form</h1>

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
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            background: "#16a34a",
            color: "#ffffff",
            border: "none",
            padding: "16px",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          {loading ? "Submitting..." : "Submit Inquiry"}
        </button>
      </div>
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