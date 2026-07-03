"use client";

import { useState } from "react";
import { supabase } from "../supabase";

export default function IndustryRegister() {
  const [organizationName, setOrganizationName] = useState("");
  const [industrySector, setIndustrySector] = useState("");
  const [category, setCategory] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [factoryAddress, setFactoryAddress] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const { error } = await supabase.from("organizations").insert([
      {
        organization_name: organizationName,
        organization_type: "Industry",
        industry_sector: industrySector,
        category: category,
        gst_number: gstNumber,
        address: factoryAddress,
        city: city,
        state: state,
        email: email,
        password: password,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Industry Registered Successfully");
      window.location.href = "/industry-login";
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    border: "1px solid #dbe4ee",
    borderRadius: "10px",
    fontSize: "15px",
    boxSizing: "border-box" as const,
    background: "#ffffff",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#ecfdf5 0%,#f8fafc 50%,#dcfce7 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "50px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              color: "#166534",
              fontSize: "48px",
              marginBottom: "10px",
              fontWeight: "700",
            }}
          >
            GreenEnvis
          </h1>

          <h2
            style={{
              fontSize: "32px",
              marginBottom: "10px",
            }}
          >
            Industry Registration
          </h2>

          <p
            style={{
              color: "#64748b",
              fontSize: "16px",
            }}
          >
            Smart Environmental Compliance Management Platform
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <input
            placeholder="Industry Name"
            style={inputStyle}
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
          />

          <input
            placeholder="Industry Sector"
            style={inputStyle}
            value={industrySector}
            onChange={(e) => setIndustrySector(e.target.value)}
          />

          <input
            placeholder="GST Number"
            style={inputStyle}
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
          />

          <input
            placeholder="Email Address"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="District"
            style={inputStyle}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <select
            style={inputStyle}
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">Select State</option>
            <option>Gujarat</option>
            <option>Maharashtra</option>
            <option>Rajasthan</option>
            <option>Madhya Pradesh</option>
            <option>Karnataka</option>
            <option>Tamil Nadu</option>
          </select>

          <select
            style={inputStyle}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Industry Category</option>
            <option>Red</option>
            <option>Orange</option>
            <option>Green</option>
            <option>White</option>
          </select>

          </div>

        <textarea
          placeholder="Industry Address"
          value={completeAddress}
          onChange={(e) => setCompleteAddress(e.target.value)}
          style={{
            ...inputStyle,
            marginTop: "20px",
            minHeight: "120px",
            resize: "vertical",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            style={inputStyle}
          />
        </div>

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            marginTop: "30px",
            background: "#166534",
            color: "#ffffff",
            border: "none",
            padding: "18px",
            borderRadius: "12px",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Register Industry
        </button>
      </div>
    </div>
  );
}