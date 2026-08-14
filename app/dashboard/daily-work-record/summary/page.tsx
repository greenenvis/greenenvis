"use client";

import { useEffect, useRef, useState } from "react";
import { generateSummary } from "@/app/components/daily-work/SummaryEngine";
import { supabase } from "@/app/supabase";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable";

export default function DailyWorkSummaryPage() {
const [summaryData, setSummaryData] = useState<any>(null);
const [industryName, setIndustryName] = useState("Work Update");
const reportRef = useRef<HTMLDivElement>(null);

useEffect(() => {
const loadSummary = async () => {
const raw = sessionStorage.getItem(
"daily-work-summary"
);

if (!raw) return;

const data = JSON.parse(raw);
const records = data.records || [];

console.log(
"SUMMARY SESSION DATA =",
data
);
console.log(
"SUMMARY RECORDS =",
records
);
console.table(records);

// Keep existing summary as safe fallback.
let summary = generateSummary(records);

try {
const {
data: { session },
error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error(
          "SESSION ERROR =",
          sessionError
        );
      }

      if (
        session?.access_token &&
        records.length > 0
      ) {
        const response = await fetch(
          "/api/ai/daily-summary",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({
              records,
            }),
          }
        );

        if (response.ok) {
          const aiSummary =
            await response.json();

          if (
            Array.isArray(
              aiSummary.technicalWorkDone
            ) &&
            Array.isArray(
              aiSummary.officeWorkDone
            ) &&
            Array.isArray(
              aiSummary.nextDayPlan
            ) &&
            Array.isArray(
              aiSummary.blockers
            )
          ) {

  // summary = aiSummary;

          console.log(
              "AI DAILY SUMMARY =",
              aiSummary
            );
          }
        } else {
          console.error(
            "AI SUMMARY API ERROR =",
            await response.text()
          );
        }
      }
    } catch (error) {
      console.error(
        "AI SUMMARY CONNECTION ERROR =",
        error
      );
    }

    setSummaryData({
      ...data,
      summary,
    });

    const fetchIndustry = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: industryData } =
        await supabase
          .from("industry_profile")
          .select("industry_name")
          .eq("user_id", user.id)
          .maybeSingle();

      if (industryData?.industry_name) {
        setIndustryName(
          industryData.industry_name
        );
      }
    };

    await fetchIndustry();
  };

  loadSummary();
}, []);

  // 1. WhatsApp Share Function (Fixed String Processing)
  const shareOnWhatsApp = () => {
    if (!summaryData) 
    return;

    const lines = [
      `*${industryName}*`,
      `Work Update - ${new Date().toLocaleDateString("en-GB")}`,
      "",
      `*DAILY STATUS REPORT*`,
      `Summary Type : ${summaryData?.summaryType || "Daily"}`,
      `Prepared By  : ${summaryData?.preparedBy ||  "-"}`,
      "",
      `*1. Technical Work Done*`
    ];

    if (summaryData.summary.technicalWorkDone.length === 0) {
      lines.push("• No technical work available.");
    } else {
      summaryData.summary.technicalWorkDone.forEach((item: string) => {
        lines.push(`• ${item}`);
      });
    }

    lines.push("", `*2. Office / Admin Work Done*`);
    if (summaryData.summary.officeWorkDone.length === 0) {
      lines.push("• No office work available.");
    } else {
      summaryData.summary.officeWorkDone.forEach((item: string) => {
        lines.push(`• ${item}`);
      });
    }

    lines.push("", `*3. Next Day Plan*`);
    if (summaryData.summary.nextDayPlan.length === 0) {
      lines.push("• No next day plan available.");
    } else {
      summaryData.summary.nextDayPlan.forEach((item: string) => {
        lines.push(`• ${item}`);
      });
    }

    lines.push("", `*4. Blockers / Issues*`);
    if (summaryData.summary.blockers.length === 0) {
      lines.push("• No blockers reported.");
    } else {
      summaryData.summary.blockers.forEach((item: string) => {
        lines.push(`• ${item}`);
      });
    }

    const finalMessage = lines.join("\n");
    const encodedMessage = encodeURIComponent(finalMessage);
    window.open(
  `https://wa.me/?text=${encodedMessage}`,
  "_blank"
);
  };

