"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/app/supabase";

type ConsultantForm = {
  organization_name: string;
  contact_person: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  subscription_plan: string;
  is_active: boolean;
};

export default function ConsultantEditPage() {
  const params = useParams();
  const router = useRouter();

  const consultantId = params.id as string;

  const [form, setForm] = useState<ConsultantForm>({
    organization_name: "",
    contact_person: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    subscription_plan: "",
    is_active: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
          "organization_name, contact_person, mobile, address, city, state, subscription_plan, is_active"
        )
        .eq("id", consultantId)
        .eq("role", "consultant")
        .single();

      if (error) {
        console.error(
          "Failed to load consultant for editing:",
          error
        );

        setErrorMessage(
          "Unable to load consultant details."
        );
      } else {
        setForm({
          organization_name:
            data.organization_name || "",
          contact_person:
            data.contact_person || "",
          mobile: data.mobile || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          subscription_plan:
            data.subscription_plan || "",
          is_active: data.is_active ?? true,
        });
      }

      setLoading(false);
    };

    loadConsultant();
  }, [consultantId]);

  const handleChange = (
    field: keyof ConsultantForm,
    value: string | boolean
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSave = async () => {
    if (!consultantId) {
      setErrorMessage("Consultant ID is missing.");
      return;
    }

    setSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { error } = await supabase
      .from("profiles")
      .update({
        organization_name:
          form.organization_name.trim(),
        contact_person:
          form.contact_person.trim(),
        mobile: form.mobile.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        subscription_plan:
          form.subscription_plan.trim(),
        is_active: form.is_active,
      })
      .eq("id", consultantId)
      .eq("role", "consultant");

    if (error) {
      console.error(
        "Failed to update consultant:",
        error
      );

      setErrorMessage(
        "Unable to save consultant changes."
      );
      setSaving(false);
      return;
    }

    setSuccessMessage(
      "Consultant details updated successfully."
    );

    setSaving(false);
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

  if (errorMessage && !form.organization_name) {
    return (
      <div>
        <button
          onClick={() =>
            router.push(
              `/super-admin/consultant/${consultantId}`
            )
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
          ← Back to Consultant Details
        </button>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #fecaca",
            borderRadius: 14,
            padding: 30,
            color: "#dc2626",
          }}
        >
          {errorMessage}
        </div>
      </div>
    );
  }

  const fields: {
    key: keyof ConsultantForm;
    label: string;
    type?: string;
  }[] = [
    {
      key: "organization_name",
      label: "Organization Name",
    },
    {
      key: "contact_person",
      label: "Contact Person",
    },
    {
      key: "mobile",
      label: "Mobile",
    },
    {
      key: "address",
      label: "Address",
    },
    {
      key: "city",
      label: "City",
    },
    {
      key: "state",
      label: "State",
    },
    {
      key: "subscription_plan",
      label: "Subscription Plan",
    },
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
            Edit Consultant
          </h1>

          <p
            style={{
              marginTop: 8,
              color: "#64748b",
            }}
          >
            Update consultant account information.
          </p>
        </div>

        <button
          onClick={() =>
            router.push(
              `/super-admin/consultant/${consultantId}`
            )
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

      {successMessage && (
        <div
          style={{
            background: "#dcfce7",
            border: "1px solid #bbf7d0",
            color: "#166534",
            borderRadius: 10,
            padding: "12px 16px",
            marginBottom: 20,
          }}
        >
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          style={{
            background: "#fee2e2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            borderRadius: 10,
            padding: "12px 16px",
            marginBottom: 20,
          }}
        >
          {errorMessage}
        </div>
      )}

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          padding: 24,
          boxShadow:
            "0 4px 14px rgba(15,23,42,0.05)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {fields.map((field) => (
            <div key={field.key}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#334155",
                  marginBottom: 8,
                }}
              >
                {field.label}
              </label>

              <input
                type="text"
                value={String(form[field.key])}
                onChange={(event) =>
                  handleChange(
                    field.key,
                    event.target.value
                  )
                }
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "11px 12px",
                  border:
                    "1px solid #cbd5e1",
                  borderRadius: 8,
                  fontSize: 14,
                  color: "#0f172a",
                  outline: "none",
                }}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 24,
            paddingTop: 20,
            borderTop:
              "1px solid #e2e8f0",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              color: "#334155",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(event) =>
                handleChange(
                  "is_active",
                  event.target.checked
                )
              }
            />

            Active Consultant Account
          </label>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 28,
          }}
        >
          <button
            onClick={() =>
              router.push(
                `/super-admin/consultant/${consultantId}`
              )
            }
            disabled={saving}
            style={{
              border:
                "1px solid #cbd5e1",
              background: "#ffffff",
              color: "#475569",
              padding: "10px 18px",
              borderRadius: 8,
              cursor: saving
                ? "not-allowed"
                : "pointer",
              fontWeight: 600,
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              border: "none",
              background: saving
                ? "#94a3b8"
                : "#0B4F6C",
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: 8,
              cursor: saving
                ? "not-allowed"
                : "pointer",
              fontWeight: 600,
            }}
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}