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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log("Submit Clicked");

    const { error } = await supabase
      .from("inquiries")
      .insert([
        {
          industry_name: form.industry_name,
          contact_person: form.contact_person,
          mobile: form.mobile,
          email: form.email,
          service: form.service,
          details: form.details,
        },
      ]);

    if (error) {
      console.log(error);
      alert("Error saving inquiry");
    } else {
      alert("Inquiry Submitted Successfully!");

      setForm({
        industry_name: "",
        contact_person: "",
        mobile: "",
        email: "",
        service: "",
        details: "",
      });
    }
  };

  return (
    <div
      style={{
        background: "#f1f5f9",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "16px",
        }}
      >
        <h1 style={{ color: "#166534" }}>
          Industry Inquiry Form
        </h1>

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
            height: "140px",
          }}
        />

        <button
          type="button"
          onClick={handleSubmit}
          style={{
            width: "100%",
            background: "#16a34a",
            color: "#ffffff",
            border: "none",
            padding: "16px",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Submit Inquiry
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