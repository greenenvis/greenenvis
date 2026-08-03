import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useEffect, useState } from "react";
import { supabase } from "@/app/supabase";
type Props = {
  open: boolean;
  record: any;
  onClose: () => void;
};

export default function ViewWorkRecordModal({
  open,
  record,
  onClose,
}: Props) {

const [history, setHistory] = useState<any[]>([]);
const [documents, setDocuments] = useState<any[]>([]);
const [timelineFilter, setTimelineFilter] = useState("all");
const [timelineSearch, setTimelineSearch] = useState("");

const timelineCategories = [
  { key: "all", label: "All" },
  { key: "status", label: "Status" },
  { key: "payment", label: "Payment" },
  { key: "followup", label: "Follow-up" },
  { key: "communication", label: "Communication" },
  { key: "system", label: "System" },
];

useEffect(() => {
  if (!record?.id) return;

  const loadHistory = async () => {
    const { data, error } = await supabase
      .from("work_record_history")
      .select("*")
      .eq("work_record_id", record.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("History Error:", error);
      return;
    }

    setHistory(data || []);
  };

loadDocuments();
  loadHistory();
}, [record?.id]);

const loadDocuments = async () => {
  if (!record?.id) return;

console.log("View Record ID =", record?.id);

  const { data, error } = await supabase
    .from("work_record_documents")
    .select("*")
    .eq("work_record_id", record.id)
    .order("uploaded_at", { ascending: false });

  if (error) {
    console.error("Documents Error:", error);

alert(
  JSON.stringify(
    {
      message: error?.message,
      code: error?.code,
      details: error?.details,
      hint: error?.hint,
    },
    null,
    2
  )
);
    return;
  }

  setDocuments(data || []);
};

const handleDeleteHistory = async (historyId: string) => {
  const ok = window.confirm(
    "Are you sure you want to delete this activity?"
  );

  if (!ok) return;

  const { error } = await supabase
    .from("work_record_history")
    .delete()
    .eq("id", historyId);

  if (error) {
    alert(error.message);
    return;
  }

  const { data, error: reloadError } = await supabase
  .from("work_record_history")
  .select("*")
  .eq("work_record_id", record.id)
  .order("created_at", { ascending: false });

if (!reloadError) {
  setHistory(data || []);
}
  alert("Activity deleted successfully.");
};

if (!open || !record) return null;

const filteredHistory = history.filter((item) => {
  // Category Filter
  let matchesCategory = false;

  if (timelineFilter === "all") {
    matchesCategory = true;
  } else {
    switch (item.activity_type) {
      case "status":
        matchesCategory = timelineFilter === "status";
        break;

      case "payment":
      case "received_amount":
      case "quotation_amount":
        matchesCategory = timelineFilter === "payment";
        break;

      case "followup":
      case "next_action":
        matchesCategory = timelineFilter === "followup";
        break;

      case "whatsapp":
      case "email":
        matchesCategory = timelineFilter === "communication";
        break;

      case "created":
      case "updated":
        matchesCategory = timelineFilter === "system";
        break;

      default:
        matchesCategory = false;
    }
  }

  // Search Filter
  const keyword = timelineSearch.trim().toLowerCase();

  const matchesSearch =
    keyword === "" ||
    (item.activity_title || "").toLowerCase().includes(keyword) ||
    (item.activity_message || "").toLowerCase().includes(keyword);

  return matchesCategory && matchesSearch;
});

const handlePrint = () => {
  const printContents = document.getElementById("print-area");

  if (!printContents) return;

  const printWindow = window.open("", "_blank", "width=900,height=700");

  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Client Work Report</title>

        <style>
          *{
            box-sizing:border-box;
            font-family:Arial,Helvetica,sans-serif;
          }

          body{
            margin:20px;
            background:#ffffff;
            color:#000;
          }

          button{
            display:none !important;
          }

          .no-print{
            display:none !important;
          }

          @page{
            margin:12mm;
            size:A4;
          }
        </style>

      </head>

     <body>

${
  record.inquiry_type === "Office Work"
    ? `
      <h1 style="text-align:center;margin:0;font-size:30px;font-weight:700;">
        OFFICE WORK REPORT
      </h1>

      <hr style="margin:20px 0">

      ${printContents.innerHTML}
    `
    : `
      <h1
        style="
          text-align:center;
          margin:0;
          font-size:30px;
          color:#111827;
          font-weight:700;
        "
      >
        ${record.unit_name || "CLIENT"}
      </h1>

      <h2
        style="
          text-align:center;
          margin:8px 0 24px;
          font-size:18px;
          color:#0B4F84;
          font-weight:700;
          letter-spacing:1px;
        "
      >
        CLIENT WORK REPORT
      </h2>

      ${printContents.innerHTML.replace(
        /<h2[\s\S]*?<\/h2>/,
        ""
      )}
    `
}

</body>

    </html>
  `);

  printWindow.document.close();

  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 300);
};

const getPendingActionMessage = (action: string) => {
  const cleanAction = String(action || "")
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, "")
    .trim();

  switch (cleanAction) {
    case "Call Client":
      return "Kindly let us know a convenient time so that we can discuss your project.";

    case "Collect Pending Documents":
      return "Kindly share the pending documents required for further processing of your application.";

    case "Collect Advance Payment":
      return "Kindly release the advance payment to initiate the processing of your application.";

    case "Collect Balance Payment":
      return "Kindly release the pending balance payment to continue the processing of your application.";

    case "Approve Quotation":
      return "Kindly review and approve the quotation shared with you.";

    case "Check Email":
      return "Kindly check your email and respond at your earliest convenience.";

    case "Upload Documents":
      return "Kindly upload the required documents to continue the compliance process.";

    case "Submit Application":
      return "Your documents are ready. Kindly confirm so that we can submit the application.";

    case "Respond to Authority Query":
      return "Kindly provide the required information and documents to enable us to respond to the authority query.";

    case "Sign Documents":
      return "Kindly sign the required documents and share them with us for further processing.";

    case "Verify Digital Signature":
      return "Kindly complete the Digital Signature verification process.";

    case "Verify Digital Locker":
      return "Kindly complete the Digital Locker verification process.";

    case "Schedule Factory Visit":
      return "Kindly confirm a convenient date and time for the factory visit.";

    case "Schedule Meeting":
      return "Kindly let us know your preferred date and time for the meeting.";

    case "Awaiting Client Response":
      return "We are awaiting your confirmation to proceed further with your application.";

    case "Awaiting Authority Approval":
      return "Your application has been submitted and is currently awaiting approval from the concerned authority.";

    case "Follow-up with Authority":
      return "We are following up with the concerned authority regarding your application and will keep you updated.";

    case "Collect Original Documents":
      return "Kindly provide the original documents required for verification and submission.";

    case "Final Approval Pending":
      return "Your application is in the final stage and awaiting approval. We will update you once approval is received.";

    case "Deliver Certificate":
      return "Your certificate is ready. Kindly let us know a convenient time for delivery or collection.";

    case "General Follow-up":
      return "This is a friendly follow-up regarding your ongoing project. Kindly contact us if you need any assistance.";

    default:
      return "Kindly contact us if you require any assistance regarding your application.";
  }
};

const getStatusMessage = (
  status?: string,
  paymentStatus?: string
) => {
  const s = String(status || "").trim();
  const p = String(paymentStatus || "").trim();

  const lines: string[] = [];

  if (s) {
    switch (s) {
      case "Pending":
        lines.push("📌 Current Status");
        lines.push("Your project is under process.");
        break;

      case "In Progress":
        lines.push("📌 Current Status");
        lines.push("Your project is currently in progress.");
        break;

      case "Completed":
        lines.push("📌 Current Status");
        lines.push("Your project has been completed successfully.");
        break;

      case "On Hold":
        lines.push("📌 Current Status");
        lines.push("Your project is temporarily on hold.");
        break;

      case "Submitted":
        lines.push("📌 Current Status");
        lines.push("Your application has been submitted to the authority.");
        break;
    }
  }

  if (p === "Pending") {
    if (lines.length) lines.push("");

    lines.push("💳 Payment Status");
    lines.push("Our records indicate that payment is pending.");
  } else if (p === "Partially Paid") {
    if (lines.length) lines.push("");

    lines.push("💳 Payment Status");
    lines.push("Partial payment has been received.");
  }

  return lines.join("\n");
};

const getServiceMessage = (
  scope: string,
  pendingMessage: string,
  status?: string,
  paymentStatus?: string
) => {

  const service = String(scope || "").trim();

  const statusMessage = getStatusMessage(
  status,
  paymentStatus
);

const formattedStatus = statusMessage
  ? `${statusMessage}\n\n`
  : "";

switch (service) {
    case "Consent to Establish (CTE)":
      return `This is a reminder regarding your Consent to Establish (CTE) application.

${formattedStatus}${pendingMessage}`;


    case "Consent to Operate (CCA)":
      return `This is a reminder regarding your Consent to Operate (CCA) application.

${formattedStatus}${pendingMessage}`;


    case "CCA Renewal":
      return `This is a reminder regarding your CCA Renewal process.

${formattedStatus}${pendingMessage}`;


    case "Hazardous Waste Authorization":
      return `This is a reminder regarding your Hazardous Waste Authorization.

${formattedStatus}${pendingMessage}`;


    case "Biomedical Waste Authorization":
      return `This is a reminder regarding your Biomedical Waste Authorization.

${formattedStatus}${pendingMessage}`;


    case "Plastic EPR":
      return `This is a reminder regarding your Plastic EPR compliance.

${formattedStatus}${pendingMessage}`;


    case "Battery EPR":
      return `This is a reminder regarding your Battery EPR compliance.

${formattedStatus}${pendingMessage}`;


    case "E-Waste EPR":
      return `This is a reminder regarding your E-Waste EPR compliance.

${formattedStatus}${pendingMessage}`;


    case "Used Oil EPR":
      return `This is a reminder regarding your Used Oil EPR compliance.

${formattedStatus}${pendingMessage}`;


    case "Tyre EPR":
      return `This is a reminder regarding your Tyre EPR compliance.

${formattedStatus}${pendingMessage}`;


    case "CGWA NOC":
      return `This is a reminder regarding your CGWA NOC application.

${formattedStatus}${pendingMessage}`;


    case "CGWA Renewal":
      return `This is a reminder regarding your CGWA Renewal application.

${formattedStatus}${pendingMessage}`;


    case "Environmental Clearance (EC)":
      return `This is a reminder regarding your Environmental Clearance (EC).

${formattedStatus}${pendingMessage}`;


    case "Environmental Audit":
      return `This is a reminder regarding your Environmental Audit.

${formattedStatus}${pendingMessage}`;


    case "NABL Laboratory Setup":
      return `This is a reminder regarding your NABL Laboratory Setup project.

${formattedStatus}${pendingMessage}`;


    case "Factory License":
      return `This is a reminder regarding your Factory License application.

${formattedStatus}${pendingMessage}`;


    case "Fire NOC":
      return `This is a reminder regarding your Fire NOC application.

${formattedStatus}${pendingMessage}`;


    default:
      return `This is a reminder regarding your compliance work.

${formattedStatus}${pendingMessage}`;

  }
};

const exportOfficeWorkPDF = async () => {
const pdf = new jsPDF("p", "mm", "a4");

  let y = 20;

  // ===============================
  // Title
  // ===============================
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text("OFFICE WORK REPORT", 105, y, { align: "center" });

  y += 15;

  // ===============================
  // Task Information
  // ===============================
  pdf.setFontSize(13);
  pdf.text("Task Information", 15, y);

  y += 8;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);

  const dueDate = record.due_date
    ? new Date(record.due_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

  pdf.text(`Task Title : ${record.task_title || "-"}`, 15, y);
  y += 7;

  pdf.text(`Office Work Type : ${record.office_work_type || "-"}`, 15, y);
  y += 7;

  pdf.text(`Assigned To : ${record.assigned_to || "-"}`, 15, y);
  y += 7;

  pdf.text(`Due Date : ${dueDate}`, 15, y);
  y += 7;

  pdf.text(`Status : ${record.status || "-"}`, 15, y);
  y += 12;

  // ===============================
  // Task Description
  // ===============================
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.text("Task Description", 15, y);

  y += 8;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);

  const task = pdf.splitTextToSize(
    record.task_description || "-",
    180
  );

  pdf.text(task, 15, y);

  y += task.length * 6 + 10;

  // ===============================
  // Remarks
  // ===============================
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.text("Remarks", 15, y);

  y += 8;

  pdf.setFont("helvetica", "normal");

  const remarks = pdf.splitTextToSize(
    record.remarks || "-",
    180
  );

  pdf.text(remarks, 15, y);

  y += remarks.length * 6 + 12;

// ===============================
// Activity Timeline
// ===============================
if (filteredHistory.length > 0) {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.text("Activity Timeline", 15, y);

  y += 8;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  filteredHistory.forEach((item) => {
    if (y > 275) {
      pdf.addPage();
      y = 20;
    }

    pdf.setFont("helvetica", "bold");
    pdf.text(item.activity_title || "[LOG]", 15, y);

    y += 5;

    pdf.setFont("helvetica", "normal");

    const wrapped = pdf.splitTextToSize(
      String(item.activity_message || "-"),
      175
    );

    pdf.text(wrapped, 15, y);

    y += wrapped.length * 5;

    pdf.setFontSize(9);
    pdf.text(
      new Date(item.created_at).toLocaleString("en-IN"),
      15,
      y
    );

    y += 8;
    pdf.setFontSize(10);
  });
}

  // File name
  const fileName = `Office_Work_${(record.task_title || "Task")
    .replace(/[\\/:*?"<>|]/g, "_")
    .trim()}.pdf`;

  pdf.save(fileName);
};

const handleExportPDF = async () => {

if (record.inquiry_type === "Office Work") {
    await exportOfficeWorkPDF();
    return;
}

const pdf = new jsPDF("p", "mm", "a4");

console.log("record =", record);
console.log("company_logo =", record.company_logo);

  let y = 18;

if (record.company_logo) {
  try {
    const response = await fetch(record.company_logo);
    const blob = await response.blob();

    const reader = new FileReader();

    const base64 = await new Promise<string>((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    pdf.addImage(base64, "PNG", 75, 10, 60, 20);

    y = 38;
  } catch (err) {
    console.error("Unable to load company logo", err);
  }
}

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text(record.unit_name || "Client Report", 105, y, {
  align: "center",
});

  y += 8;

  pdf.setFontSize(14);
  pdf.text(
  record.inquiry_type === "Office Work"
    ? "OFFICE WORK REPORT"
    : "CLIENT WORK REPORT",
  105,
  y,
  { align: "center" }
);

  y += 10;

  pdf.line(15, y, 195, y);

  y += 10;

  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text(
  record.inquiry_type === "Office Work"
    ? "Task Information"
    : "Client Information",
  15,
  y
);

  y += 8;

  pdf.setFont("helvetica", "normal");

if (record.inquiry_type === "Office Work") {
  pdf.setFont("helvetica", "normal");

  pdf.text(`Task Title : ${record.task_title || "-"}`, 15, y);
  y += 7;

  pdf.text(
    `Office Work Type : ${
      record.office_work_type === "Other"
        ? record.other_office_work || "-"
        : record.office_work_type || "-"
    }`,
    15,
    y
  );
  y += 7;

  pdf.text(`Assigned To : ${record.assigned_to || "-"}`, 15, y);
  y += 7;

  const dueDate = record.due_date
  ? new Date(record.due_date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  : "-";

pdf.text(`Due Date : ${dueDate}`, 15, y);

  pdf.text(`Status : ${record.status || "Office Task"}`, 15, y);
} else {
  pdf.setFont("helvetica", "normal");

  pdf.text(`Unit Name : ${record.unit_name || "-"}`, 15, y);
  y += 7;

  pdf.text(`Contact Person : ${record.contact_person || "-"}`, 15, y);
  y += 7;

  pdf.text(`Mobile : ${record.mobile || "-"}`, 15, y);
  y += 7;

  pdf.text(`Reference : ${record.reference_name || "-"}`, 15, y);
}

  if (record.inquiry_type !== "Office Work") {

  pdf.setFont("helvetica", "bold");
  pdf.text("Project Information", 15, y);

  y += 8;

  pdf.setFont("helvetica", "normal");

  pdf.text(
  `Scope : ${
    record.inquiry_type === "Office Work"
      ? (record.office_work_type === "Other"
          ? record.other_office_work || "-"
          : record.office_work_type || "-")
      : record.scope_of_work || "-"
  }`,
  15,
  y
);
  y += 7;

  pdf.text(`Inquiry Type : ${record.inquiry_type || "-"}`, 15, y);
  y += 7;

  pdf.text(
  `Priority : ${
    record.inquiry_type === "Office Work"
      ? (record.office_work_type === "Other"
          ? record.other_office_work || "-"
          : record.office_work_type || "-")
      : record.priority || "-"
  }`,
  15,
  y
);
  y += 7;

  pdf.text(
  `Status : ${
    record.inquiry_type === "Office Work"
      ? "Office Task"
      : record.status || "-"
  }`,
  15,
  y
);

  y += 12;

  pdf.setFont("helvetica", "bold");
  pdf.text("Portal Details", 15, y);

  y += 8;

  pdf.setFont("helvetica", "normal");

if (record.inquiry_type === "Office Work") {
  pdf.text(`Assigned To : ${record.assigned_to || "-"}`, 15, y);
  y += 7;

  pdf.text(`Due Date : ${record.due_date || "-"}`, 15, y);
} else {
  pdf.text(`Portal ID : ${record.portal_id || "-"}`, 15, y);
  y += 7;

  pdf.text(`Portal Password : ${record.portal_password || "-"}`, 15, y);
}

  y += 12;

  pdf.setFont("helvetica", "bold");
  pdf.text("Payment Information", 15, y);

  y += 8;

  pdf.setFont("helvetica", "normal");

 if (record.inquiry_type === "Office Work") {
  pdf.text(`Assigned To : ${record.assigned_to || "-"}`, 15, y);
  y += 7;

  pdf.text(`Remarks : ${record.remarks || "-"}`, 15, y);
} else {
  pdf.text(
    `Quotation Amount : Rs. ${Number(
      record.quotation_amount || 0
    ).toLocaleString("en-IN")}`,
    15,
    y
  );

  y += 7;

  pdf.text(
    `Payment Status : ${record.payment_status || "-"}`,
    15,
    y
  );
}

  y += 12;

  pdf.setFont("helvetica", "bold");
  pdf.text("Follow-up Information", 15, y);

  y += 8;

  pdf.setFont("helvetica", "normal");

  if (record.inquiry_type === "Office Work") {
  pdf.text(`Due Date : ${record.due_date || "-"}`, 15, y);
  y += 7;

  pdf.text(`Assigned To : ${record.assigned_to || "-"}`, 15, y);
  y += 7;

  pdf.text(`Task Description : ${record.task_description || "-"}`, 15, y);
} else {
  pdf.text(
    `Last Follow-up : ${record.last_followup || "-"}`,
    15,
    y
  );

  y += 7;

  pdf.text(
    `Next Follow-up : ${record.next_followup || "-"}`,
    15,
    y
  );

  y += 7;

  const nextAction = String(record.next_action || "-")
    .replace(/[^\x20-\x7E]/g, "")
    .trim();

  pdf.text(
    `Next Action : ${nextAction || "-"}`,
    15,
    y
  );
}

  y += 15;

  pdf.setFontSize(10);

  pdf.text(
  `Generated On : ${new Date().toLocaleString()}`,
  15,
  y
);

if (record.inquiry_type === "Office Work") {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("Task Description", 15, y);

  y += 8;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);

  const taskDescription = pdf.splitTextToSize(
    record.task_description || "-",
    175
  );

  pdf.text(taskDescription, 15, y);

  y += taskDescription.length * 6 + 8;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("Remarks", 15, y);

  y += 8;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);

  const remarks = pdf.splitTextToSize(
    record.remarks || "-",
    175
  );

  pdf.text(remarks, 15, y);

  y += remarks.length * 6 + 12;
} else {
  y += 15;
}
}
const fileName =
  record.inquiry_type === "Office Work"
    ? `Office_Work_${(record.task_title || "Task")
        .replace(/[\\/:*?"<>|]/g, "_")
        .trim()}.pdf`
    : `Client_Record_${(record.unit_name || "Report")
        .replace(/[\\/:*?"<>|]/g, "_")
        .trim()}.pdf`;
}
  return (
    <div
        id="print-area"
        style={{
        position: "fixed",

...(typeof window !== "undefined" &&
window.matchMedia("print").matches
  ? {
      position: "static",
      inset: "auto",
      background: "#ffffff",
    }
  : {}),
        inset: 0,
        background: "rgba(0,0,0,0.50)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "1100px",
          maxWidth: "95vw",
          ...(typeof window !== "undefined" &&
        window.matchMedia("print").matches
        ? {}
      : {
      maxHeight: "90vh",
      overflowY: "auto",
    }),
          boxShadow: "0 20px 60px rgba(15,23,42,0.25)",
          border: "1px solid #dbe4ee",
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
        }}
      >

{record.company_logo && (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px",
    }}
  >
    <img
      src={record.company_logo}
      alt="Company Logo"
      style={{
        maxHeight: "90px",
        maxWidth: "220px",
        objectFit: "contain",
      }}
    />
  </div>
)}

        <h2
  style={{
    margin: 0,
    color: "#0B4F84",
    fontSize: "34px",
    fontWeight: 700,
    textAlign: "center",
    letterSpacing: "0.3px",
  }}
>
  {record.inquiry_type === "Office Work"
  ? "📋 View Office Work"
  : "👤 View Client Record"}
</h2>

   <div
  style={{
    marginTop: "22px",
    marginBottom: "26px",
    borderBottom: "2px solid #e2e8f0",
  }}
/>
<>
  <h3
    style={{
      margin: "0 0 16px 0",
      color: "#0B4F84",
      fontSize: "17px",
      fontWeight: 700,
    }}
  >
    👤 Client Information
  </h3>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      gap: "20px",
      marginBottom: "28px",
      border: "1px solid #dbe4ee",
      borderRadius: "14px",
      padding: "22px",
      background: "#ffffff",
      boxShadow: "0 4px 14px rgba(15,23,42,0.08)",
      transition: "all .2s ease",
    }}
  >
  <div>
    <div
  style={{
    color: "#64748b",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "6px",
  }}
>
      Unit Name
    </div>
    <div
  style={{
    fontWeight: 600,
    fontSize: "16px",
    color: "#0f172a",
    lineHeight: 1.5,
  }}
>
      {record.unit_name || "-"}
    </div>
  </div>

  <div>
    <div
  style={{
    color: "#64748b",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "6px",
  }}
>
      Contact Person
    </div>

    <div
  style={{
    fontWeight: 600,
    fontSize: "16px",
    color: "#0f172a",
    lineHeight: 1.5,
  }}
>
      {record.contact_person || "-"}
    </div>
  </div>

  <div>
    <div
  style={{
    color: "#64748b",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "6px",
  }}
>
      Mobile Number
    </div>

    <div
  style={{
    fontWeight: 600,
    fontSize: "16px",
    color: "#0f172a",
    lineHeight: 1.5,
  }}
>
      {record.mobile || "-"}
    </div>
  </div>

  <div>
    <div
  style={{
    color: "#64748b",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "6px",
  }}
>
      Reference
    </div>

    <div
  style={{
    fontWeight: 600,
    fontSize: "16px",
    color: "#0f172a",
    lineHeight: 1.5,
  }}
>
      {record.reference_name || "-"}
    </div>
  </div>

</div>

</>

<div
  style={{
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "22px",
    marginBottom: "20px",
    background: "#ffffff",
    boxShadow: "0 4px 14px rgba(15,23,42,0.08)",
  }}
>
  <h3
    style={{
      margin: "0 0 16px 0",
      color: "#0B4F84",
      fontSize: "17px",
    }}
  >
    {record.inquiry_type === "Office Work"
  ? "🗂 Office Work Information"
  : "📋 Project Information"}
  </h3>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
    }}
  >
    <div>
      <div
  style={{
    color: "#64748b",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "6px",
  }}
>
        Scope of Work
      </div>     
      <div
  style={{
    fontWeight: 600,
    fontSize: "16px",
    color: "#0f172a",
    lineHeight: 1.5,
  }}
>
        {record.inquiry_type === "Office Work"
  ? record.office_work_type === "Other"
    ? record.other_office_work || "-"
    : record.office_work_type || "-"
  : record.scope_of_work || "-"}
      </div>
    </div>

    <div>
      <div
  style={{
    color: "#64748b",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "6px",
  }}
>
        Inquiry Type
      </div>
      <div
  style={{
    fontWeight: 600,
    fontSize: "16px",
    color: "#0f172a",
    lineHeight: 1.5,
  }}
>
{record.inquiry_type === "Office Work"
  ? "Office Work"
  : record.inquiry_type || "-"}
      </div>
    </div>

    <div>
      <div
  style={{
    color: "#64748b",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "6px",
  }}
>
        Status
      </div>
      <div
  style={{
    fontWeight: 600,
    fontSize: "16px",
    color: "#0f172a",
    lineHeight: 1.5,
  }}
>
{record.inquiry_type === "Office Work"
  ? "Office Task"
  : record.status || "-"}
      </div>
    </div>

    <div>
      <div
  style={{
    color: "#64748b",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "6px",
  }}
>
        Priority
      </div>
      <div
  style={{
    fontWeight: 600,
    fontSize: "16px",
    color: "#0f172a",
    lineHeight: 1.5,
  }}
>
    {record.inquiry_type === "Office Work"
  ? (record.office_work_type === "Other"
      ? record.other_office_work || "-"
      : record.office_work_type || "-")
  : record.priority || "-"}
      </div>
    </div>
{record.inquiry_type === "Office Work" ? (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "180px 1fr",
      gap: "10px",
      marginTop: "12px",
      paddingTop: "12px",
      borderTop: "1px solid #e2e8f0",
    }}
  >
    <div style={{ fontWeight: 600, color: "#475569" }}>
      Assigned To
    </div>
    <div>{record.assigned_to || "-"}</div>

    <div style={{ fontWeight: 600, color: "#475569" }}>
      Due Date
    </div>
    <div>{record.due_date || "-"}</div>
  </div>
) : (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "180px 1fr",
      gap: "10px",
      marginTop: "12px",
      paddingTop: "12px",
      borderTop: "1px solid #e2e8f0",
    }}
  >
    <div style={{ fontWeight: 600, color: "#475569" }}>
      Portal ID
    </div>

    <div>{record?.portal_id || "-"}</div>

    <div style={{ fontWeight: 600, color: "#475569" }}>
      Portal Password
    </div>

    <div>{record?.portal_password || "-"}</div>
  </div>
)}

 </div>
</div>

<div
  style={{
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "22px",
    marginBottom: "20px",
    background: "#ffffff",
  }}
>
  <h3
    style={{
      margin: "0 0 16px 0",
      color: "#0B4F84",
      fontSize: "17px",
    }}
  >
    {record.inquiry_type === "Office Work"
  ? "📝 Office Task Details"
  : "💰 Payment Information"}
  </h3>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
    }}
  >
    <div>
      <div
  style={{
    color: "#64748b",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "6px",
  }}
>
        Quotation Amount
      </div>

      <div
  style={{
    fontWeight: 600,
    fontSize: "16px",
    color: "#0f172a",
    lineHeight: 1.5,
  }}
>
        {record.inquiry_type === "Office Work"
  ? record.assigned_to || "-"
  : `₹ ${Number(record.quotation_amount || 0).toLocaleString("en-IN")}`}
      </div>
    </div>

    <div>
      <div
  style={{
    color: "#64748b",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "6px",
  }}
>
        Payment Status
      </div>

      <div
  style={{
    fontWeight: 600,
    fontSize: "16px",
    color: "#0f172a",
    lineHeight: 1.5,
  }}
>
{record.inquiry_type === "Office Work"
  ? record.remarks || "-"
  : record.payment_status || "Pending"}
      </div>
    </div>
  </div>
</div>

<div
  style={{
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "22px",
    marginTop: "20px",
    marginBottom: "20px",
    background: "#ffffff",
    boxShadow: "0 4px 14px rgba(15,23,42,0.08)",
  }}
>
  <h3
    style={{
      margin: "0 0 16px 0",
      color: "#0B4F84",
      fontSize: "17px",
    }}
  >
    {record.inquiry_type === "Office Work"
  ? "📅 Task Information"
  : "📞 Follow-up Information"}
  </h3>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      gap: "16px",
    }}
  >
    <div>
      <div
  style={{
    color: "#64748b",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "6px",
  }}
>
        Last Follow-up
      </div>
      <div
  style={{
    fontWeight: 600,
    fontSize: "16px",
    color: "#0f172a",
    lineHeight: 1.5,
  }}
>
        {record.last_followup || "-"}
      </div>
    </div>

    <div>
      <div
  style={{
    color: "#64748b",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "6px",
  }}
>
        Next Follow-up
      </div>
      <div
  style={{
    fontWeight: 600,
    fontSize: "16px",
    color: "#0f172a",
    lineHeight: 1.5,
  }}
>
        {record.inquiry_type === "Office Work"
  ? record.due_date || "-"
  : record.next_followup || "-"}
      </div>
    </div>

    <div>
      <div
  style={{
    color: "#64748b",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "6px",
  }}
>
        Next Action
      </div>
      <div
  style={{
    fontWeight: 600,
    fontSize: "16px",
    color: "#0f172a",
    lineHeight: 1.5,
  }}
>
        {record.inquiry_type === "Office Work"
  ? record.assigned_to || "-"
  : record.next_action || "-"}
      </div>
    </div>

    <div>
      <div
  style={{
    color: "#64748b",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "6px",
  }}
>
        Client Reply
      </div>
      <div
  style={{
    fontWeight: 600,
    fontSize: "16px",
    color: "#0f172a",
    lineHeight: 1.5,
  }}
>
        {record.inquiry_type === "Office Work"
  ? record.task_description || "-"
  : record.client_reply || "-"}
      </div>
    </div>
  </div>
</div>
<div
  style={{
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "22px",
    marginTop: "20px",
    marginBottom: "20px",
    background: "#ffffff",
    boxShadow: "0 4px 14px rgba(15,23,42,0.08)",
  }}
>
{record.inquiry_type !== "Office Work" && (
<div
  style={{
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "22px",
    marginTop: "20px",
    marginBottom: "20px",
    background: "#ffffff",
    boxShadow: "0 4px 14px rgba(15,23,42,0.08)",
  }}
>
  <h3
    style={{
      margin: "0 0 18px 0",
      color: "#0B4F84",
      fontSize: "17px",
      fontWeight: 700,
    }}
  >
    📲 Client Reminder
  </h3>

  <div
    style={{
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
    }}
  >
    <button
      type="button"
      onClick={async () => {
  const { data: profile } = await supabase
    .from("industry_profile")
    .select("industry_name")
    .single();

  const pendingMessage = getPendingActionMessage(record.next_action);

  const serviceMessage = getServiceMessage(
    record.scope_of_work,
    pendingMessage,
    record.status,
    record.payment_status
  );

  const msg = `Dear ${record.contact_person},

Company :
${record.unit_name}

Service :
${record.scope_of_work}

${serviceMessage}

Thank You,

${profile?.industry_name || ""}`;

  await supabase.from("work_record_history").insert({
    work_record_id: record.id,
    activity_type: "whatsapp",
    activity_title: "WhatsApp Reminder Opened",
    activity_message: `WhatsApp reminder opened for ${record.contact_person}`,
  });

  window.open(
    `https://wa.me/91${record.mobile}?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}}
      style={{
        background: "#25D366",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "10px 18px",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      🟢 WhatsApp Reminder
    </button>

    <button
      type="button"
      onClick={async () => {
  const { data: profile } = await supabase
    .from("industry_profile")
    .select("industry_name")
    .single();

  const subject = `Reminder - ${record.scope_of_work}`;

  const pendingMessage = getPendingActionMessage(record.next_action);

  const serviceMessage = getServiceMessage(
    record.scope_of_work,
    pendingMessage,
    record.status,
    record.payment_status
  );

  const msg = `Dear ${record.contact_person},

Company :
${record.unit_name}

Service :
${record.scope_of_work}

${serviceMessage}

Thank You,

${profile?.industry_name || ""}`;

  await supabase.from("work_record_history").insert({
    work_record_id: record.id,
    activity_type: "email",
    activity_title: "Email Reminder Opened",
    activity_message: `Email reminder opened for ${record.contact_person}`,
  });

  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      record.email || ""
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`,
    "_blank"
  );
}}
      style={{
        background: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "10px 18px",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      📧 Email Reminder
    </button>
  </div>
</div>
)}

{record.inquiry_type === "Office Work" && (
  <div
    style={{
      border: "1px solid #e2e8f0",
      borderRadius: "14px",
      padding: "22px",
      marginTop: "20px",
      marginBottom: "20px",
      background: "#ffffff",
      boxShadow: "0 4px 14px rgba(15,23,42,0.08)",
    }}
  >
    <h3
      style={{
        margin: "0 0 16px 0",
        color: "#0B4F84",
        fontSize: "17px",
        fontWeight: 700,
      }}
    >
      📎 Attached Documents
    </h3>

    {documents.length === 0 ? (
      <div style={{ color: "#64748b" }}>
        {documents.length === 0 ? (
  <p className="text-gray-500 text-sm">
    No documents uploaded.
  </p>
) : (
  <div className="space-y-2">
    {documents.map((doc: any) => (
      <div
        key={doc.id}
        className="flex items-center justify-between border rounded-lg p-3 bg-gray-50"
      >
        <div>
          <div className="font-medium">
            📄 {doc.original_name}
          </div>

          <div className="text-xs text-gray-500">
            {(doc.file_size / 1024).toFixed(1)} KB
          </div>
        </div>

        <div className="flex gap-2">
  <a
    href={doc.file_url}
    target="_blank"
    rel="noopener noreferrer"
    className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
  >
    👁 View
  </a>

  <a
    href={doc.file_url}
    download={doc.original_name}
    className="px-3 py-1 bg-green-600 text-white rounded text-sm"
  >
    ⬇ Download
  </a>
</div>
      </div>
    ))}
  </div>
)}
      </div>
    ) : (
      documents.map((doc: any) => (
        <div
          key={doc.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div>
            📄 {doc.original_name}
          </div>

          <a
            href={doc.file_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#2563eb",
              color: "#fff",
              textDecoration: "none",
              padding: "8px 14px",
              borderRadius: "8px",
              fontWeight: 600,
            }}
          >
            Download
          </a>
        </div>
      ))
    )}
  </div>
)}
<h3
  style={{
    margin: "0 0 18px 0",
    color: "#0B4F84",
    fontSize: "17px",
    fontWeight: 700,
  }}
>
  📜 Activity Timeline
</h3>

<div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "14px",
  }}
>
  <button
    type="button"
    onClick={async () => {
      const ok = window.confirm(
        "Delete all activity history?"
      );

      if (!ok) return;

      const { error } = await supabase
        .from("work_record_history")
        .delete()
        .eq("work_record_id", String(record.id))

      if (error) {
        alert(error.message);
        return;
      }

      setHistory([]);

      alert("All activity history deleted.");
    }}
    style={{
      background: "#dc2626",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "8px 14px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "13px",
    }}
  >
    🗑 Delete All History
  </button>
</div>
<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "18px",
  }}
>
  {timelineCategories.map((category) => (
    <button
      key={category.key}
      type="button"
      onClick={() => setTimelineFilter(category.key)}
      style={{
        padding: "8px 14px",
        borderRadius: "999px",
        border:
          timelineFilter === category.key
            ? "1px solid #2563eb"
            : "1px solid #cbd5e1",
        background:
          timelineFilter === category.key ? "#2563eb" : "#ffffff",
        color:
          timelineFilter === category.key ? "#ffffff" : "#334155",
        fontSize: "13px",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {category.label}
    </button>
  ))}
</div>

<input
  type="text"
  placeholder="Search timeline..."
  value={timelineSearch}
  onChange={(e) => setTimelineSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "10px 14px",
    marginBottom: "18px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    outline: "none",
    fontSize: "14px",
  }}
/>

 {filteredHistory.length === 0 ? (
    <div
      style={{
        textAlign: "center",
        color: "#64748b",
        padding: "25px",
      }}
    >
      No activity found.
    </div>
  ) : (  
        filteredHistory.map((item: any) => (
      <div
        key={item.id}
        style={{
          display: "flex",
          gap: "14px",
          paddingBottom: "18px",
          marginBottom: "18px",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: "#dbeafe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          {item.activity_type === "whatsapp"
            ? "📱"
            : item.activity_type === "email"
            ? "📧"
            : item.activity_type === "payment"
            ? "💰"
            : item.activity_type === "documents"
            ? "📄"
            : item.activity_type === "submitted"
            ? "🏛️"
            : "📝"}
        </div>
    <div
       style={{
       flex: 1,
       display: "flex",
       justifyContent: "space-between",
       gap: "12px",
       }}
       >
       <div style={{ flex: 1 }}>
  <div
    style={{
      fontWeight: 700,
      color: "#0f172a",
      fontSize: "15px",
      marginBottom: "6px",
    }}
  >
    {item.activity_title}
  </div>

  <div
    style={{
      color: "#475569",
      fontSize: "14px",
      marginBottom: "6px",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
    }}
  >
    {item.activity_message}
  </div>

  <div
    style={{
      color: "#94a3b8",
      fontSize: "12px",
    }}
  >
    {new Date(item.created_at).toLocaleString("en-IN")}
  </div>
</div>
<button
  type="button"
  onClick={() => handleDeleteHistory(item.id)}
  title="Delete Activity"
  style={{
    background: "#ef4444",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    width: "36px",
    height: "36px",
    cursor: "pointer",
    fontSize: "16px",
    flexShrink: 0,
  }}
>
  🗑
</button>
        </div>
      </div>
    ))
  )}
</div>
<div
className="no-print"
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "28px",
    paddingTop: "18px",
    borderTop: "1px solid #e2e8f0",
  }}
>
  <div
    style={{
      fontSize: "13px",
      color: "#64748b",
    }}
  >
    Last Updated: {record.updated_at || "-"}
  </div>

  <div
    style={{
      display: "flex",
      gap: "12px",
    }}
  >
    <button
  type="button"
  onClick={handlePrint}
  style={{
    background: "#ffffff",
    color: "#0B4F84",
    border: "1px solid #0B4F84",
    borderRadius: "8px",
    padding: "10px 18px",
    cursor: "pointer",
    fontWeight: 600,
  }}
>
  🖨 Print
</button>
    <button
  type="button"
  onClick={handleExportPDF}
  style={{
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    cursor: "pointer",
    fontWeight: 600,
  }}
>
  📄 Export PDF
</button>
  <button
  type="button"
  onClick={onClose}
  style={{
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    cursor: "pointer",
    fontWeight: 600,
  }}
>
  ❌ Close
</button>

  </div>
</div>
</div>
</div>
  );
}
