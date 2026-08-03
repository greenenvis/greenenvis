"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/app/supabase";

export default function IndustryLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

const handleLogin = async () => {
  if (!email.trim()) {
    alert("Please enter your email.");
    return;
  }

  if (!password) {
    alert("Please enter your password.");
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

 if (!data.user?.email_confirmed_at) {
  await supabase.auth.signOut();

  alert("Please verify your email before login.");

  return;
}

const { data: profile } = await supabase
  .from("industry_profiles")
  .select("id")
  .eq("user_id", data.user.id)
  .maybeSingle();

if (!profile) {
  const { error: profileError } = await supabase
    .from("industry_profiles")
    .insert({
      user_id: data.user.id,
      company_name:
        data.user.user_metadata?.company_name || "",
      contact_person:
        data.user.user_metadata?.contact_person || "",
      mobile:
        data.user.user_metadata?.mobile || "",
      email: data.user.email,
      gst_number:
        data.user.user_metadata?.gst_number || null,
      gpcb_id:
        data.user.user_metadata?.gpcb_id || null,
    });

  if (profileError) {
    alert(profileError.message);
    return;
  }
}

router.push("/dashboard");
};

  const features = [
    {
      icon: "📋",
      title: "Compliance Tracker",
      description:
        "Track all statutory environmental compliances from one dashboard.",
    },
    {
      icon: "📁",
      title: "Digital Document Center",
      description:
        "Securely manage CTE, CCA, BMW, EPR and CGWA documents.",
    },
    {
      icon: "⏰",
      title: "Renewal Reminder",
      description:
        "Never miss licence expiry with automatic reminders.",
    },
    {
      icon: "📝",
      title: "Daily Work Record",
      description:
        "Maintain consultant activities and daily work records.",
    },
    {
      icon: "☁️",
      title: "Cloud Backup",
      description:
        "Encrypted cloud storage with secure document access.",
    },
    {
      icon: "🤖",
      title: "AI Compliance",
      description:
        "AI based compliance assistance (Coming Soon).",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#edf6ff 0%,#ffffff 45%,#f7fbff 100%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #dbe4ee",
          padding: "18px 40px",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: "1450px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <button
              onClick={() => router.push("/")}
              style={{
                border: "none",
                background: "#0B4F84",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ← Home
            </button>

            <div>
              <h1
                style={{
                  margin: 0,
                  color: "#0B4F84",
                  fontSize: "34px",
                }}
              >
                GreenEnvis
              </h1>

              <div
                style={{
                  color: "#64748b",
                  marginTop: "4px",
                }}
              >
                Industry Portal
              </div>
            </div>
          </div>

          <div
            style={{
              textAlign: "right",
            }}
          >
            <div
              style={{
                color: "#16a34a",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              🎁 30 Days FREE Trial
            </div>

            <div
              style={{
                color: "#64748b",
                marginTop: "5px",
              }}
            >
              Version 1.0 Beta
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}

      <div
        style={{
          maxWidth: "1450px",
          margin: "60px auto",
          padding: "0 30px",
          display: "grid",
          gridTemplateColumns: "1.2fr 520px",
          gap: "60px",
          alignItems: "center",
        }}
      >
        {/* LEFT */}

        <div>
          <div
            style={{
              display: "inline-block",
              background: "#dcfce7",
              color: "#166534",
              padding: "8px 18px",
              borderRadius: "999px",
              fontWeight: "bold",
            }}
          >
            Welcome to GreenEnvis
          </div>

          <h2
            style={{
              fontSize: "54px",
              color: "#0f172a",
              marginTop: "25px",
              lineHeight: "64px",
            }}
          >
            Smart Environmental
            <br />
            Compliance Platform
          </h2>

          <p
            style={{
              marginTop: "20px",
              fontSize: "18px",
              color: "#64748b",
              lineHeight: "34px",
              maxWidth: "760px",
            }}
          >
            Manage environmental compliances, statutory approvals,
            renewals, compliance calendar, digital documents and
            reports from one secure dashboard.
          </p>

          <div
            style={{
              marginTop: "40px",
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "18px",
            }}
          >
            {features.map((feature) => (
              <div
                key={feature.title}
                style={{
                  background: "#ffffff",
                  border: "1px solid #dbe4ee",
                  borderRadius: "16px",
                  padding: "22px",
                  boxShadow: "0 8px 24px rgba(0,0,0,.05)",
                  transition: ".25s",
                }}
              >
                <div
                  style={{
                    fontSize: "34px",
                    marginBottom: "12px",
                  }}
                >
                  {feature.icon}
                </div>

                <div
                  style={{
                    fontWeight: "bold",
                    color: "#0B4F84",
                    fontSize: "18px",
                    marginBottom: "8px",
                  }}
                >
                  {feature.title}
                </div>

                <div
                  style={{
                    color: "#64748b",
                    lineHeight: "28px",
                    fontSize: "15px",
                  }}
                >
                  {feature.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= LOGIN CARD ================= */}

        <div
          style={{
            background: "#ffffff",
            borderRadius: "22px",
            padding: "40px",
            border: "1px solid #dbe4ee",
            boxShadow: "0 20px 60px rgba(0,0,0,.08)",
          }}
        >
          <div
            style={{
              background: "#dcfce7",
              color: "#166534",
              padding: "12px",
              borderRadius: "10px",
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "25px",
            }}
          >
            🎁 30 Days FREE Trial • No Credit Card Required
          </div>

          <h2
            style={{
              marginTop: 0,
              marginBottom: "10px",
              textAlign: "center",
              color: "#0B4F84",
              fontSize: "34px",
            }}
          >
            Industry Login
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              marginBottom: "35px",
            }}
          >
            Sign in to access your GreenEnvis Dashboard
          </p>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "28px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() =>
                  setShowPassword(!showPassword)
                }
              />
              Show Password
            </label>

            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </button>
          </div>
        <button
            type="button"
            onClick={handleLogin}
            style={{
              width: "100%",
              background: "#0B4F84",
              color: "#ffffff",
              border: "none",
              padding: "16px",
              borderRadius: "10px",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Login to Dashboard
          </button>

          <div
            style={{
              textAlign: "center",
              marginTop: "25px",
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Don't have an Industry Account?
          </div>

          <button
            type="button"
            onClick={() => router.push("/register")}
            style={{
              width: "100%",
              marginTop: "12px",
              background: "#16a34a",
              color: "#ffffff",
              border: "none",
              padding: "15px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Create FREE Industry Account
          </button>

          <div
            style={{
              marginTop: "30px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "18px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                color: "#0B4F84",
                marginBottom: "8px",
              }}
            >
              Need Help?
            </div>

            <div
              style={{
                color: "#64748b",
                lineHeight: "28px",
              }}
            >
              📧 support@greenenvis.com
              <br />
              📞 +91 87807 23063
            </div>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}

      <footer
        style={{
          background: "#0B4F84",
          marginTop: "60px",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: "1450px",
            margin: "0 auto",
            padding: "45px 30px",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "40px",
          }}
        >
          <div>
            <h2 style={{ marginTop: 0 }}>GreenEnvis</h2>

            <p
              style={{
                color: "#dbeafe",
                lineHeight: "30px",
              }}
            >
              India's Smart Environmental Compliance Platform
              helping industries manage CTE, CCA,
              EPR, BMW, CGWA, Renewals,
              Compliance Tracking and Digital Documents.
            </p>
          </div>

          <div>
            <h3>Platform</h3>

            <p>✔ Compliance Tracker</p>
            <p>✔ Document Center</p>
            <p>✔ Daily Work Record</p>
            <p>✔ Renewal Reminder</p>
          </div>

          <div>
            <h3>Contact</h3>

            <p>📧 support@greenenvis.com</p>
            <p>📞 +91 87807 23063</p>
            <p>📍 Gujarat, India</p>
            <p>Version 1.0 Beta</p>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,.15)",
            textAlign: "center",
            padding: "18px",
            color: "#dbeafe",
            fontSize: "14px",
          }}
        >
          © {new Date().getFullYear()} GreenEnvis. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}