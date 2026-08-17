"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/app/supabase";

type ConsultantProfile = {
  id: string;
  user_id: string | null;
  role: string | null;
  organization_name: string | null;
  contact_person: string | null;
  email: string | null;
  mobile: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  created_at: string | null;
  is_active: boolean | null;
  subscription_plan: string | null;
};

export default function ConsultantDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const consultantId = params.id as string;

  const [consultant, setConsultant] =
    useState<ConsultantProfile | null>(null);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadConsultant = async () => {
      if (!consultantId) {
        setErrorMessage("Consultant ID is missing.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("profiles")
        .select(
          "id, user_id, role, organization_name, contact_person, email, mobile, address, city, state, created_at, is_active, subscription_plan"
        )
        .eq("id", consultantId)
        .eq("role", "consultant")
        .single();

      if (error) {
        console.error(
          "Failed to load consultant details:",
          error
        );

        setConsultant(null);
        setErrorMessage(
          "Unable to load consultant details."
        );
      } else {
        setConsultant(data);
      }

      setLoading(false);
    };

    loadConsultant();
  }, [consultantId]);

  const formatDate = (date: string | null) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
          color: "#64748b",
        }}
      >
        Loading consultant details...
      </div>
    );
  }

  if (errorMessage || !consultant) {
    return (
      <div>
        <button
          onClick={() =>
            router.push("/super-admin/consultant")
          }
          style={{
            border: "none",
            background: "#0B4F6C",
            color: "#ffffff",
            padding: "10px 16px",
            borderRadius: 8,
            cursor: "pointer",
            marginBottom: 20,
          }}
        >
          ← Back to Consultant Management
        </button>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            padding: 30,
            color: "#dc2626",
          }}
        >
          {errorMessage || "Consultant not found."}
        </div>
      </div>
    );
  }

  const details = [
    ["Organization Name", consultant.organization_name],
    ["Contact Person", consultant.contact_person],
    ["Email", consultant.email],
    ["Mobile", consultant.mobile],
    ["Address", consultant.address],
    ["City", consultant.city],
    ["State", consultant.state],
    [
      "Subscription Plan",
      consultant.subscription_plan,
    ],
    [
      "Account Status",
      consultant.is_active
        ? "ACTIVE"
        : "INACTIVE",
    ],
    ["Registered Date", formatDate(consultant.created_at)],
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 28,
              color: "#0f172a",
            }}
          >
            Consultant Details
          </h1>

          <p
            style={{
              marginTop: 8,
              color: "#64748b",
            }}
          >
            View complete consultant account information.
          </p>
        </div>

        <div
  style={{
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  }}
>
  <button
    onClick={() =>
      router.push(
        `/super-admin/consultant/${consultantId}/edit`
      )
    }
    style={{
      border: "none",
      background: "#0B4F6C",
      color: "#ffffff",
      padding: "10px 16px",
      borderRadius: 8,
      cursor: "pointer",
      fontWeight: 600,
    }}
  >
    Edit
  </button>

  <button
    onClick={() =>
      router.push("/super-admin/consultant")
    }
    style={{
      border: "1px solid #cbd5e1",
      background: "#ffffff",
      color: "#0B4F6C",
      padding: "10px 16px",
      borderRadius: 8,
      cursor: "pointer",
      fontWeight: 600,
    }}
  >
    ← Back
  </button>
</div>
</div>

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          padding: 24,
          boxShadow:
            "0 4px 14px rgba(15,23,42,0.05)",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                color: "#0B4F6C",
                fontSize: 22,
              }}
            >
              {consultant.organization_name || "-"}
            </h2>

            <p
              style={{
                margin: "8px 0 0",
                color: "#64748b",
              }}
            >
              Consultant Account
            </p>
          </div>

          <span
            style={{
              display: "inline-block",
              padding: "7px 14px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              background: consultant.is_active
                ? "#dcfce7"
                : "#f1f5f9",
              color: consultant.is_active
                ? "#166534"
                : "#475569",
            }}
          >
            {consultant.is_active
              ? "ACTIVE"
              : "INACTIVE"}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {details.map(([label, value]) => (
          <div
            key={label}
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "#64748b",
                marginBottom: 8,
              }}
            >
              {label}
            </div>

            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#0f172a",
                wordBreak: "break-word",
              }}
            >
              {value || "-"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}