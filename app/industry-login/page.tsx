"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase";

export default function IndustryLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      alert("Invalid Email or Password");
      return;
    }

    alert("Login Successful");

    router.push("/industry-dashboard");
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    marginTop: "15px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "15px",
    boxSizing: "border-box" as const,
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
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#166534",
            marginBottom: "10px",
          }}
        >
          GreenEnvis
        </h1>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Industry Login
        </h2>

        <input
          type="email"
          placeholder="Email Address"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px",
            background: "#166534",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Login
        </button>

        <p
          onClick={() => router.push("/industry-register")}
          style={{
            textAlign: "center",
            marginTop: "20px",
            cursor: "pointer",
            color: "#166534",
            fontWeight: "600",
          }}
        >
          Register New Industry
        </p>
      </div>
    </div>
  );
}