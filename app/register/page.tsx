"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/app/supabase";

export default function IndustryRegisterPage() {
  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [gpcbId, setGpcbId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleRegister = async () => {
  if (!companyName.trim()) {
    alert("Please enter Company / Industry Name.");
    return;
  }

  if (!contactPerson.trim()) {
    alert("Please enter Contact Person Name.");
    return;
  }

  if (!mobile.trim()) {
    alert("Please enter Mobile Number.");
    return;
  }

  if (!email.trim()) {
    alert("Please enter Email Address.");
    return;
  }

  if (!password) {
    alert("Please enter Password.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Password and Confirm Password do not match.");
    return;
  }

  if (!acceptTerms) {
    alert("Please accept Terms & Conditions.");
    return;
  }

  const {
  data,
  error,
} = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      company_name: companyName,
      contact_person: contactPerson,
      mobile,
      gst_number: gstNumber,
      gpcb_id: gpcbId,
      role: "industry",
    },
  },
});

if (error) {
  alert(error.message);
  return;
}

if (!data.user) {
  alert("User creation failed.");
  return;
}

alert(
  "Registration successful!\n\nPlease verify your email before login."
);

router.push("/login");
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#edf7ff 0%,#ffffff 50%,#f7fbff 100%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* ================= HEADER ================= */}

      <div
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #dbe4ee",
          padding: "18px 40px",
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
              onClick={() => router.push("/login")}
              style={{
                background: "#0B4F84",
                color: "#ffffff",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ← Back to Login
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
                  marginTop: "5px",
                }}
              >
                Industry Registration
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
              🎁 FREE 30 Days Trial
            </div>

            <div
              style={{
                color: "#64748b",
                marginTop: "5px",
              }}
            >
              No Credit Card Required
            </div>
          </div>
        </div>
      </div>

      {/* ================= BODY ================= */}

      <div
        style={{
          maxWidth: "1450px",
          margin: "60px auto",
          padding: "0 30px",
          display: "grid",
          gridTemplateColumns: "1fr 620px",
          gap: "60px",
          alignItems: "start",
        }}
      >
        {/* LEFT SIDE */}

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
              fontSize: "52px",
              lineHeight: "65px",
              marginTop: "25px",
              color: "#0f172a",
            }}
          >
            Create Your
            <br />
            Industry Account
          </h2>

          <p
            style={{
              color: "#64748b",
              lineHeight: "34px",
              fontSize: "18px",
              marginTop: "20px",
              maxWidth: "720px",
            }}
          >
            Register your industry and manage Compliance, CTE, CCA, EPR,
            BMW, Hazardous Waste, CGWA, Daily Work Records, Renewals and
            Digital Documents from one secure dashboard.
          </p>

          <div
            style={{
              marginTop: "40px",
              display: "grid",
              gap: "18px",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "22px",
                border: "1px solid #dbe4ee",
                boxShadow: "0 8px 24px rgba(0,0,0,.05)",
              }}
            >
              <div style={{ fontSize: "32px" }}>📋</div>

              <h3
                style={{
                  marginBottom: "8px",
                  color: "#0B4F84",
                }}
              >
                Compliance Tracker
              </h3>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "28px",
                }}
              >
                Track all statutory environmental compliances from one dashboard.
              </p>
            </div>

            <div
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "22px",
                border: "1px solid #dbe4ee",
                boxShadow: "0 8px 24px rgba(0,0,0,.05)",
              }}
            >
              <div style={{ fontSize: "32px" }}>📁</div>

              <h3
                style={{
                  marginBottom: "8px",
                  color: "#0B4F84",
                }}
              >
                Digital Document Center
              </h3>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "28px",
                }}
              >
                Store all CTE, CCA, BMW, EPR and CGWA documents securely.
              </p>
            </div>

            <div
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "22px",
                border: "1px solid #dbe4ee",
                boxShadow: "0 8px 24px rgba(0,0,0,.05)",
              }}
            >
              <div style={{ fontSize: "32px" }}>⏰</div>

              <h3
                style={{
                  marginBottom: "8px",
                  color: "#0B4F84",
                }}
              >
                Automatic Renewal Reminder
              </h3>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "28px",
                }}
              >
                Never miss expiry dates with automatic notifications.
              </p>
            </div>
          </div>
        </div>

        {/* ================= REGISTER CARD ================= */}

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
            Create Your FREE Industry Account
          </div>

          <h2
            style={{
              marginTop: 0,
              marginBottom: "30px",
              textAlign: "center",
              color: "#0B4F84",
            }}
          >
            Industry Registration
          </h2>

          <div style={{ display: "grid", gap: "18px" }}>
            <input
              type="text"
              placeholder="Company / Industry Name *"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Contact Person Name *"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Mobile Number *"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={inputStyle}
            />

            <input
              type="email"
              placeholder="Email Address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="GST Number (Optional)"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="GPCB Industry ID (Optional)"
              value={gpcbId}
              onChange={(e) => setGpcbId(e.target.value)}
              style={inputStyle}
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password *"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={inputStyle}
            />

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                color: "#475569",
                fontSize: "15px",
              }}
            >
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                cursor: "pointer",
                color: "#475569",
                fontSize: "15px",
                lineHeight: "24px",
              }}
            >
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
                style={{ marginTop: "4px" }}
              />

              <span>
                I agree to the Terms & Conditions and Privacy Policy of
                GreenEnvis.
              </span>
            </label>

            <button
              type="button"
              onClick={handleRegister}
              style={{
                marginTop: "8px",
                background: "#16a34a",
                color: "#ffffff",
                border: "none",
                padding: "16px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "17px",
                fontWeight: "bold",
              }}
            >
              Create FREE Industry Account
            </button>

            <div
              style={{
                textAlign: "center",
                color: "#64748b",
                marginTop: "8px",
              }}
            >
              Already have an account?
            </div>

            <button
              type="button"
              onClick={() => router.push("/login")}
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Login Here
            </button>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}

      <footer
        style={{
          marginTop: "60px",
          background: "#0B4F84",
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
              India's Smart Environmental Compliance Platform helping
              industries manage CTE, CCA, EPR, BMW, CGWA, Renewals,
              Compliance Tracking and Digital Documents from one secure
              dashboard.
            </p>
          </div>

          <div>
            <h3>Platform</h3>

            <p>✔ Compliance Tracker</p>
            <p>✔ Digital Document Center</p>
            <p>✔ Daily Work Record</p>
            <p>✔ Renewal Reminder</p>
          </div>

          <div>
            <h3>Support</h3>

            <p>📧 support@greenenvis.com</p>
            <p>📞 +91 87807 23063</p>
            <p>📍 Gujarat, India</p>
            <p>🎁 FREE Trial - 30 Days</p>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            padding: "18px",
            borderTop: "1px solid rgba(255,255,255,.15)",
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

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "15px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
  boxSizing: "border-box" as const,
};