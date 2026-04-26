"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = () => {
    if (
      email === "admin@greenenvis.com" &&
      password === "admin123"
    ) {
      alert("Admin Login Successful");
      router.push("/admin");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
            color: "#166534",
            textAlign: "center",
          }}
        >
          Admin Login
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          GreenEnvis Internal Admin Portal
        </p>

        <div style={{ display: "grid", gap: "20px" }}>
          <input
            type="email"
            placeholder="Enter Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={handleAdminLogin}
            style={{
              background: "#16a34a",
              color: "#ffffff",
              border: "none",
              padding: "16px",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Login as Admin
          </button>

          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Demo Admin Login: admin@greenenvis.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "16px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "16px",
  outline: "none",
};