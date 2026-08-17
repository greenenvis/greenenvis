"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/app/supabase";

type IndustryProfile = {
  id: string;
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
};

export default function SuperAdminIndustryPage() {
  const [industries, setIndustries] = useState<IndustryProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    const loadIndustries = async () => {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("industry_profiles")
        .select(
          "id, company_name, contact_person, mobile, email, gst_number, gpcb_id, plan, account_status, trial_start_date, trial_expiry_date, created_at"
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to load industry profiles:", error);
        setErrorMessage(
          "Unable to load industry accounts. Please try again."
        );
        setIndustries([]);
      } else {
        setIndustries(data ?? []);
      }

      setLoading(false);
    };

    loadIndustries();
  }, []);

  const statusOptions = useMemo(() => {
    const statuses = industries
      .map((industry) => industry.account_status)
      .filter((status): status is string => Boolean(status));

    return Array.from(new Set(statuses)).sort();
  }, [industries]);

  const filteredIndustries = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return industries.filter((industry) => {
      const matchesStatus =
        statusFilter === "ALL" ||
        industry.account_status === statusFilter;

      if (!matchesStatus) {
        return false;
      }

      if (!searchValue) {
        return true;
      }

      return [
        industry.company_name,
        industry.contact_person,
        industry.email,
        industry.mobile,
        industry.gst_number,
        industry.gpcb_id,
      ].some((value) =>
        value?.toLowerCase().includes(searchValue)
      );
    });
  }, [industries, search, statusFilter]);

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

