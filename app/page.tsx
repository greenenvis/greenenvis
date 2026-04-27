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
    try {
      setLoading(true);

      console.log("Submit button clicked");

      const { data, error } = await supabase
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
        ])
        .select();

      console.log("Response:", data, error);

      if (error) {
        alert("Error saving inquiry");
        console.log(error);
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
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
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
          maxWidth: "850px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "16px",
        }}
      >
        <h1 style={{ marginBottom: "25px" }}>
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
            height: "150px",
          }}
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            backgroundColor: "#16a34a",
            color: "#ffffff",
            border: "none",
            padding: "16px",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "16px",
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