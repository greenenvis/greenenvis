"use client";

import { useRouter } from "next/navigation";

export default function AnnualReturnPage() {
  const router = useRouter();

  const forms = [
    {
      title: "Form-4 (General Industry)",
      description:
        "Annual Return under Hazardous and Other Wastes Rules for General Industries.",
      icon: "🏭",
      route: "/annual-return/general-industry",
    },
    {
      title: "Form-4 (BMW Facility)",
      description:
        "Annual Return for Biomedical Waste Treatment Facilities and HCFs.",
      icon: "🏥",
      route: "/annual-return/bmw",
    },
    {
      title: "Form-3 (E-Waste Industry)",
      description:
        "Annual Return under E-Waste Management Rules.",
      icon: "💻",
      route: "/annual-return/e-waste",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "30px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        }}
      >
        <h1
          style={{
            color: "#065f46",
            marginBottom: "10px",
          }}
        >
          Annual Return Filing
        </h1>

        <p
          style={{
            color: "#64748b",
          }}
        >
          Select the applicable annual return format for your industry.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
          gap: "20px",
        }}
      >
        {forms.map((form, index) => (
          <div
            key={index}
            onClick={() => router.push(form.route)}
            style={{
              background: "#ffffff",
              padding: "25px",
              borderRadius: "15px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                fontSize: "45px",
                marginBottom: "15px",
              }}
            >
              {form.icon}
            </div>

            <h2
              style={{
                color: "#065f46",
                marginBottom: "10px",
              }}
            >
              {form.title}
            </h2>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.6",
              }}
            >
              {form.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}