const getSubscriptionStatus = (
  accountStatus: string | null,
  trialExpiryDate: string | null
) => {
  if (accountStatus !== "ACTIVE") {
    return "INACTIVE";
  }

  if (!trialExpiryDate) {
    return "PAYMENT DUE";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiryDate = new Date(
    `${trialExpiryDate}T00:00:00`
  );

  if (Number.isNaN(expiryDate.getTime())) {
    return "PAYMENT DUE";
  }

  if (today <= expiryDate) {
    return "FREE TRIAL";
  }

  return "PAYMENT DUE";
};

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
          Industry Management
        </h1>

        <p
          style={{
            marginTop: 8,
            color: "#64748b",
          }}
        >
          Manage registered industry accounts and their portal access.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            padding: 18,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "#64748b",
              marginBottom: 8,
            }}
          >
            Total Industries
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#0B4F6C",
            }}
          >
            {loading ? "..." : industries.length}
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            padding: 18,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "#64748b",
              marginBottom: 8,
            }}
          >
            Active Industries
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#16a34a",
            }}
          >
            {loading
              ? "..."
              : industries.filter(
                  (industry) =>
                    industry.account_status === "ACTIVE"
                ).length}
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          padding: 20,
          marginBottom: 20,
          boxShadow: "0 4px 14px rgba(15,23,42,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Search company, contact, email, mobile..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={{
              flex: "1 1 320px",
              minWidth: 220,
              padding: "11px 14px",
              border: "1px solid #cbd5e1",
              borderRadius: 8,
              outline: "none",
              fontSize: 14,
            }}
          />

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            style={{
              minWidth: 180,
              padding: "11px 14px",
              border: "1px solid #cbd5e1",
              borderRadius: 8,
              background: "#ffffff",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            <option value="ALL">All Statuses</option>

            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 4px 14px rgba(15,23,42,0.05)",
        }}
      >
        <div
          style={{
            padding: "18px 20px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 19,
                color: "#0B4F6C",
              }}
            >
              Industry Accounts
            </h2>

            <p
              style={{
                margin: "6px 0 0",
                fontSize: 13,
                color: "#64748b",
              }}
            >
              Showing {filteredIndustries.length} of{" "}
              {industries.length} industries
            </p>
          </div>
        </div>

        {loading ? (
          <div
            style={{
              padding: 40,
              textAlign: "center",
              color: "#64748b",
            }}
          >
            Loading industry accounts...
          </div>
        ) : errorMessage ? (
          <div
            style={{
              padding: 40,
              textAlign: "center",
              color: "#dc2626",
            }}
          >
            {errorMessage}
          </div>
        ) : filteredIndustries.length === 0 ? (
          <div
            style={{
              padding: 40,
              textAlign: "center",
              color: "#64748b",
            }}
          >
            No industry accounts found.
          </div>
        ) : (
          <div
            style={{
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: 1050,
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f8fafc",
                  }}
                >
{[
  "Company",
  "Contact Person",
  "Email",
  "Mobile",
  "Plan",
  "Subscription Status",
  "Status",
  "Trial Expiry",
  "Action",
].map((heading) => (
                    <th
                      key={heading}
                      style={{
                        textAlign: "left",
                        padding: "13px 16px",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#475569",
                        borderBottom:
                          "1px solid #e2e8f0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredIndustries.map((industry) => (
                  <tr key={industry.id}>
                    <td
                      style={{
                        padding: "15px 16px",
                        borderBottom:
                          "1px solid #f1f5f9",
                        fontWeight: 600,
                        color: "#0f172a",
                      }}
                    >
                      {industry.company_name || "-"}
                    </td>

                    <td
                      style={{
                        padding: "15px 16px",
                        borderBottom:
                          "1px solid #f1f5f9",
                        color: "#334155",
                      }}
                    >
                      {industry.contact_person || "-"}
                    </td>

                    <td
                      style={{
                        padding: "15px 16px",
                        borderBottom:
                          "1px solid #f1f5f9",
                        color: "#334155",
                      }}
                    >
                      {industry.email || "-"}
                    </td>

                    <td
                      style={{
                        padding: "15px 16px",
                        borderBottom:
                          "1px solid #f1f5f9",
                        color: "#334155",
                      }}
                    >
                      {industry.mobile || "-"}
                    </td>

                    <td
                      style={{
                        padding: "15px 16px",
                        borderBottom:
                          "1px solid #f1f5f9",
                        color: "#334155",
                      }}
                    >
                      {industry.plan || "-"}
                    </td>
<td
  style={{
    padding: "15px 16px",
    borderBottom:
      "1px solid #f1f5f9",
  }}
>
  {(() => {
    const subscriptionStatus =
      getSubscriptionStatus(
        industry.account_status,
        industry.trial_expiry_date
      );

    const isTrial =
      subscriptionStatus === "FREE TRIAL";

    const isPaymentDue =
      subscriptionStatus === "PAYMENT DUE";

    return (
      <span
        style={{
          display: "inline-block",
          padding: "5px 10px",
          borderRadius: 999,
          fontSize: 11,
          fontWeight: 700,
          background: isTrial
            ? "#dcfce7"
            : isPaymentDue
            ? "#fee2e2"
            : "#f1f5f9",
          color: isTrial
            ? "#166534"
            : isPaymentDue
            ? "#991b1b"
            : "#475569",
          whiteSpace: "nowrap",
        }}
      >
        {subscriptionStatus}
      </span>
    );
  })()}
</td>

      <td
        style={{
            padding: "15px 16px",
            borderBottom:
            "1px solid #f1f5f9",
                }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          padding: "5px 10px",
                          borderRadius: 999,
                          fontSize: 11,
                          fontWeight: 700,
                          background:
                            industry.account_status ===
                            "ACTIVE"
                              ? "#dcfce7"
                              : "#f1f5f9",
                          color:
                            industry.account_status ===
                            "ACTIVE"
                              ? "#166534"
                              : "#475569",
                        }}
                      >
                        {industry.account_status || "-"}
                      </span>
                    </td>

                    <td
                      style={{
                        padding: "15px 16px",
                        borderBottom:
                          "1px solid #f1f5f9",
                        color: "#334155",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatDate(
                        industry.trial_expiry_date
                      )}
                    </td>

<td
  style={{
    padding: "15px 16px",
    borderBottom:
      "1px solid #f1f5f9",
    whiteSpace: "nowrap",
  }}
>
  <button
    onClick={() =>
      window.location.href =
        `/super-admin/industry/${industry.id}`
    }
    style={{
      border: "1px solid #0B4F6C",
      background: "#ffffff",
      color: "#0B4F6C",
      padding: "7px 12px",
      borderRadius: 7,
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 600,
    }}
  >
    View
  </button>
</td>
</tr>
))}
</tbody>
    </table>
          </div>
        )}
      </div>
    </div>
  );
}