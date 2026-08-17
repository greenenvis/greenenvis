"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/supabase";

export default function SuperAdminDashboard() {
  const [industryCount, setIndustryCount] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [totalOrganizations, setTotalOrganizations] = useState<number | null>(null);
  const [totalDocuments, setTotalDocuments] = useState<number | null>(null);
  const [totalNotifications, setTotalNotifications] = useState<number | null>(null);
  const [totalCompliance, setTotalCompliance] = useState<number | null>(null);
  const [totalWorkRecords, setTotalWorkRecords] = useState<number | null>(null);
  const [totalComplianceReminders, setTotalComplianceReminders] =
  useState<number | null>(null);
  const [totalAnnualReturns, setTotalAnnualReturns] =
  useState<number | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
const loadIndustryCount = async () => {

// Supabase client automatically uses the active authenticated session.
// Dashboard counts are protected by existing RLS policies.

const { count, error } = await supabase
  .from("profiles")
  .select("*", { count: "exact", head: true })
  .eq("role", "industry");

if (error) {
  console.error("Failed to load industry count:", error);
  setIndustryCount(0);
} else {
  setIndustryCount(count ?? 0);
}

const { count: userCount, error: userCountError } = await supabase
  .from("profiles")
  .select("*", { count: "exact", head: true });

if (userCountError) {
  console.error("Failed to load total user count:", userCountError);
  setTotalUsers(0);
} else {
  setTotalUsers(userCount ?? 0);
}
const {
  count: organizationCount,
  error: organizationCountError,
} = await supabase
  .from("organizations")
  .select("*", { count: "exact", head: true });

if (organizationCountError) {
  console.error(
    "Failed to load organization count:",
    organizationCountError
  );
  setTotalOrganizations(0);
} else {
  setTotalOrganizations(organizationCount ?? 0);
}

const {
  count: documentCount,
  error: documentCountError,
} = await supabase
  .from("documents")
  .select("*", { count: "exact", head: true });

if (documentCountError) {
  console.error(
    "Failed to load document count:",
    documentCountError
  );
  setTotalDocuments(0);
} else {
  setTotalDocuments(documentCount ?? 0);
}

const {
  count: notificationCount,
  error: notificationCountError,
} = await supabase
  .from("notifications")
  .select("*", { count: "exact", head: true });

if (notificationCountError) {
  console.error(
    "Failed to load notification count:",
    notificationCountError
  );
  setTotalNotifications(0);
} else {
  setTotalNotifications(notificationCount ?? 0);
}

const {
  count: complianceCount,
  error: complianceCountError,
} = await supabase
  .from("compliance_master")
  .select("*", { count: "exact", head: true });

if (complianceCountError) {
  console.error(
    "Failed to load compliance count:",
    complianceCountError
  );
  setTotalCompliance(0);
} else {
  setTotalCompliance(complianceCount ?? 0);
}

const {
  count: workRecordCount,
  error: workRecordCountError,
} = await supabase
  .from("work_records")
  .select("*", { count: "exact", head: true });

if (workRecordCountError) {
  console.error(
    "Failed to load work record count:",
    workRecordCountError
  );
  setTotalWorkRecords(0);
} else {
  setTotalWorkRecords(workRecordCount ?? 0);
}

const {
  count: complianceReminderCount,
  error: complianceReminderCountError,
} = await supabase
  .from("compliance_reminders")
  .select("*", { count: "exact", head: true });

if (complianceReminderCountError) {
  console.error(
    "Failed to load compliance reminder count:",
    complianceReminderCountError
  );
  setTotalComplianceReminders(0);
} else {
  setTotalComplianceReminders(
    complianceReminderCount ?? 0
  );
}

const { count: bmwCount, error: bmwError } = await supabase
  .from("annual_return_bmw")
  .select("*", { count: "exact", head: true });

const { count: ewasteCount, error: ewasteError } = await supabase
  .from("annual_return_ewaste")
  .select("*", { count: "exact", head: true });

const {
  count: generalIndustryCount,
  error: generalIndustryError,
} = await supabase
  .from("annual_return_general_industry")
  .select("*", { count: "exact", head: true });

if (bmwError || ewasteError || generalIndustryError) {
  console.error("Failed to load annual return counts:", {
    bmwError,
    ewasteError,
    generalIndustryError,
  });

  setTotalAnnualReturns(0);
} else {
  setTotalAnnualReturns(
    (bmwCount ?? 0) +
      (ewasteCount ?? 0) +
      (generalIndustryCount ?? 0)
  );
}

setLoading(false);

};

    loadIndustryCount();
}, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1
        style={{
          margin: 0,
          fontSize: "28px",
          color: "#0f172a",
        }}
      >
        GreenEnvis Super Admin Dashboard
      </h1>

      <p
        style={{
          marginTop: 8,
          color: "#64748b",
        }}
      >
        System overview and administration
      </p>

      <div
        style={{
          marginTop: 30,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          maxWidth: 1100,
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            padding: 24,
            boxShadow: "0 4px 14px rgba(15,23,42,0.06)",
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: "#64748b",
              marginBottom: 10,
            }}
          >
            Total Industries
          </div>

          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#0B4F6C",
            }}
          >
            {loading ? "..." : industryCount}
          </div>

          <div
            style={{
              marginTop: 8,
              fontSize: 12,
              color: "#94a3b8",
            }}
          >
            Registered industry users
          </div>
        </div>
        <div

  style={{
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 4px 14px rgba(15,23,42,0.06)",
  }}
