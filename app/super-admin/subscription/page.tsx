"use client";

import { useState } from "react";

export default function SuperAdminSubscriptionPage() {
  const [billingCycle, setBillingCycle] =
    useState<"MONTHLY" | "SIX_MONTHS">("MONTHLY");

  const monthlyPrice = 599;
  const sixMonthPrice = monthlyPrice * 6;

  return (
    <div>
      <div
        style={{
          marginBottom: 24,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 28,
            color: "#0f172a",
          }}
        >
          Subscription Management
        </h1>

        <p
          style={{
            marginTop: 8,
            color: "#64748b",
          }}
        >
          Manage GreenEnvis subscription plans,
          free trials and payment status.
        </p>
      </div>

      {/* Trial Banner */}

      <div
        style={{
          background:
            "linear-gradient(135deg, #0B4F6C, #0f766e)",
          color: "#ffffff",
          borderRadius: 16,
          padding: 28,
          marginBottom: 24,
          boxShadow:
            "0 8px 24px rgba(11,79,108,0.18)",
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            opacity: 0.9,
          }}
        >
          GREENENVIS INDUSTRY PLAN
        </div>

        <h2
          style={{
            margin: "8px 0",
            fontSize: 26,
          }}
        >
          30 Days FREE Trial
        </h2>

        <p
          style={{
            margin: 0,
            opacity: 0.9,
            fontSize: 15,
          }}
        >
          Every new Industry account starts with
          a 30-day free trial.
        </p>
      </div>

      {/* Pricing */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          marginBottom: 24,
        }}
      >
        {/* Monthly */}

        <div
          style={{
            background: "#ffffff",
            border:
              billingCycle === "MONTHLY"
                ? "2px solid #16a34a"
                : "1px solid #e2e8f0",
            borderRadius: 14,
            padding: 26,
            boxShadow:
              "0 4px 14px rgba(15,23,42,0.06)",
            cursor: "pointer",
          }}
          onClick={() =>
            setBillingCycle("MONTHLY")
          }
        >
          <div
            style={{
              fontSize: 13,
              color: "#64748b",
              fontWeight: 600,
            }}
          >
            MONTHLY PLAN
          </div>

          <div
            style={{
              marginTop: 12,
              color: "#0B4F6C",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            ₹599
            <span
              style={{
                fontSize: 14,
                color: "#64748b",
                fontWeight: 400,
              }}
            >
              {" "}
              / month
            </span>
          </div>

          <p
            style={{
              color: "#64748b",
              fontSize: 14,
            }}
          >
            Starting after the 30-day free trial.
          </p>

          <div
            style={{
              marginTop: 18,
              color: "#166534",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            ✓ 30 Days Free Trial
            <br />
            ✓ Full Industry Portal Access
            <br />
            ✓ Compliance Management
          </div>
        </div>

        {/* Six Months */}

        <div
          style={{
            background: "#ffffff",
            border:
              billingCycle === "SIX_MONTHS"
                ? "2px solid #16a34a"
                : "1px solid #e2e8f0",
            borderRadius: 14,
            padding: 26,
            boxShadow:
              "0 4px 14px rgba(15,23,42,0.06)",
            cursor: "pointer",
          }}
          onClick={() =>
            setBillingCycle("SIX_MONTHS")
          }
        >
          <div
            style={{
              fontSize: 13,
              color: "#64748b",
              fontWeight: 600,
            }}
          >
            6 MONTH PLAN
          </div>

          <div
            style={{
              marginTop: 12,
              color: "#0B4F6C",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            ₹{sixMonthPrice.toLocaleString("en-IN")}
          </div>

          <p
            style={{
              color: "#64748b",
              fontSize: 14,
            }}
          >
            ₹599 × 6 months.
          </p>

          <div
            style={{
              marginTop: 18,
              color: "#166534",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            ✓ 6 Months Access
            <br />
            ✓ Full Industry Portal Access
            <br />
            ✓ Compliance Management
          </div>
        </div>
      </div>

      {/* Current Configuration */}

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          padding: 24,
          boxShadow:
            "0 4px 14px rgba(15,23,42,0.06)",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#0B4F6C",
            fontSize: 20,
          }}
        >
          Current Subscription Configuration
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 18,
            marginTop: 20,
          }}
        >
          <div
            style={infoCardStyle}
          >
            <div style={labelStyle}>
              Free Trial
            </div>

            <div style={valueStyle}>
              30 Days
            </div>
          </div>

          <div
            style={infoCardStyle}
          >
            <div style={labelStyle}>
              Monthly Price
            </div>

            <div style={valueStyle}>
              ₹599 / Month
            </div>
          </div>

          <div
            style={infoCardStyle}
          >
            <div style={labelStyle}>
              Six Month Price
            </div>

            <div style={valueStyle}>
              ₹{sixMonthPrice.toLocaleString("en-IN")}
            </div>
          </div>

          <div
            style={infoCardStyle}
          >
            <div style={labelStyle}>
              Selected Billing
            </div>

            <div style={valueStyle}>
              {billingCycle === "MONTHLY"
                ? "Monthly"
                : "6 Months"}
            </div>
          </div>
        </div>
      </div>

      {/* Future Payment Section */}

      <div
        style={{
          marginTop: 24,
          background: "#f8fafc",
          border:
            "1px dashed #cbd5e1",
          borderRadius: 14,
          padding: 24,
        }}
      >
        <h3
          style={{
            margin: 0,
            color: "#334155",
          }}
        >
          Payment Gateway
        </h3>

        <p
          style={{
            marginBottom: 0,
            color: "#64748b",
            fontSize: 14,
          }}
        >
          Payment gateway integration will be
          connected after the subscription plan
          and trial workflow are finalized.
        </p>
      </div>
    </div>
  );
}

const infoCardStyle: React.CSSProperties = {
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: 10,
  padding: 18,
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#64748b",
  marginBottom: 7,
};

const valueStyle: React.CSSProperties = {
  fontSize: 17,
  fontWeight: 700,
  color: "#0f172a",
};