const downloadPDF = async () => {
  if (!reportRef.current) return;

  const canvas = await html2canvas(reportRef.current, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight =
    (canvas.height * pageWidth) / canvas.width;

  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    pageWidth,
    pageHeight
  );

  pdf.save(
    `Daily_Status_Report_${new Date()
      .toISOString()
      .split("T")[0]}.pdf`
  );
};

  // 2. Excel Download Function
  const downloadExcel = () => {
    if (!summaryData) return;

    let html = `
      <table border="1">
        <tr><th colspan="2"><b>${industryName}</b></th></tr>
        <tr><td colspan="2">Work Update - ${new Date().toLocaleDateString("en-GB")}</td></tr>
        <tr><th colspan="2"><b>DAILY STATUS REPORT</b></th></tr>
        <tr><td><b>Summary Type</b></td><td>${summaryData.summaryType || "Daily"}</td></tr>
        <tr><td><b>Prepared By</b></td><td>${summaryData.preparedBy || "-"}</td></tr>
        <tr><td colspan="2"></td></tr>
        <tr><th colspan="2"><b>1. Technical Work Done</b></th></tr>
    `;

    if (summaryData.summary.technicalWorkDone.length === 0) {
      html += `<tr><td colspan="2">No technical work available.</td></tr>`;
    } else {
      summaryData.summary.technicalWorkDone.forEach((item: string) => {
        html += `<tr><td colspan="2">${item}</td></tr>`;
      });
    }

    html += `<tr><th colspan="2"><b>2. Office / Admin Work Done</b></th></tr>`;
    if (summaryData.summary.officeWorkDone.length === 0) {
      html += `<tr><td colspan="2">No office work available.</td></tr>`;
    } else {
      summaryData.summary.officeWorkDone.forEach((item: string) => {
        html += `<tr><td colspan="2">${item}</td></tr>`;
      });
    }

    html += `<tr><th colspan="2"><b>3. Next Day Plan</b></th></tr>`;
    if (summaryData.summary.nextDayPlan.length === 0) {
      html += `<tr><td colspan="2">No next day plan available.</td></tr>`;
    } else {
      summaryData.summary.nextDayPlan.forEach((item: string) => {
        html += `<tr><td colspan="2">${item}</td></tr>`;
      });
    }

    html += `<tr><th colspan="2"><b>4. Blockers / Issues</b></th></tr>`;
    if (summaryData.summary.blockers.length === 0) {
      html += `<tr><td colspan="2">No blockers reported.</td></tr>`;
    } else {
      summaryData.summary.blockers.forEach((item: string) => {
        html += `<tr><td colspan="2">${item}</td></tr>`;
      });
    }

    html += `</table>`;

    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Daily_Status_Report_${new Date().toISOString().split('T')}.xls`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 3. Printing Layout Handler (Fixed Blank Layout Bug)
  const handlePrint = async () => {
  if (!reportRef.current) return;

  const canvas = await html2canvas(reportRef.current, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();

  const pageHeight =
    (canvas.height * pageWidth) / canvas.width;

  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    pageWidth,
    pageHeight
  );

  const blobUrl = pdf.output("bloburl");

  const printWindow = window.open(blobUrl);

  if (printWindow) {
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  }
};

if (!summaryData) {
  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        fontSize: "18px",
      }}
    >
      Loading Summary...
    </div>
  );
}

return (
    <div
      style={{
        maxWidth: "700px",
        margin: "30px auto",
        padding: "16px",
        fontFamily: "monospace",
        color: "#000000",
        backgroundColor: "#f4f4f4",
        borderRadius: "16px"
      }}
    >
      <style>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          #printable-report-area {
            background-color: #ffffff !important;
            margin: 0px !important;
            padding: 0px !important;
            max-width: 100% !important;
          }
          .action-buttons-bar {
            display: none !important;
          }
          .report-box {
            border: 2px dashed #000000 !important;
            background: #ffffff !important;
          }
        }
      `}</style>

      {/* Main Report Block */}
      <div
        ref={reportRef}
        className="report-box"
        style={{
          background: "#ffffff",
          border: "2px dashed #888888",
          borderRadius: "4px",
          padding: "0px",
          marginBottom: "24px",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "12px 16px",
            borderBottom: "1px solid #000000",
            position: "relative"
          }}
        >
          <div style={{ borderLeft: "1px solid #888888", paddingLeft: "8px" }}>
            <h1 style={{ margin: 0, fontSize: "16px", fontWeight: "normal" }}>
              {industryName}
            </h1>
            <div style={{ fontSize: "14px", marginTop: "4px" }}>
              Work Update
            </div>
          </div>
          <div style={{ textAlign: "right", fontSize: "14px", paddingRight: "8px", borderRight: "1px solid #888888" }}>
            {new Date().toLocaleDateString("en-GB")}
          </div>
        </div>

        {/* Title Section */}
        <div style={{ textAlign: "center", padding: "8px 0", fontSize: "14px", letterSpacing: "1px" }}>
          DAILY STATUS REPORT
        </div>

        {/* Metadata Details */}
        <div
          style={{
            padding: "0 16px 12px 16px",
            borderBottom: "1px solid #000000",
            fontSize: "14px",
            lineHeight: "1.8"
          }}
        >
          <div style={{ borderLeft: "1px solid #888888", paddingLeft: "8px" }}>
            Summary Type : {summaryData?.summaryType || "Daily"}
          </div>
          <div style={{ borderLeft: "1px solid #888888", paddingLeft: "8px" }}>
            Prepared By  : {summaryData?.preparedBy || "-"}
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div
          className="action-buttons-bar"
          style={{
            display: "flex",
            gap: "20px",
            padding: "10px 16px",
            fontSize: "14px",
            alignItems: "center"
          }}
        >
          <span style={{ borderLeft: "1px solid #888888", paddingLeft: "8px" }}></span>
          <button onClick={handlePrint} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "monospace", display: "flex", alignItems: "center", gap: "4px" }}>
            🖨 Print
          </button>
          <button 
          onClick={downloadPDF}
          style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "monospace", display: "flex", alignItems: "center", gap: "4px" }}>
            📄 PDF
          </button>
          <button onClick={downloadExcel} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "monospace", display: "flex", alignItems: "center", gap: "4px" }}>
            📊 Excel
          </button>
          <button onClick={shareOnWhatsApp} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "monospace", display: "flex", alignItems: "center", gap: "4px" }}>
            📱 WhatsApp
          </button>
         </div>

      {/* 1. Technical Work Done */}
      <div
        className="report-box"
        style={{
          background: "#ffffff",
          border: "2px dashed #888888",
          borderRadius: "4px",
          padding: "12px 16px",
          marginBottom: "24px",
          fontSize: "14px",
          lineHeight: "1.8"
        }}
      >
        <div style={{ borderLeft: "1px solid #888888", paddingLeft: "8px" }}>
          <div style={{ marginBottom: "6px" }}>1. Technical Work Done</div>
          {summaryData.summary.technicalWorkDone.length === 0 ? (
            <div>• No technical work available.</div>
          ) : (
            summaryData.summary.technicalWorkDone.map((item: string, index: number) => (
              <div key={index}>• {item}</div>
            ))
          )}
        </div>
      </div>

      {/* 2. Office / Admin Work Done */}
      <div
        className="report-box"
        style={{
          background: "#ffffff",
          border: "2px dashed #888888",
          borderRadius: "4px",
          padding: "12px 16px",
          marginBottom: "24px",
          fontSize: "14px",
          lineHeight: "1.8"
        }}
      >
        <div style={{ borderLeft: "1px solid #888888", paddingLeft: "8px" }}>
          <div style={{ marginBottom: "6px" }}>2. Office / Admin Work Done</div>
          {summaryData.summary.officeWorkDone.length === 0 ? (
            <div>• No office work available.</div>
          ) : (
            summaryData.summary.officeWorkDone.map((item: string, index: number) => (
              <div key={index}>• {item}</div>
            ))
          )}
        </div>
      </div>

      {/* 3. Next Day Plan */}
      <div
        className="report-box"
        style={{
          background: "#ffffff",
          border: "2px dashed #888888",
          borderRadius: "4px",
          padding: "12px 16px",
          marginBottom: "24px",
          fontSize: "14px",
          lineHeight: "1.8"
        }}
      >
        <div style={{ borderLeft: "1px solid #888888", paddingLeft: "8px" }}>
          <div style={{ marginBottom: "6px" }}>3. Next Day Plan</div>
          {summaryData.summary.nextDayPlan.length === 0 ? (
            <div>• No next day plan available.</div>
          ) : (
            summaryData.summary.nextDayPlan.map((item: string, index: number) => (
              <div key={index}>• {item}</div>
            ))
          )}
        </div>
      </div>

      {/* 4. Blockers / Issues */}
      <div
        className="report-box"
        style={{
          background: "#ffffff",
          border: "2px dashed #888888",
          borderRadius: "4px",
          padding: "12px 16px",
          marginBottom: "24px",
          fontSize: "14px",
          lineHeight: "1.8"
        }}
      >
        <div style={{ borderLeft: "1px solid #888888", paddingLeft: "8px" }}>
          <div style={{ marginBottom: "6px" }}>4. Blockers / Issues</div>
          {summaryData.summary.blockers.length === 0 ? (
            <div>• No blockers reported.</div>
          ) : (
            summaryData.summary.blockers.map((item: string, index: number) => (
              <div key={index}>• {item}</div>
            ))
          )}
        </div>
        </div>
    </div>
    
</div>
  );
}