>
  <div
    style={{
      fontSize: 14,
      color: "#64748b",
      marginBottom: 10,
    }}
  >
    Total Registered Users
  </div>

  <div
    style={{
      fontSize: 32,
      fontWeight: 700,
      color: "#0B4F6C",
    }}
  >
    {loading ? "..." : totalUsers}
  </div>

  <div
    style={{
      marginTop: 8,
      fontSize: 12,
      color: "#94a3b8",
    }}
  >
    All registered portal users
  </div>
</div>

<div
  style={{
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 4px 14px rgba(15,23,42,0.06)",
  }}
>
  <div
    style={{
      fontSize: 14,
      color: "#64748b",
      marginBottom: 10,
    }}
  >
    Total Organizations
  </div>

  <div
    style={{
      fontSize: 32,
      fontWeight: 700,
      color: "#0B4F6C",
    }}
  >
    {loading ? "..." : totalOrganizations}
  </div>

  <div
    style={{
      marginTop: 8,
      fontSize: 12,
      color: "#94a3b8",
    }}
  >
    Registered organizations
  </div>
</div>
<div
  style={{
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 4px 14px rgba(15,23,42,0.06)",
  }}
>
  <div
    style={{
      fontSize: 14,
      color: "#64748b",
      marginBottom: 10,
    }}
  >
    Total Documents
  </div>

  <div
    style={{
      fontSize: 32,
      fontWeight: 700,
      color: "#0B4F6C",
    }}
  >
    {loading ? "..." : totalDocuments}
  </div>

  <div
    style={{
      marginTop: 8,
      fontSize: 12,
      color: "#94a3b8",
    }}
  >
    Documents stored in portal
  </div>
</div>

<div
  style={{
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 4px 14px rgba(15,23,42,0.06)",
  }}
>
  <div
    style={{
      fontSize: 14,
      color: "#64748b",
      marginBottom: 10,
    }}
  >
    Total Notifications
  </div>

  <div
    style={{
      fontSize: 32,
      fontWeight: 700,
      color: "#0B4F6C",
    }}
  >
    {loading ? "..." : totalNotifications}
  </div>

  <div
    style={{
      marginTop: 8,
      fontSize: 12,
      color: "#94a3b8",
    }}
  >
    Notifications in portal
  </div>
</div>
<div
  style={{
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 4px 14px rgba(15,23,42,0.06)",
  }}
>
  <div
    style={{
      fontSize: 14,
      color: "#64748b",
      marginBottom: 10,
    }}
  >
    Total Compliance
  </div>

  <div
    style={{
      fontSize: 32,
      fontWeight: 700,
      color: "#0B4F6C",
    }}
  >
    {loading ? "..." : totalCompliance}
  </div>

  <div
    style={{
      marginTop: 8,
      fontSize: 12,
      color: "#94a3b8",
    }}
  >
    Compliance records in system
  </div>
</div>

<div
  style={{
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 4px 14px rgba(15,23,42,0.06)",
  }}
>
  <div
    style={{
      fontSize: 14,
      color: "#64748b",
      marginBottom: 10,
    }}
  >
    Total Work Records
  </div>

  <div
    style={{
      fontSize: 32,
      fontWeight: 700,
      color: "#0B4F6C",
    }}
  >
    {loading ? "..." : totalWorkRecords}
  </div>

  <div
    style={{
      marginTop: 8,
      fontSize: 12,
      color: "#94a3b8",
    }}
  >
    Work records in system
  </div>
</div>

<div
  style={{
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 4px 14px rgba(15,23,42,0.06)",
  }}
>
  <div
    style={{
      fontSize: 14,
      color: "#64748b",
      marginBottom: 10,
    }}
  >
    Compliance Reminders
  </div>

  <div
    style={{
      fontSize: 32,
      fontWeight: 700,
      color: "#0B4F6C",
    }}
  >
    {loading ? "..." : totalComplianceReminders}
  </div>

  <div
    style={{
      marginTop: 8,
      fontSize: 12,
      color: "#94a3b8",
    }}
  >
    Compliance reminders in system
  </div>
</div>
<div
  style={{
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 4px 14px rgba(15,23,42,0.06)",
  }}
>
  <div
    style={{
      fontSize: 14,
      color: "#64748b",
      marginBottom: 10,
    }}
  >
    Total Annual Returns
  </div>

  <div
    style={{
      fontSize: 32,
      fontWeight: 700,
      color: "#0B4F6C",
    }}
  >
    {loading ? "..." : totalAnnualReturns}
  </div>

  <div
    style={{
      marginTop: 8,
      fontSize: 12,
      color: "#94a3b8",
    }}
  >
    BMW, E-Waste & General Industry
  </div>
</div>

        </div>
      </div>
  );
}
