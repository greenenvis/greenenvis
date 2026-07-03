"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabase";

export default function ComplianceTrackerPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [compliances, setCompliances] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: profileData } = await supabase
      .from("industry_profile")
      .select("*")
      .limit(1)
      .single();

    setProfile(profileData);

    const { data: complianceData } = await supabase
      .from("compliance_master")
      .select("*")
      .eq("is_active", true);

    setCompliances(complianceData || []);

    const { data: documentData } = await supabase
      .from("industry_documents")
      .select("*");

    setDocuments(documentData || []);
  };

  const getDocument = (documentName: string) => {
    return documents.find(
      (d) => d.document_name === documentName
    );
  };

  const getStatus = (
  documentName: string,
  reminderDays: number = 30
) => {
    const doc = getDocument(documentName);

    if (!doc)
      return {
        status: "Missing",
        color: "#6b7280",
      };

    if (!doc.valid_upto)
      return {
        status: "Pending",
        color: "#f59e0b",
      };

    const expiry = new Date(doc.valid_upto);
    const today = new Date();

    const diffDays = Math.ceil(
      (expiry.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0)
      return {
        status: "Overdue",
        color: "#dc2626",
      };

    if (diffDays <= reminderDays)
      return {
        status: "Upcoming",
        color: "#d97706",
      };

    return {
      status: "Active",
      color: "#16a34a",
    };
  };

  return (
  <div style={{ padding: 30 }}>
  <h1>Compliance Tracker</h1>

  <p
    style={{
      color: "#666",
      marginTop: 8,
      marginBottom: 25,
    }}
  >
    Compliance status is generated automatically from uploaded
    documents and Industry Profile.
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 20,
      marginBottom: 25,
    }}
  >
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: 20,
      }}
    >
      <h4>Total</h4>
      <h2>{compliances.length}</h2>
    </div>

    <div
      style={{
        background: "#ecfdf5",
        border: "1px solid #bbf7d0",
        borderRadius: 10,
        padding: 20,
      }}
    >
      <h4>Active</h4>
      <h2>
        {
          compliances.filter(
            (c) =>
              getStatus(
  c.document_required,
  c.reminder_days
).status ===
              "Active"
          ).length
        }
      </h2>
    </div>

    <div
      style={{
        background: "#fef3c7",
        border: "1px solid #fde68a",
        borderRadius: 10,
        padding: 20,
      }}
    >
      <h4>Upcoming</h4>
      <h2>
        {
          compliances.filter(
            (c) =>
              getStatus(
  c.document_required,
  c.reminder_days
).status ===
              "Upcoming"
          ).length
        }
      </h2>
    </div>

    <div
      style={{
        background: "#fee2e2",
        border: "1px solid #fecaca",
        borderRadius: 10,
        padding: 20,
      }}
    >
      <h4>Overdue</h4>
      <h2>
        {
          compliances.filter(
            (c) =>
              getStatus(
  c.document_required,
  c.reminder_days
).status ===
              "Overdue"
          ).length
        }
      </h2>
    </div>
  </div>

  <div
    style={{
      background: "#fff",
      borderRadius: 10,
      padding: 20,
      border: "1px solid #ddd",
    }}
  >
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead
        style={{
          background: "#166534",
          color: "#fff",
        }}
      >
        <tr>
          <th style={{ padding: 12 }}>Compliance</th>
          <th style={{ padding: 12 }}>Document</th>
          <th style={{ padding: 12 }}>Frequency</th>
          <th style={{ padding: 12 }}>Due Date</th>
          <th style={{ padding: 12 }}>Status</th>
          <th style={{ padding: 12 }}>Action</th>
        </tr>
      </thead>

      <tbody>
        {compliances
  .filter((c) => {
    if (!profile) return false;

    switch (c.applicable_field) {
      case "hazardous_waste":
        return profile.hazardous_waste;

      case "plastic_epr":
        return profile.plastic_epr;

      case "ewaste_epr":
        return profile.ewaste_epr;

      case "used_oil_epr":
        return profile.used_oil_epr;

      case "battery_epr":
        return profile.battery_epr;

      case "tyre_epr":
        return profile.tyre_epr;

      case "cgwa_noc":
        return profile.cgwa_noc;

      case "factory_license":
        return profile.factory_license;

      case "fire_noc":
        return profile.fire_noc;

      case "consent":
        return true;

      default:
        return false;
    }
  })
  .map((item) => {
    const status = getStatus(
  item.document_required,
  item.reminder_days
);
    const document = getDocument(item.document_required);

    return (
      <tr key={item.id}>
        <td style={{ padding: 12 }}>
          {item.compliance_name}
        </td>

        <td style={{ padding: 12 }}>
          {item.document_required}
        </td>

        <td style={{ padding: 12 }}>
          {item.frequency}
        </td>

        <td style={{ padding: 12 }}>
        {item.is_renewal
  ? (
      document?.valid_upto
        ? new Date(
            document.valid_upto
          ).toLocaleDateString("en-GB")
        : "-"
    )
  : (
      item.due_month || "-"
    )}
        </td>

        <td style={{ padding: 12 }}>
          <span
            style={{
              background: status.color + "20",
              color: status.color,
              padding: "5px 10px",
              borderRadius: 20,
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            {status.status}
          </span>
        </td>

        <td style={{ padding: 12 }}>
          <button
            style={{
              background: "#166534",
              color: "#fff",
              border: "none",
              padding: "6px 14px",
              borderRadius: 6,
              cursor: "pointer",
            }}
            onClick={() =>
              router.push(
                `/dashboard/compliance-tracker/details?id=${item.id}`
              )
            }
          >
            View
          </button>
        </td>
      </tr>
    );
  })}
        </tbody>
    </table>
  </div>
</div>
  );
}