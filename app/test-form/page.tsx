"use client";
import { useState } from "react";
import { supabase } from "../../supabase";

export default function InquiryFormPage() {
  const [form, setForm] = useState({
    industryName: "",
    contactPerson: "",
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
    const { error } = await supabase.from("inquiries").insert([
      {
        industry_name: form.industryName,
        contact_person: form.contactPerson,
        mobile: form.mobile,
        email: form.email,
        service: form.service,
        details: form.details,
      },
    ]);

    if (error) {
      alert("Error saving inquiry");
      console.log(error);
    } else {
      alert("Inquiry submitted successfully!");
      setForm({
        industryName: "",
        contactPerson: "",
        mobile: "",
        email: "",
        service: "",
        details: "",
      });
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Database Connected Inquiry Form</h1>

      <div style={{ display: "grid", gap: "15px", maxWidth: "700px" }}>
        <input
          name="industryName"
          placeholder="Industry Name"
          value={form.industryName}
          onChange={handleChange}
        />

        <input
          name="contactPerson"
          placeholder="Contact Person Name"
          value={form.contactPerson}
          onChange={handleChange}
        />

        <input
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="service"
          placeholder="Required Service"
          value={form.service}
          onChange={handleChange}
        />

        <textarea
          name="details"
          placeholder="Requirement Details"
          value={form.details}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
          Save to Database
        </button>
      </div>
    </div>
  );
}