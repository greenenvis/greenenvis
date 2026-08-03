type DailyWorkSummaryPreviewProps = {
  summaryType: string;
  preparedBy: string;
  fromDate: string;
  toDate: string;
};

export default function DailyWorkSummaryPreview({
  summaryType,
  preparedBy,
  fromDate,
  toDate,
}: DailyWorkSummaryPreviewProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #d1d5db",
        borderRadius: "12px",
        padding: "24px",
      }}
    >
      <h2 style={{ marginTop: 0 }}>
        📊 Daily Status Report
      </h2>

      <hr />

      <p>
        <strong>Summary Type:</strong> {summaryType}
      </p>

      <p>
        <strong>Date Range:</strong>{" "}
        {summaryType === "custom"
          ? `${fromDate} to ${toDate}`
          : "Auto Calculated"}
      </p>

      {preparedBy.trim() && (
        <p>
          <strong>Prepared By:</strong> {preparedBy}
        </p>
      )}

      <hr />

      <h3>1. Technical Work Done</h3>

      <h3>2. Office / Admin Work Done</h3>

      <h3>3. Next Day Plan</h3>

      <h3>4. Blockers / Issues</h3>
    </div>
  );
}
