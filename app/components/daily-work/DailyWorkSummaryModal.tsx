"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type DailyWorkSummaryModalProps = {
  open: boolean;
  onClose: () => void;
  records: any[];
};

export default function DailyWorkSummaryModal({
  open,
  onClose,
  records,
}: DailyWorkSummaryModalProps) {   
console.log("COMPONENT RECORDS =", records);    
const [summaryType, setSummaryType] = useState("daily");
const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");
const [preparedBy, setPreparedBy] = useState("");
const [showPreview, setShowPreview] = useState(false);
const router = useRouter();

const technicalWorks = (records ?? []).filter(
  (item) => item.inquiry_type !== "Office Work"
);

const officeWorks = (records ?? []).filter(
  (item) => item.inquiry_type === "Office Work"
);

const handleGenerateSummary = () => {
  const today = new Date();

console.log("TODAY =", today.toISOString());
console.log("ALL RECORDS =", records);

let filteredSummaryRecords = [...records];

if (summaryType === "daily") {
const todayString = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
)
  .toISOString()
  .split("T")[0];

filteredSummaryRecords = records.filter((item: any) => {
  console.log("DB DATE =", item.inquiry_date);

  return item.inquiry_date === todayString;
});

console.log("FILTERED RECORDS =", filteredSummaryRecords);
}

  if (summaryType === "weekly") {
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    filteredSummaryRecords = records.filter((item: any) => {
      const d = new Date(item.inquiry_date);
      return d >= start && d <= end;
    });
  }

  if (summaryType === "monthly") {
    filteredSummaryRecords = records.filter((item: any) => {
      const d = new Date(item.inquiry_date);

      return (
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    });
  }

  if (summaryType === "custom") {
    filteredSummaryRecords = records.filter((item: any) => {
      return (
        item.inquiry_date >= fromDate &&
        item.inquiry_date <= toDate
      );
    });
  }

  sessionStorage.setItem(
    "daily-work-summary",
    JSON.stringify({
      summaryType,
      fromDate,
      toDate,
      preparedBy,
      records: filteredSummaryRecords,
    })
  );

  onClose();

  router.push("/dashboard/daily-work-record/summary");
};

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "1000px",
          maxWidth: "95vw",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>
          📋 Daily Work Summary
        </h2>

        <div style={{ display: "grid", gap: "16px", marginTop: "20px" }}>
  <div>
    <label style={{ display: "block", fontWeight: 600, marginBottom: "6px" }}>
      Summary Type
    </label>

<select
  value={summaryType}
  onChange={(e) => setSummaryType(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
  }}
>
      <option value="daily">Daily Summary</option>
      <option value="weekly">Weekly Summary</option>
      <option value="monthly">Monthly Summary</option>
      <option value="custom">Custom Date Range</option>
    </select>
  </div>

{summaryType === "custom" && (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
    }}
  >
    <div>
      <label
        style={{
          display: "block",
          fontWeight: 600,
          marginBottom: "6px",
        }}
      >
        From Date
      </label>

      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
        }}
      />
    </div>

    <div>
      <label
        style={{
          display: "block",
          fontWeight: 600,
          marginBottom: "6px",
        }}
      >
        To Date
      </label>

      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
        }}
      />
    </div>
  </div>
)}
    <div>
  <label
    style={{
      display: "block",
      fontWeight: 600,
      marginBottom: "6px",
    }}
  >
    Prepared By (Optional)
  </label>

  <input
    type="text"
    value={preparedBy}
    onChange={(e) => setPreparedBy(e.target.value)}
    placeholder="e.g. Pratap Vaja"
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #d1d5db",
    }}
  />
</div>
  </div>
</div>
<div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "24px",
  }}
>
  <button
    type="button"
    onClick={onClose}
    style={{
      padding: "10px 18px",
      borderRadius: "8px",
      border: "1px solid #d1d5db",
      background: "#ffffff",
      cursor: "pointer",
    }}
  >
    Cancel
  </button>

  <button
    type="button"
    onClick={handleGenerateSummary}
    style={{
      padding: "10px 18px",
      borderRadius: "8px",
      border: "none",
      background: "#2563eb",
      color: "#ffffff",
      cursor: "pointer",
      fontWeight: 600,
    }}
  >
    Generate Summary
  </button>

</div>

  </div>
)}
