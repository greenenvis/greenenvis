"use client";

import { useEffect, useMemo, useState } from "react";
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

export default function SuperAdminConsultantPage() {
  const [consultants, setConsultants] = useState<
    ConsultantProfile[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
  "ALL" | "ACTIVE" | "INACTIVE"
  >("ALL");

  useEffect(() => {
    const loadConsultants = async () => {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("profiles")
        .select(
          "id, user_id, role, organization_name, contact_person, email, mobile, address, city, state, created_at, is_active, subscription_plan"
        )
        .eq("role", "consultant")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "Failed to load consultants:",
          error
        );

        setConsultants([]);
        setErrorMessage(
          "Unable to load consultant accounts."
        );
      } else {
        setConsultants(data || []);
      }

      setLoading(false);
    };

    loadConsultants();
  }, []);

  const filteredConsultants = useMemo(() => {
  const searchValue = search
    .trim()
    .toLowerCase();

  return consultants.filter((consultant) => {
    const searchableText = [
      consultant.organization_name,
      consultant.contact_person,
      consultant.email,
      consultant.mobile,
      consultant.city,
      consultant.state,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !searchValue ||
      searchableText.includes(searchValue);

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "ACTIVE" &&
        consultant.is_active === true) ||
      (statusFilter === "INACTIVE" &&
        consultant.is_active === false);

    return matchesSearch && matchesStatus;
  });
}, [consultants, search, statusFilter]);

  const totalConsultants = consultants.length;

  const activeConsultants = consultants.filter(
    (consultant) => consultant.is_active === true
  ).length;

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
          Consultant Management
        </h1>

        <p
          style={{
            marginTop: 8,
            color: "#64748b",
          }}
        >
          Manage registered consultant accounts and their
          portal access.
        </p>
      </div>

      {errorMessage && (
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
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 14,
          marginBottom: 16,
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
              fontSize: 12,
              color: "#64748b",
              marginBottom: 8,
            }}
          >
            Total Consultants
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#0B4F6C",
            }}
          >
            {loading ? "..." : totalConsultants}
          </div>

          <div
            style={{
              marginTop: 6,
              fontSize: 12,
              color: "#94a3b8",
            }}
          >
            Registered consultant accounts
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
              fontSize: 12,
              color: "#64748b",
              marginBottom: 8,
            }}
          >
            Active Consultants
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#16a34a",
            }}
          >
            {loading ? "..." : activeConsultants}
          </div>

          <div
            style={{
              marginTop: 6,
              fontSize: 12,
              color: "#94a3b8",
            }}
          >
            Currently active consultant accounts
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          padding: 14,
          marginBottom: 16,
        }}
      >
        <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "minmax(280px, 1fr) 180px",
    gap: 12,
  }}
>
  <input
    type="text"
    value={search}
    onChange={(event) =>
      setSearch(event.target.value)
    }
    placeholder="Search organization, contact, email, mobile..."
    style={{
      width: "100%",
      boxSizing: "border-box",
      padding: "11px 12px",
      border: "1px solid #cbd5e1",
      borderRadius: 8,
      fontSize: 14,
      outline: "none",
    }}
  />

  <select
    value={statusFilter}
    onChange={(event) =>
      setStatusFilter(
        event.target.value as
          | "ALL"
          | "ACTIVE"
          | "INACTIVE"
      )
    }
    style={{
      width: "100%",
      boxSizing: "border-box",
      padding: "11px 12px",
      border: "1px solid #cbd5e1",
      borderRadius: 8,
      fontSize: 14,
      background: "#ffffff",
      color: "#334155",
      outline: "none",
      cursor: "pointer",
    }}
  >
    <option value="ALL">All Statuses</option>
    <option value="ACTIVE">Active</option>
    <option value="INACTIVE">Inactive</option>
  </select>
</div>
      </div>

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow:
            "0 4px 14px rgba(15,23,42,0.05)",
        }}
      >
        <div
          style={{
            padding: "18px 16px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#0B4F6C",
              fontSize: 20,
            }}
          >
            Consultant Accounts
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: 13,
            }}
          >
            {loading
              ? "Loading consultant accounts..."
              : `Showing ${filteredConsultants.length} of ${totalConsultants} consultants`}
          </p>
        </div>

        {loading ? (
          <div
            style={{
              padding: 30,
              textAlign: "center",
              color: "#64748b",
            }}
          >
            Loading consultant accounts...
          </div>
        ) : filteredConsultants.length === 0 ? (
          <div
            style={{
              padding: 40,
              textAlign: "center",
              color: "#64748b",
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#334155",
                marginBottom: 6,
              }}
            >
              No consultant accounts found
            </div>

            <div
              style={{
                fontSize: 13,
              }}
            >
              {search
                ? "No consultant matches your search."
                : "Registered consultants will appear here automatically."}
            </div>
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
                minWidth: 900,
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f8fafc",
                  }}
                >
                  {[
  "Organization",
  "Contact Person",
  "Email",
  "Mobile",
  "Plan",
  "Status",
  "Registered",
  "Action",
].map((heading) => (
                    <th
                      key={heading}
                      style={{
                        textAlign: "left",
                        padding: "12px 14px",
                        borderBottom:
                          "1px solid #e2e8f0",
                        fontSize: 12,
                        color: "#475569",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredConsultants.map(
                  (consultant) => (
                    <tr key={consultant.id}>
                      <td
                        style={{
                          padding: "14px",
                          borderBottom:
                            "1px solid #f1f5f9",
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#0f172a",
                        }}
                      >
                        {consultant.organization_name ||
                          "-"}
                      </td>

                      <td
                        style={{
                          padding: "14px",
                          borderBottom:
                            "1px solid #f1f5f9",
                          fontSize: 14,
                          color: "#334155",
                        }}
                      >
                        {consultant.contact_person ||
                          "-"}
                      </td>

                      <td
                        style={{
                          padding: "14px",
                          borderBottom:
                            "1px solid #f1f5f9",
                          fontSize: 14,
                          color: "#334155",
                        }}
                      >
                        {consultant.email || "-"}
                      </td>

                      <td
                        style={{
                          padding: "14px",
                          borderBottom:
                            "1px solid #f1f5f9",
                          fontSize: 14,
                          color: "#334155",
                        }}
                      >
                        {consultant.mobile || "-"}
                      </td>

                      <td
                        style={{
                          padding: "14px",
                          borderBottom:
                            "1px solid #f1f5f9",
                          fontSize: 13,
                          color: "#334155",
                        }}
                      >
                        {consultant.subscription_plan ||
                          "-"}
                      </td>

                      <td
                        style={{
                          padding: "14px",
                          borderBottom:
                            "1px solid #f1f5f9",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            padding:
                              "5px 10px",
                            borderRadius: 999,
                            fontSize: 11,
                            fontWeight: 700,
                            background:
                              consultant.is_active
                                ? "#dcfce7"
                                : "#f1f5f9",
                            color:
                              consultant.is_active
                                ? "#166534"
                                : "#475569",
                          }}
                        >
                          {consultant.is_active
                            ? "ACTIVE"
                            : "INACTIVE"}
                        </span>
                      </td>

                      <td
                        style={{
                          padding: "14px",
                          borderBottom:
                            "1px solid #f1f5f9",
                          fontSize: 13,
                          color: "#64748b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatDate(
                          consultant.created_at
                        )}
                      </td>
<td
  style={{
    padding: "14px",
    borderBottom:
      "1px solid #f1f5f9",
    whiteSpace: "nowrap",
  }}
>
  <button
    onClick={() =>
      window.location.href =
        `/super-admin/consultant/${consultant.id}`
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
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}