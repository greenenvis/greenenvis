"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/app/supabase";

type IndustryProfile = {
  id: string;
  user_id: string | null;
  company_name: string | null;
  contact_person: string | null;
  mobile: string | null;
  email: string | null;
  gst_number: string | null;
  gpcb_id: string | null;
  plan: string | null;
  account_status: string | null;
  trial_start_date: string | null;
  trial_expiry_date: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export default function IndustryDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const industryId = params.id as string;

  const [industry, setIndustry] =
    useState<IndustryProfile | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

 const [portalUser, setPortalUser] = useState<{
  id: string | null;
  email: string | null;
  role: string | null;
} | null>(null);

const [organizationId, setOrganizationId] = useState<string | null>(
  null
);

const [subscription, setSubscription] = useState<{
  id: string;
  plan_name: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string | null;
  amount: number | null;
} | null>(null);

const [payment, setPayment] = useState<{
  id: string;
  amount: number | null;
  payment_status: string | null;
  payment_date: string | null;
  payment_method: string | null;
  invoice_no: string | null;
  remarks: string | null;
} | null>(null);

const [paymentMethod, setPaymentMethod] = useState("");
const [invoiceNo, setInvoiceNo] = useState("");
const [paymentDate, setPaymentDate] = useState("");
const [paymentRemarks, setPaymentRemarks] = useState("");

const [selectedPlan, setSelectedPlan] = useState<
  "MONTHLY" | "SIX_MONTHS"
>("MONTHLY");

const [paymentStatus, setPaymentStatus] = useState<
  "PAYMENT DUE" | "PAID"
>("PAYMENT DUE");

const monthlyPrice = 599;
const sixMonthPrice = monthlyPrice * 6;

const selectedAmount =
  selectedPlan === "MONTHLY"
    ? monthlyPrice
    : sixMonthPrice;

const handleCreateSubscription = async () => {
  const currentIndustry = industry;

  if (!currentIndustry) {
    setErrorMessage(
      "Industry details are not available."
    );
    return;
  }

  setSaving(true);
  setErrorMessage("");
  setSuccessMessage("");

  const startDate = new Date();

  const endDate = new Date(startDate);

  if (selectedPlan === "MONTHLY") {
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(endDate.getDate() - 1);
  } else {
    endDate.setMonth(endDate.getMonth() + 6);
    endDate.setDate(endDate.getDate() - 1);
  }

  const startDateString =
    startDate.toISOString().split("T")[0];

  const endDateString =
    endDate.toISOString().split("T")[0];

  const planName =
    selectedPlan === "MONTHLY"
      ? "MONTHLY"
      : "SIX_MONTHS";

  const subscriptionStatus = "Active";

 const databasePaymentStatus =
  paymentStatus === "PAID"
    ? "Paid"
    : "Pending";

  const { data: subscriptionData, error: subscriptionError } =
    await supabase
      .from("subscriptions")
      .insert({
        organization_id: organizationId,
        plan_name: planName,
        start_date: startDateString,
        end_date: endDateString,
        status: subscriptionStatus,
        amount: selectedAmount,
      })
      .select(
        "id, plan_name, start_date, end_date, status, amount"
      )
      .single();

  if (subscriptionError) {
    console.error(
      "Failed to create subscription:",
      subscriptionError
    );

    setErrorMessage(
      "Unable to create subscription. Please try again."
    );

    setSaving(false);
    return;
  }

  const { error: paymentError } = await supabase
    .from("payments")
    .insert({
      organization_id: organizationId,
      amount: selectedAmount,
      payment_status: databasePaymentStatus,
      payment_date:
      databasePaymentStatus === "Paid"
          ? startDateString
          : null,
      payment_method: null,
      remarks:
        databasePaymentStatus === "Paid"
          ? `${planName} subscription payment received`
          : `${planName} subscription payment due`,
    });

  if (paymentError) {
    console.error(
      "Failed to create payment record:",
      paymentError
    );

    setErrorMessage(
      "Subscription was created, but payment record could not be created."
    );

    setSaving(false);
    return;
  }

  const { data: updatedIndustry, error: industryUpdateError } =
    await supabase
      .from("industry_profiles")
      .update({
        plan: planName,
      })
      .eq("id", currentIndustry.id)
      .select(
        "id, user_id, company_name, contact_person, mobile, email, gst_number, gpcb_id, plan, account_status, trial_start_date, trial_expiry_date, created_at, updated_at"
      )
      .single();

  if (industryUpdateError) {
    console.error(
      "Failed to update industry plan:",
      industryUpdateError
    );

    setErrorMessage(
      "Subscription and payment were created, but industry plan could not be updated."
    );

    setSaving(false);
    return;
  }

  setSubscription(subscriptionData);
  setIndustry(updatedIndustry);

  setSuccessMessage(
    "Subscription and payment record created successfully."
  );

  setSaving(false);
};

const handleMarkPaymentPaid = async () => {
  if (!payment) {
    setErrorMessage(
      "No payment record is available for this industry."
    );
    return;
  }

  setSaving(true);
  setErrorMessage("");
  setSuccessMessage("");

  const finalPaymentDate =
    paymentDate ||
    new Date().toISOString().split("T")[0];

  const { data: updatedPayment, error } =
    await supabase
      .from("payments")
      .update({
        payment_status: "Paid",
        payment_date: finalPaymentDate,
        payment_method:
          paymentMethod.trim() || null,
        invoice_no:
          invoiceNo.trim() || null,
        remarks:
          paymentRemarks.trim() ||
          "Subscription payment received",
      })
      .eq("id", payment.id)
      .select(
        "id, amount, payment_status, payment_date, payment_method, invoice_no, remarks"
      )
      .single();

  if (error) {
    console.error(
      "Failed to update payment:",
      error
    );

    setErrorMessage(
      "Unable to mark payment as paid. Please try again."
    );

    setSaving(false);
    return;
  }

  setPayment(updatedPayment);
  setPaymentStatus("PAID");
  setPaymentMethod(
    updatedPayment.payment_method || ""
  );
  setInvoiceNo(
    updatedPayment.invoice_no || ""
  );
  setPaymentDate(
    updatedPayment.payment_date || ""
  );
  setPaymentRemarks(
    updatedPayment.remarks || ""
  );

  setSuccessMessage(
    "Payment marked as PAID successfully."
  );

  setSaving(false);
};

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    company_name: "",
    contact_person: "",
    mobile: "",
    gst_number: "",
    gpcb_id: "",
    plan: "",
    trial_start_date: "",
    trial_expiry_date: "",
  });

  useEffect(() => {
    const loadIndustry = async () => {
      if (!industryId) {
        setErrorMessage("Industry ID is missing.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const { data, error } = await supabase
        .from("industry_profiles")
        .select(
          "id, user_id, company_name, contact_person, mobile, email, gst_number, gpcb_id, plan, account_status, trial_start_date, trial_expiry_date, created_at, updated_at"
        )
        .eq("id", industryId)
        .single();

      if (error) {
        console.error(
          "Failed to load industry details:",
          error
        );

        setIndustry(null);
        setErrorMessage(
          "Unable to load industry details."
        );
      } else {
        setIndustry(data);

        setFormData({
          company_name: data.company_name || "",
          contact_person: data.contact_person || "",
          mobile: data.mobile || "",
          gst_number: data.gst_number || "",
          gpcb_id: data.gpcb_id || "",
          plan: data.plan || "",
          trial_start_date:
            data.trial_start_date || "",
          trial_expiry_date:
            data.trial_expiry_date || "",
        });

       if (data.user_id) {
          const {
          data: profileData,
          error: profileError,
          } = await supabase
         .from("profiles")
         .select("id, email, role")
         .eq("user_id", data.user_id)
         .single();

          if (profileError) {
            console.error(
              "Failed to load linked portal user:",
              profileError
            );

            setPortalUser(null);

          } else {
  setPortalUser(profileData);

  const { data: organizationData, error: organizationError } =
    await supabase
      .from("organizations")
      .select("id")
      .eq("profile_id", profileData.id)
      .maybeSingle();

  if (organizationError) {
    console.error(
      "Failed to load industry organization:",
      organizationError
    );
    setOrganizationId(null);
    setSubscription(null);
  } else if (organizationData) {
    setOrganizationId(organizationData.id);

    const { data: subscriptionData, error: subscriptionError } =
      await supabase
        .from("subscriptions")
        .select(
          "id, plan_name, start_date, end_date, status, amount"
        )
        .eq("organization_id", organizationData.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (subscriptionError) {
  console.error(
    "Failed to load industry subscription:",
    subscriptionError
  );
  setSubscription(null);
} else {
  setSubscription(subscriptionData);
}

const {
  data: paymentData,
  error: paymentLoadError,
} = await supabase
  .from("payments")
  .select(
    "id, amount, payment_status, payment_date, payment_method, invoice_no, remarks"
  )
  .eq("organization_id", organizationData.id)
  .order("created_at", { ascending: false })
  .limit(1)
  .maybeSingle();

if (paymentLoadError) {
  console.error(
    "Failed to load industry payment:",
    paymentLoadError
  );
  setPayment(null);
} else {
  setPayment(paymentData);

  if (paymentData) {
    setPaymentMethod(
      paymentData.payment_method || ""
    );
    setInvoiceNo(
      paymentData.invoice_no || ""
    );
    setPaymentDate(
      paymentData.payment_date || ""
    );
    setPaymentRemarks(
      paymentData.remarks || ""
    );

    if (
      paymentData.payment_status === "Paid"
    ) {
      setPaymentStatus("PAID");
    } else {
      setPaymentStatus("PAYMENT DUE");
    }
  }
}

  } else {
    setOrganizationId(null);
    setSubscription(null);
  }
}
} else {
  setPortalUser(null);
  setOrganizationId(null);
  setSubscription(null);
}

}
setLoading(false);
};

    loadIndustry();
  }, [industryId]);

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

  const handleEdit = () => {
    if (!industry) {
      return;
    }

    setFormData({
      company_name: industry.company_name || "",
      contact_person: industry.contact_person || "",
      mobile: industry.mobile || "",
      gst_number: industry.gst_number || "",
      gpcb_id: industry.gpcb_id || "",
      plan: industry.plan || "",
      trial_start_date:
        industry.trial_start_date || "",
      trial_expiry_date:
        industry.trial_expiry_date || "",
    });

    setErrorMessage("");
    setSuccessMessage("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (!industry) {
      return;
    }

    setFormData({
      company_name: industry.company_name || "",
      contact_person: industry.contact_person || "",
      mobile: industry.mobile || "",
      gst_number: industry.gst_number || "",
      gpcb_id: industry.gpcb_id || "",
      plan: industry.plan || "",
      trial_start_date:
        industry.trial_start_date || "",
      trial_expiry_date:
        industry.trial_expiry_date || "",
    });

    setErrorMessage("");
    setSuccessMessage("");
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!industry) {
      return;
    }

    if (!formData.company_name.trim()) {
      setErrorMessage("Company Name is required.");
      return;
    }

    if (
      formData.trial_start_date &&
      formData.trial_expiry_date &&
      formData.trial_expiry_date <
        formData.trial_start_date
    ) {
      setErrorMessage(
        "Trial Expiry Date cannot be earlier than Trial Start Date."
      );
      return;
    }

    setSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { data, error } = await supabase
      .from("industry_profiles")
      .update({
        company_name:
          formData.company_name.trim(),
        contact_person:
          formData.contact_person.trim() || null,
        mobile: formData.mobile.trim() || null,
        gst_number:
          formData.gst_number.trim() || null,
        gpcb_id:
          formData.gpcb_id.trim() || null,
        plan: formData.plan.trim() || null,
        trial_start_date:
          formData.trial_start_date || null,
        trial_expiry_date:
          formData.trial_expiry_date || null,
      })
      .eq("id", industry.id)
      .select(
        "id, user_id, company_name, contact_person, mobile, email, gst_number, gpcb_id, plan, account_status, trial_start_date, trial_expiry_date, created_at, updated_at"
      )
      .single();

    if (error) {
      console.error(
        "Failed to update industry profile:",
        error
      );

      setErrorMessage(
        "Unable to save industry details. Please try again."
      );

      setSaving(false);
      return;
    }

    setIndustry(data);

    setFormData({
      company_name: data.company_name || "",
      contact_person: data.contact_person || "",
      mobile: data.mobile || "",
      gst_number: data.gst_number || "",
      gpcb_id: data.gpcb_id || "",
      plan: data.plan || "",
      trial_start_date:
        data.trial_start_date || "",
      trial_expiry_date:
        data.trial_expiry_date || "",
    });

    setIsEditing(false);
    setSuccessMessage(
      "Industry details updated successfully."
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
        Loading industry details...
      </div>
    );
  }

  if (errorMessage && !industry) {
    return (
      <div>
        <button
          onClick={() =>
            router.push("/super-admin/industry")
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
          ← Back to Industry Management
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
          {errorMessage || "Industry not found."}
        </div>
      </div>
    );
  }

  if (!industry) {
    return null;
  }

  const editableFields = [
    {
      label: "Company Name",
      key: "company_name",
      type: "text",
    },
    {
      label: "Contact Person",
      key: "contact_person",
      type: "text",
    },
    {
      label: "Mobile",
      key: "mobile",
      type: "text",
    },
    {
      label: "GST Number",
      key: "gst_number",
      type: "text",
    },
    {
      label: "GPCB ID",
      key: "gpcb_id",
      type: "text",
    },
    {
      label: "Plan",
      key: "plan",
      type: "text",
    },
    {
      label: "Trial Start Date",
      key: "trial_start_date",
      type: "date",
    },
    {
      label: "Trial Expiry Date",
      key: "trial_expiry_date",
      type: "date",
    },
  ] as const;

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
            Industry Details
          </h1>

          <p
            style={{
              marginTop: 8,
              color: "#64748b",
            }}
          >
            View and manage industry account information.
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
              router.push("/super-admin/industry")
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

          {!isEditing && (
            <button
              onClick={handleEdit}
              style={{
                border: "none",
                background: "#0B4F6C",
                color: "#ffffff",
                padding: "10px 18px",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Edit Industry
            </button>
          )}
        </div>
      </div>

      {successMessage && (
        <div
          style={{
            background: "#dcfce7",
            color: "#166534",
            border: "1px solid #bbf7d0",
            borderRadius: 10,
            padding: "12px 16px",
            marginBottom: 20,
          }}
        >
          {successMessage}
        </div>
      )}

      {errorMessage && industry && (
        <div
          style={{
            background: "#fee2e2",
            color: "#b91c1c",
            border: "1px solid #fecaca",
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
              {industry.company_name || "-"}
            </h2>

            <p
              style={{
                margin: "8px 0 0",
                color: "#64748b",
              }}
            >
              Industry Account
            </p>
          </div>

          <span
            style={{
              display: "inline-block",
              padding: "7px 14px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              background:
                industry.account_status === "ACTIVE"
                  ? "#dcfce7"
                  : "#f1f5f9",
              color:
                industry.account_status === "ACTIVE"
                  ? "#166534"
                  : "#475569",
            }}
          >
            {industry.account_status || "-"}
          </span>
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
        <h2
          style={{
            margin: 0,
            color: "#0B4F6C",
            fontSize: 20,
          }}
        >
          Portal User
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
            marginTop: 18,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                color: "#64748b",
                marginBottom: 6,
              }}
            >
              User Email
            </div>

            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#0f172a",
                wordBreak: "break-word",
              }}
            >
              {portalUser?.email || "-"}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                color: "#64748b",
                marginBottom: 6,
              }}
            >
              User Role
            </div>

            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#0f172a",
              }}
            >
              {portalUser?.role || "-"}
            </div>
          </div>
        </div>
      </div>

      {!isEditing ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {[
            ["Company Name", industry.company_name],
            ["Contact Person", industry.contact_person],
            ["Mobile", industry.mobile],
            ["Email", industry.email],
            ["GST Number", industry.gst_number],
            ["GPCB ID", industry.gpcb_id],
            ["Plan", industry.plan],
            ["Account Status", industry.account_status],
            [
              "Trial Start Date",
              formatDate(industry.trial_start_date),
            ],
            [
              "Trial Expiry Date",
              formatDate(industry.trial_expiry_date),
            ],
            [
              "Created At",
              formatDate(industry.created_at),
            ],
            [
              "Updated At",
              formatDate(industry.updated_at),
            ],
          ].map(([label, value]) => (
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
      ) : (
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
          <h2
            style={{
              margin: 0,
              color: "#0B4F6C",
              fontSize: 20,
            }}
          >
            Edit Industry Account
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 18,
              marginTop: 22,
            }}
          >
            {editableFields.map((field) => (
              <div key={field.key}>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#334155",
                    marginBottom: 7,
                  }}
                >
                  {field.label}
                </label>

                <input
                  type={field.type}
                  value={formData[field.key]}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      [field.key]: event.target.value,
                    }))
                  }
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "11px 12px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius: 8,
                    fontSize: 14,
                    outline: "none",
                  }}
                />
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 24,
              paddingTop: 20,
              borderTop:
                "1px solid #e2e8f0",
            }}
          >
            <button
              onClick={handleCancel}
              disabled={saving}
              style={{
                border:
                  "1px solid #cbd5e1",
                background: "#ffffff",
                color: "#334155",
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
                  : "#16a34a",
                color: "#ffffff",
                padding: "10px 20px",
                borderRadius: 8,
                cursor: saving
                  ? "not-allowed"
                  : "pointer",
                fontWeight: 600,
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
            )}

      {/* Subscription & Payment Management */}

      {!isEditing && (
        <div
          style={{
            marginTop: 24,
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            padding: 24,
            boxShadow:
              "0 4px 14px rgba(15,23,42,0.05)",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#0B4F6C",
              fontSize: 20,
            }}
          >
            Subscription & Payment Management
          </h2>

          <p
            style={{
              marginTop: 6,
              color: "#64748b",
              fontSize: 14,
            }}
          >
            Manage this industry&apos;s paid subscription
            and payment status.
          </p>

          {/* Current Subscription */}

          <div
            style={{
              marginTop: 20,
              padding: 18,
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "#64748b",
                marginBottom: 6,
              }}
            >
              Current Subscription
            </div>

            <div
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              {subscription?.plan_name || industry.plan || "FREE_TRIAL"}
            </div>

            <div
              style={{
                marginTop: 6,
                color: "#64748b",
                fontSize: 13,
              }}
            >
              {subscription
                ? `₹${Number(
                    subscription.amount || 0
                  ).toLocaleString("en-IN")} • ${
                    subscription.status || "Active"
                  }`
                : "No paid subscription record yet"}
            </div>
          </div>

          {/* Paid Plans */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
              marginTop: 20,
            }}
          >
            <button
              type="button"
              onClick={() =>
                setSelectedPlan("MONTHLY")
              }
              style={{
                textAlign: "left",
                background: "#ffffff",
                border:
                  selectedPlan === "MONTHLY"
                    ? "2px solid #16a34a"
                    : "1px solid #cbd5e1",
                borderRadius: 12,
                padding: 20,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#64748b",
                }}
              >
                MONTHLY PLAN
              </div>

              <div
                style={{
                  marginTop: 8,
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#0B4F6C",
                }}
              >
                ₹599
              </div>

              <div
                style={{
                  marginTop: 4,
                  fontSize: 13,
                  color: "#64748b",
                }}
              >
                Per Month
              </div>
            </button>

            <button
              type="button"
              onClick={() =>
                setSelectedPlan("SIX_MONTHS")
              }
              style={{
                textAlign: "left",
                background: "#ffffff",
                border:
                  selectedPlan === "SIX_MONTHS"
                    ? "2px solid #16a34a"
                    : "1px solid #cbd5e1",
                borderRadius: 12,
                padding: 20,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#64748b",
                }}
              >
                6 MONTH PLAN
              </div>

              <div
                style={{
                  marginTop: 8,
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#0B4F6C",
                }}
              >
                ₹3,594
              </div>

              <div
                style={{
                  marginTop: 4,
                  fontSize: 13,
                  color: "#64748b",
                }}
              >
                ₹599 × 6 Months
              </div>
            </button>
          </div>

<div
  style={{
    marginTop: 20,
    display: "flex",
    justifyContent: "flex-end",
  }}
>
  <button
    type="button"
    onClick={handleCreateSubscription}
    disabled={saving}
    style={{
      border: "none",
      background: saving
        ? "#94a3b8"
        : "#0B4F6C",
      color: "#ffffff",
      padding: "12px 22px",
      borderRadius: 9,
      cursor: saving
        ? "not-allowed"
        : "pointer",
      fontWeight: 700,
      fontSize: 14,
    }}
  >
    {saving
      ? "Creating..."
      : "Create Subscription"}
  </button>
</div>

          {/* Payment Details */}

<div
  style={{
    marginTop: 20,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 20,
  }}
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(220px, 1fr))",
      gap: 16,
    }}
  >
    <div>
      <div
        style={{
          fontSize: 12,
          color: "#64748b",
          marginBottom: 6,
        }}
      >
        Selected Plan
      </div>

      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#0f172a",
        }}
      >
        {subscription?.plan_name
          ? subscription.plan_name === "SIX_MONTHS"
            ? "6 Months"
            : "Monthly"
          : selectedPlan === "MONTHLY"
          ? "Monthly"
          : "6 Months"}
      </div>
    </div>

    <div>
      <div
        style={{
          fontSize: 12,
          color: "#64748b",
          marginBottom: 6,
        }}
      >
        Subscription Amount
      </div>

      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "#0B4F6C",
        }}
      >
        ₹
        {Number(
          subscription?.amount ?? selectedAmount
        ).toLocaleString("en-IN")}
      </div>
    </div>

    <div>
      <div
        style={{
          fontSize: 12,
          color: "#64748b",
          marginBottom: 6,
        }}
      >
        Payment Status
      </div>

      <div
        style={{
          fontSize: 15,
          fontWeight: 700,
          color:
            payment?.payment_status === "Paid"
              ? "#166534"
              : "#b45309",
        }}
      >
        {payment?.payment_status || "Pending"}
      </div>
    </div>
  </div>

  {payment && (
    <>
      <div
        style={{
          marginTop: 20,
          paddingTop: 20,
          borderTop: "1px solid #e2e8f0",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: 12,
              color: "#64748b",
              marginBottom: 6,
            }}
          >
            Payment Date
          </label>

          <input
            type="date"
            value={paymentDate}
            disabled={
              payment.payment_status === "Paid" ||
              saving
            }
            onChange={(event) =>
              setPaymentDate(event.target.value)
            }
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "10px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: 8,
              background: "#ffffff",
              fontSize: 14,
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontSize: 12,
              color: "#64748b",
              marginBottom: 6,
            }}
          >
            Payment Method
          </label>

          <select
            value={paymentMethod}
            disabled={
              payment.payment_status === "Paid" ||
              saving
            }
            onChange={(event) =>
              setPaymentMethod(event.target.value)
            }
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "10px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: 8,
              background: "#ffffff",
              fontSize: 14,
            }}
          >
            <option value="">
              Select Payment Method
            </option>
            <option value="UPI">UPI</option>
            <option value="Bank Transfer">
              Bank Transfer
            </option>
            <option value="Cash">Cash</option>
            <option value="Cheque">Cheque</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontSize: 12,
              color: "#64748b",
              marginBottom: 6,
            }}
          >
            Invoice No.
          </label>

          <input
            type="text"
            value={invoiceNo}
            disabled={
              payment.payment_status === "Paid" ||
              saving
            }
            placeholder="Invoice Number"
            onChange={(event) =>
              setInvoiceNo(event.target.value)
            }
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "10px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: 8,
              background: "#ffffff",
              fontSize: 14,
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: 12,
            color: "#64748b",
            marginBottom: 6,
          }}
        >
          Payment Remarks
        </label>

        <textarea
          value={paymentRemarks}
          disabled={
            payment.payment_status === "Paid" ||
            saving
          }
          placeholder="Payment remarks"
          onChange={(event) =>
            setPaymentRemarks(event.target.value)
          }
          style={{
            width: "100%",
            minHeight: 80,
            boxSizing: "border-box",
            padding: "10px 12px",
            border: "1px solid #cbd5e1",
            borderRadius: 8,
            background: "#ffffff",
            fontSize: 14,
            resize: "vertical",
          }}
        />
      </div>

      {payment.payment_status !== "Paid" && (
        <div
          style={{
            marginTop: 18,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            onClick={handleMarkPaymentPaid}
            disabled={saving}
            style={{
              border: "none",
              background: saving
                ? "#94a3b8"
                : "#16a34a",
              color: "#ffffff",
              padding: "12px 22px",
              borderRadius: 9,
              cursor: saving
                ? "not-allowed"
                : "pointer",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {saving
              ? "Updating..."
              : "Mark Payment as PAID"}
          </button>
        </div>
      )}
    </>
  )}
</div>
</div>
)}
</div>
  );
}