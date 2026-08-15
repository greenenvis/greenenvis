"use client";
import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { supabase } from "@/app/supabase";
import ViewWorkRecordModal from "@/app/components/daily-work/ViewWorkRecordModal";
import DailyWorkSummaryModal from "@/app/components/daily-work/DailyWorkSummaryModal";
import WorkRecordFormModal from "@/app/components/daily-work/WorkRecordFormModal";
import ComplianceWorkForm from "@/app/components/daily-work/ComplianceWorkForm";

const inputStyle = {
  width: "100%",
  height: "46px",
  padding: "12px 14px",
  border: "1px solid #dbe4ee",
  borderRadius: "8px",
  marginTop: "6px",
  fontSize: "15px",
  boxSizing: "border-box" as const,
};

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "14px",
  padding: "28px",
  marginBottom: "24px",
  boxShadow: "0 1px 3px rgba(15,23,42,0.08)",
};

const sectionTitleStyle = {
  margin: "0 0 18px 0",
  color: "#0B4F84",
  fontSize: "18px",
  fontWeight: 700,
};

const grid4Style = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "16px",
};

const grid12Style = {
  display: "grid",
  gridTemplateColumns: "2.6fr 1.3fr 1fr 2fr",
  gap: "16px",
  alignItems: "start",
};

const span8Style = {
  gridColumn: "span 6",
};

const span2Style = {
  gridColumn: "span 2",
};

const fullWidthStyle = {
  gridColumn: "span 2",
};

export default function DailyWorkRecordPage() {

const [showForm, setShowForm] = useState(false);
const [showDailySummaryModal, setShowDailySummaryModal] = useState(false);
const [summaryStyle, setSummaryStyle] = useState<"short" | "detailed">("short");
const [showFolderManager, setShowFolderManager] = useState(false);
const closeForm = () => {
  resetForm();
  setSelectedRecord(null);
  setIsEditMode(false);
  setShowForm(false);
};

const [formData, setFormData] = useState({
  inquiryDate: "",
  unitName: "",
  contactPerson: "",
  mobileNo: "",
  email: "",
  referenceName: "",

  inquiryType: "",
  scopeOfWork: "",
  priority: "Medium",
  status: "Pending",

  workDescription: "",
  clientReply: "",
  quotation: "",
  nextAction: "",
  workConfirm: "Pending",
  portalId: "",
  portalPassword: "",

  lastFollowUp: "",
  nextFollowUp: "",
  reminderDate: "",
  reminderTime: "",

    quotationAmount: "",
    advanceAmount: "",
    receivedAmount: "",
    balanceAmount: "",
    paymentStatus: "Pending",
    paymentMode: "",
    paymentDate: "",
    invoiceNo: "",
    receiptNo: "",
    folderId: "",

officeWorkType: "",
otherOfficeWork: "",
taskTitle: "",
taskDescription: "",
assignedTo: "",
dueDate: "",
remarks: "",
  });

const [isSaving, setIsSaving] = useState(false);
const [selectedDocuments, setSelectedDocuments] = useState<File[]>([]);
const [replaceDocument, setReplaceDocument] = useState<any>(null);
const replaceInputRef = useRef<HTMLInputElement>(null);
const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);
const [workRecords, setWorkRecords] = useState<any[]>([]);
const [searchText, setSearchText] = useState("");
const [statusFilter, setStatusFilter] = useState("All Status");
const [priorityFilter, setPriorityFilter] = useState("All Priority");
const [scopeFilter, setScopeFilter] = useState("All Scope");
const [paymentStatusFilter, setPaymentStatusFilter] = useState("All Payment Status");
const [selectedFolderId, setSelectedFolderId] = useState("all");
const [sortConfig, setSortConfig] = useState<{
  key: string;
  direction: "asc" | "desc";
}>({
  key: "created_at",
  direction: "desc",
});
const [currentPage, setCurrentPage] = useState(1);
const [rowsPerPage, setRowsPerPage] = useState(10);
const [today, setToday] = useState(new Date());
const [workView, setWorkView] = useState<"all" | "client" | "office">("all");
const isOfficeWork = formData.inquiryType === "Office Work";
const isPersonalWork = formData.inquiryType === "Personal Work";
const isComplianceWork = !isOfficeWork && !isPersonalWork;
const [companyProfile, setCompanyProfile] = useState<any>(null);
const [folders, setFolders] = useState<
  {
    id: string;
    folder_name: string;
  }[]
>([]);

const [folderCounts, setFolderCounts] = useState<
  Record<string, number>
>({});

const [newFolderName, setNewFolderName] = useState("");
const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
const [showTransferDialog, setShowTransferDialog] = useState(false);
const [folderToDelete, setFolderToDelete] = useState<any>(null);
const [transferFolderId, setTransferFolderId] = useState("");
const startIndex = (currentPage - 1) * rowsPerPage;
const filteredRecords = [...workRecords]
  .sort((a: any, b: any) => {
    const aValue = a[sortConfig.key] ?? "";
    const bValue = b[sortConfig.key] ?? "";

    if (aValue < bValue)
      return sortConfig.direction === "asc" ? -1 : 1;

    if (aValue > bValue)
      return sortConfig.direction === "asc" ? 1 : -1;

    return 0;
  })
  .filter((record: any) => {
    const q = searchText.toLowerCase();

const matchesSearch =
  record.unit_name?.toLowerCase().includes(q) ||
  record.contact_person?.toLowerCase().includes(q) ||
  record.mobile?.toLowerCase().includes(q) ||
  record.scope_of_work?.toLowerCase().includes(q) ||
  record.reference_name?.toLowerCase().includes(q) ||
  record.task_title?.toLowerCase().includes(q) ||
  record.office_work_type?.toLowerCase().includes(q) ||
  record.assigned_to?.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "All Status" ||
      record.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All Priority" ||
      record.priority === priorityFilter;

    const matchesScope =
      scopeFilter === "All Scope" ||
      record.scope_of_work === scopeFilter ||
      record.office_work_type === scopeFilter;

    const matchesPayment =
      paymentStatusFilter === "All Payment Status" ||
      record.payment_status === paymentStatusFilter;

    const matchesFolder =
      selectedFolderId === "all" ||
      record.folder_id === selectedFolderId;
      const matchesWorkView =
      workView === "client"
    ? record.inquiry_type !== "Office Work"
    : workView === "office"
    ? record.inquiry_type === "Office Work"
    : true;

return (
  matchesSearch &&
  matchesStatus &&
  matchesPriority &&
  matchesScope &&
  matchesPayment &&
  matchesFolder &&
  matchesWorkView
);

});
useEffect(() => {
  console.log("WORK RECORDS =", workRecords);
  console.log("FILTERED RECORDS =", filteredRecords);
}, [workRecords, filteredRecords]);

const totalClients = filteredRecords.length;
const totalQuotation = filteredRecords.reduce(
  (sum, record) => sum + Number(record.quotation_amount || 0),
  0
);
const totalReceived = filteredRecords.reduce(
  (sum, record) => sum + Number(record.received_amount || 0),
  0
);
const totalBalance = totalQuotation - totalReceived;

const endIndex = startIndex + rowsPerPage;
const [dashboardSummary, setDashboardSummary] = useState({
  overdue: 0,
  today: 0,
  upcoming: 0,
  completed: 0,
});

const [showHistoryModal, setShowHistoryModal] = useState(false);

const [historyRecords, setHistoryRecords] = useState<any[]>([]);

const [historyLoading, setHistoryLoading] = useState(false);

const [historyTitle, setHistoryTitle] = useState("");

const todayReminders = filteredRecords.filter((record: any) => {
  if (!record.next_followup) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const followup = new Date(record.next_followup);
  followup.setHours(0, 0, 0, 0);

  return followup.getTime() === today.getTime();
});

const [selectedRecord, setSelectedRecord] = useState<any>(null);
const [showViewModal, setShowViewModal] = useState(false);
const closeViewModal = () => {
  setShowViewModal(false);
  setSelectedRecord(null);
};
const [isEditMode, setIsEditMode] = useState(false);

const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
) => {
  let { name, value } = e.target;
  const isReferenceOther =
  name === "referenceName" && value === "Other";

const isScopeOther =
  name === "scopeOfWork" && value === "Other";

if (isReferenceOther || isScopeOther) {
  const customValue = window.prompt("Please enter custom value:");

  if (customValue && customValue.trim() !== "") {
   value = customValue.trim();
  } else {
    return;
  }
}
const isOfficeWork = formData.inquiryType === "Office Work";
const isPersonalWork = formData.inquiryType === "Personal Work";
const isComplianceWork = !isOfficeWork && !isPersonalWork;
  setFormData((prev) => {
    const updated = {
      ...prev,
      [name]: value,
    };

    const quotation = Number(updated.quotationAmount || 0);
    const received = Number(updated.receivedAmount || 0);

    updated.balanceAmount = String(
      Math.max(quotation - received, 0)
    );
if (quotation === 0) {
  updated.paymentStatus = "Pending";
} else if (received <= 0) {
  updated.paymentStatus = "Pending";
} else if (received >= quotation) {
  updated.paymentStatus = "Paid";
} else {
  updated.paymentStatus = "Partial";
}
    return updated;
  });
};

const resetForm = () => {
  setFormData({
    inquiryDate: "",
    unitName: "",
    contactPerson: "",
    mobileNo: "",
    email: "",
    referenceName: "",

    inquiryType: "",
    scopeOfWork: "",
    priority: "Medium",
    status: "Pending",

    workDescription: "",
    clientReply: "",
    quotation: "",
    nextAction: "",
    workConfirm: "Pending",
    portalId: "",
    portalPassword: "",

    lastFollowUp: "",
    nextFollowUp: "",
    reminderDate: "",
    reminderTime: "",
    quotationAmount: "",
    advanceAmount: "",
    receivedAmount: "",
    balanceAmount: "",
    paymentStatus: "Pending",
    paymentMode: "",
    paymentDate: "",
    invoiceNo: "",
    receiptNo: "",
    folderId: "",

officeWorkType: "",
otherOfficeWork: "",
taskTitle: "",
taskDescription: "",
assignedTo: "",
dueDate: "",
remarks: "",

  });
};
const handleAddFolder = async () => {
  const folderName = newFolderName.trim();

  if (!folderName) {
    alert("Please enter a folder name.");
    return;
  }

  const exists = folders.some(
    (f) => f.folder_name.toLowerCase() === folderName.toLowerCase()
  );

  if (exists) {
    alert("Folder already exists.");
    return;
  }

  const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  alert("Please login again.");
  return;
}

const { data, error } = await supabase
  .from("work_folders")
  .insert({
    folder_name: folderName,
    user_id: user.id,
  })
  .select()
  .single();

  if (error) {
  console.error("ADD FOLDER ERROR =", error);
  alert(error.message);
  return;
}

  setFolders((prev) => [...prev, data]);
  setNewFolderName("");

};

const handleRenameFolder = async () => {
    
const folderName = newFolderName.trim();

  if (!editingFolderId) return;

  if (!folderName) {
    alert("Please enter folder name.");
    return;
  }

  const exists = folders.some(
    (f) =>
      f.id !== editingFolderId &&
      f.folder_name.toLowerCase() === folderName.toLowerCase()
  );

  if (exists) {
    alert("Folder already exists.");
    return;
  }

 const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  alert("Please login again.");
  return;
}

const { error } = await supabase
  .from("work_folders")
  .update({
    folder_name: folderName,
  })
  .eq("id", editingFolderId)
  .eq("user_id", user.id);

  if (error) {
    console.error(error);
    alert("Unable to rename folder.");
    return;
  }

  setFolders((prev) =>
    prev.map((f) =>
      f.id === editingFolderId
        ? { ...f, folder_name: folderName }
        : f
    )
  );

  setEditingFolderId(null);
  setNewFolderName("");
};

const fetchWorkRecords = async () => {
    const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  setWorkRecords([]);
  return;
}

const { data, error } = await supabase
.from("work_records")
.select("*")
.eq("user_id", user.id)
.order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  console.table(data);

  setWorkRecords(data || []);

  const today = new Date();
today.setHours(0, 0, 0, 0);

let overdue = 0;
let todayCount = 0;
let upcoming = 0;
let completed = 0;

// Dashboard Summary should use current selected tab
const summaryRecords = (data || []).filter((record: any) => {
  if (selectedFolderId !== "all" && record.folder_id !== selectedFolderId) {
    return false;
  }

  if (workView === "client") {
    return record.inquiry_type !== "Office Work";
  }

  if (workView === "office") {
    return record.inquiry_type === "Office Work";
  }

  return true;
});

summaryRecords.forEach((record: any) => {

  // Client / Office Tab Filter
  if (
    (workView === "client" && record.inquiry_type === "Office Work") ||
    (workView === "office" && record.inquiry_type !== "Office Work")
  ) {
    return;
  }
  if (record.status === "Completed") {
    completed++;
  }

 if (
  selectedFolderId !== "all" &&
  record.folder_id !== selectedFolderId
) {
  return;
} 

  // Office Work → Due Date
if (workView === "office") {

  if (!record.due_date) return;

  const dueDate = new Date(record.due_date);
  dueDate.setHours(0, 0, 0, 0);

  if (dueDate.getTime() === today.getTime()) {
    todayCount++;
  } else if (dueDate < today) {
    overdue++;
  } else {
    upcoming++;
  }

  return;
}

// Client Work → Next Follow-up
if (!record.next_followup) return;

const followup = new Date(record.next_followup);
followup.setHours(0, 0, 0, 0);

if (followup.getTime() === today.getTime()) {
  todayCount++;
} else if (followup < today) {
  overdue++;
} else {
  upcoming++;
}

});


setDashboardSummary({
  overdue,
  today: todayCount,
  upcoming,
  completed,
});

};

const handleDeleteFolder = async (folderId: string) => {
  const folder = folders.find((f) => f.id === folderId);

  if (!folder) return;

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  if (!currentUser) {
    alert("Please login again.");
    return;
  }

  const { count, error: countError } = await supabase
    .from("work_records")
    .select("*", { count: "exact", head: true })
    .eq("folder_id", folderId)
    .eq("user_id", currentUser.id);

  if (countError) {
    console.error(countError);
    alert("Unable to verify folder usage.");
    return;
  }

  if ((count || 0) > 0) {
    setFolderToDelete(folder);
    setTransferFolderId("");
    setShowTransferDialog(true);
    return;
  }

  if (!confirm(`Delete folder "${folder.folder_name}"?`)) return;

  const { error } = await supabase
    .from("work_folders")
    .delete()
    .eq("id", folderId)
    .eq("user_id", currentUser.id);

  if (error) {
    console.error(error);
    alert("Unable to delete folder.");
    return;
  }

  setFolders((prev) => prev.filter((f) => f.id !== folderId));

  alert("Folder deleted successfully.");
};

const handleTransferAndDelete = async () => {

  if (!folderToDelete || !transferFolderId) {
    alert("Please select a target folder.");
    return;
  }

  // Step-1 : Move all work records
  const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  alert("Please login again.");
  return;
}

const { error: updateError } = await supabase
  .from("work_records")
  .update({
    folder_id: transferFolderId,
  })
  .eq("folder_id", folderToDelete.id)
  .eq("user_id", user.id);

  if (updateError) {
    console.error(updateError);
    alert("Unable to transfer work records.");
    return;
  }

  console.log("UPDATE ERROR =", updateError);

  // Step-2 : Delete folder
  const { error: deleteError } = await supabase
  .from("work_folders")
  .delete()
  .eq("id", folderToDelete.id)
  .eq("user_id", user.id);

  if (deleteError) {
    console.error(deleteError);
    alert("Unable to delete folder.");
    return;
  }

  // Step-3 : Refresh folders
  const { data } = await supabase
    .from("work_folders")
    .select("id, folder_name")
    .order("folder_name");

  setFolders(data || []);
  await refreshFolderCounts();

  setShowTransferDialog(false);
  setFolderToDelete(null);
  setTransferFolderId("");

  alert("Folder transferred and deleted successfully.");
};

const refreshFolderCounts = async () => {
  const { data, error } = await supabase
    .from("work_records")
    .select("folder_id");

  if (error) {
    console.error(error);
    return;
  }

  const counts: Record<string, number> = {};

  (data || []).forEach((item: any) => {
    if (!item.folder_id) return;

    counts[item.folder_id] =
      (counts[item.folder_id] || 0) + 1;
  });

  setFolderCounts(counts);
};
 
const fetchFolders = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setFolders([]);
    return;
  }

  const { data, error } = await supabase
    .from("work_folders")
    .select("id, folder_name")
    .eq("user_id", user.id)
    .order("folder_name");

    console.log("USER =", user);
    console.log("DATA =", data);
    console.log("ERROR =", error);

  if (error) {
    console.error(error);
    return;
  }

  setFolders(data || []);
  await refreshFolderCounts();
};

const handleView = async (record: any) => {

  setSelectedRecord({
    ...record,
    company_logo: companyProfile?.company_logo || "",
    office_work_type: record.office_work_type || "",
    other_office_work: record.other_office_work || "",
    task_title: record.task_title || "",
    task_description: record.task_description || "",
    assigned_to: record.assigned_to || "",
    due_date: record.due_date || "",
    remarks: record.remarks || "",
  });

  setShowViewModal(true);
};

const handleEdit = (record: any) => {
  setSelectedRecord({ ...record });
  setIsEditMode(true);
  setShowForm(true);
  setFormData({
    inquiryDate: record.inquiry_date || "",
    unitName: record.unit_name || "",
    contactPerson: record.contact_person || "",
    mobileNo: record.mobile || "",
    email: record.email || "",
    referenceName: record.reference_name || "",

    inquiryType: record.inquiry_type || "",
    scopeOfWork: record.scope_of_work || "",
    priority: record.priority || "Medium",
    status: record.status || "Pending",

    workDescription: record.work_description || "",
    clientReply: record.client_reply || "",
    quotation: String(record.quotation_amount || ""),
    nextAction: record.next_action || "",
    workConfirm: record.work_confirm || "Pending",
    portalId: record.portal_id || "",
    portalPassword: record.portal_password || "",
    
    lastFollowUp: record.last_followup || "",
    nextFollowUp: record.next_followup || "",
    reminderDate: record.reminder_date || "",
    reminderTime: record.reminder_time || "",
    quotationAmount: String(record.quotation_amount || ""),
    advanceAmount: String(record.advance_amount || ""),
    receivedAmount: String(record.received_amount || ""),
    balanceAmount: String(record.balance_amount || ""),
    paymentStatus: record.payment_status || "Pending",
    paymentMode: record.payment_mode || "",
    paymentDate: record.payment_date || "",
    invoiceNo: record.invoice_no || "",
    receiptNo: record.receipt_no || "",
    folderId: record.folder_id || "",
    officeWorkType: record.office_work_type || "",
    otherOfficeWork: record.other_office_work || "",
    taskTitle: record.task_title || "",
    taskDescription: record.task_description || "",
    assignedTo: record.assigned_to || "",
    dueDate: record.due_date || "",
    remarks: record.remarks || "",
  });

  setShowForm(true);

(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  supabase
    .from("work_record_documents")
    .select("*")
    .eq("work_record_id", record.id)
    .eq("user_id", user.id)
    .order("uploaded_at", { ascending: false })
    .then(({ data, error }) => {
      console.log("Record ID:", record.id);
      console.log("Documents Data:", data);
      console.log("Documents Error:", error);

      if (error) {
        console.error(error);
        return;
      }

      console.log("DOCUMENTS =", JSON.stringify(data, null, 2));
      setUploadedDocuments(data || []);
    });
})();

};

const handleReplaceDocument = (doc: any) => {
  setReplaceDocument(doc);

  if (replaceInputRef.current) {
    replaceInputRef.current.value = "";
    replaceInputRef.current.click();
  }
};

const handleReplaceFileSelected = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file || !replaceDocument) return;

  console.log("REPLACE DOCUMENT =", replaceDocument);
  console.log("REPLACE ID =", replaceDocument.id);
  console.log("TYPE OF ID =", typeof replaceDocument.id);
  console.log("NEW FILE =", file.name);

  const newFileName = `${Date.now()}-${file.name}`;

const { error: uploadError } = await supabase.storage
  .from("work-record-documents")
  .upload(newFileName, file);

if (uploadError) {
  alert(uploadError.message);
  return;
}

// Upload completed

const { data } = supabase.storage
  .from("work-record-documents")
  .getPublicUrl(newFileName);
console.log("UPDATE USING ID =", replaceDocument.id);
const { data: updatedRows, error: updateError } = await supabase
  .from("work_record_documents")
  .update({
    file_name: newFileName,
    original_name: file.name,
    file_url: data.publicUrl,
    file_size: file.size,
    file_type: file.type,
  })
  .eq("id", replaceDocument.id)
  .select("*");

console.log("UPDATED ROWS =", updatedRows);
console.log("ROW COUNT =", updatedRows?.length);

console.log("UPDATED ROWS =", updatedRows);
console.log("UPDATE USING ID =", replaceDocument.id);

const { data: checkRow } = await supabase
  .from("work_record_documents")
  .select("id")
  .eq("id", replaceDocument.id);

console.log("CHECK ROW =", checkRow);
console.log("UPDATE ERROR =", updateError);

if (updateError) {
  alert(updateError.message);
  return;
}

console.log("NEW FILE NAME =", newFileName);
console.log("NEW FILE URL =", data.publicUrl);

console.log("UPDATE SUCCESS");
console.log("UPDATED FILE URL =", data.publicUrl);

const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) return;

const { data: refreshedDocuments, error: refreshError } = await supabase
  .from("work_record_documents")
  .select("*")
  .eq("work_record_id", replaceDocument.work_record_id)
  .eq("user_id", user.id)
  .order("uploaded_at", { ascending: false });

if (!refreshError) {
  setUploadedDocuments(refreshedDocuments || []);
  console.log("REFRESHED DOCUMENTS =", refreshedDocuments);
}

setReplaceDocument(null);

alert("✅ New file uploaded successfully.");

};

const handleDeleteDocument = async (doc: any) => {
  const ok = window.confirm(
    `Are you sure you want to delete "${doc.original_name}"?`
  );

  if (!ok) return;

  try {
    // 1. Delete from Storage
    const { error: storageError } = await supabase.storage
      .from("work-record-documents")
      .remove([doc.file_name]);

    if (storageError) throw storageError;

    // 2. Delete from Database
    const { data: deletedRows, error: dbError } = await supabase
  .from("work_record_documents")
  .delete()
  .eq("id", doc.id)
  .select();

console.log("DELETED ROWS =", deletedRows);
console.log("DELETE DB ERROR =", dbError);

console.log("DELETE DOC ID =", doc.id);
const { data: checkData } = await supabase
  .from("work_record_documents")
  .select("id")
  .eq("id", doc.id);

console.log("CHECK BEFORE DELETE =", checkData);
console.log("DELETE DB ERROR =", dbError);

    if (dbError) throw dbError;

    // 3. Refresh UI
    setUploadedDocuments((prev: any[]) =>
      prev.filter((item) => item.id !== doc.id)
    );

const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) return;

const { data, error } = await supabase
  .from("work_record_documents")
  .select("*")
  .eq("work_record_id", doc.work_record_id)
  .eq("user_id", user.id)
  .order("uploaded_at", { ascending: false });

if (!error) {
  setUploadedDocuments(data || []);
}

await addHistory(
  doc.work_record_id,
  "document_deleted",
  "Document Deleted",
  `Deleted document: ${doc.original_name}`

);

alert("✅ Document deleted successfully.");
console.log("STORAGE DELETE ERROR =", storageError);
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const handleDelete = async (id: string) => {
  const ok = confirm("Delete this work record?");

  if (!ok) return;
const recordToDelete = workRecords.find((r) => r.id === id);
if (!recordToDelete) {
  alert("Record not found.");
  return;
}

if (recordToDelete) {
  await addHistory(
    recordToDelete.id,
    "deleted",
    "Work Record Deleted",
    `Unit: ${recordToDelete.unit_name}
Contact: ${recordToDelete.contact_person}
Status: ${recordToDelete.status}`
  );
}

await addHistory(
  recordToDelete.id,
  "deleted",
  "Work Record Deleted",
  `Unit: ${recordToDelete.unit_name}
Contact: ${recordToDelete.contact_person || "-"}
Status: ${recordToDelete.status || "-"}
Payment Status: ${recordToDelete.payment_status || "-"}`
);

const {
  data: { user },
} = await supabase.auth.getUser();

const { error: deletedHistoryError } = await supabase
  .from("work_record_deleted_history")
  .insert({
    user_id: user?.id ?? null,
    work_record_id: selectedRecord.id,
    deleted_by: user?.id ?? null,
    deleted_at: new Date().toISOString(),
    unit_name: selectedRecord.unit_name,
    contact_person: selectedRecord.contact_person,
    mobile: selectedRecord.mobile,
    email: selectedRecord.email,
    scope_of_work: selectedRecord.scope_of_work,
    folder_name: selectedRecord.folder_name,
    payment_status: selectedRecord.payment_status,
    status: selectedRecord.status,
    remarks: selectedRecord.remarks,
    deleted_reason: "Deleted from Work Records",
  });

if (deletedHistoryError) {
  console.error("Delete History Error:", deletedHistoryError);

  // Continue deleting the record even if history insert fails
}

  const { error } = await supabase
    .from("work_records")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }
  await fetchWorkRecords();
  console.log("========== FETCH COMPLETED ==========");
  alert("Record Deleted Successfully");
  await refreshFolderCounts();
};

const exportToPDF = () => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Daily Work Report", 148, 15, { align: "center" });

  const rows = filteredRecords.map((r: any, index: number) => [
    index + 1,
    r.inquiry_date || "",
    r.unit_name || "",
    r.contact_person || "",
    r.mobile || "",
   r.inquiry_type === "Office Work"
  ? (r.office_work_type === "Other"
      ? r.other_office_work
      : r.office_work_type)
  : r.scope_of_work || "",
   r.inquiry_type === "Office Work"
  ? (r.status || "-")
  : (r.status || ""),
    r.priority || "",
    Number(r.quotation_amount || 0).toLocaleString("en-IN"),
    r.payment_status || "",
    r.next_followup || "",
  ]);

  autoTable(doc, {
  startY: 22,

  head: [[
    "Sr",
    "Date",
    "Unit Name",
    "Contact",
    "Mobile",
    "Scope",
    "Status",
    "Priority",
    "Quotation",
    "Payment",
    "Next Follow-up",
  ]],

  body: rows,

  theme: "grid",

  styles: {
    fontSize: 8,
    cellPadding: 2,
    overflow: "linebreak",
    valign: "middle",
    lineColor: [220, 220, 220],
    lineWidth: 0.2,
  },

  headStyles: {
    fillColor: [11, 79, 132],
    textColor: [255, 255, 255],
    fontStyle: "bold",
    halign: "center",
    valign: "middle",
  },

  alternateRowStyles: {
    fillColor: [248, 250, 252],
  },

  columnStyles: {
    0: { cellWidth: 10, halign: "center" },
    1: { cellWidth: 20 },
    2: { cellWidth: 42 },
    3: { cellWidth: 30 },
    4: { cellWidth: 24 },
    5: { cellWidth: 45 },
    6: { cellWidth: 20, halign: "center" },
    7: { cellWidth: 18, halign: "center" },
    8: { cellWidth: 24, halign: "right" },
    9: { cellWidth: 22, halign: "center" },
    10: { cellWidth: 28 },
  },

  didDrawPage: () => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Daily Work Report", pageWidth / 2, 15, {
      align: "center",
    });

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    doc.text(
      `Generated On : ${new Date().toLocaleString("en-IN")}`,
      14,
      pageHeight - 8
    );

    const pageNumber = doc.getCurrentPageInfo().pageNumber;

    doc.text(
      `Page ${pageNumber}`,
      pageWidth - 20,
      pageHeight - 8,
      {
        align: "right",
      }
    );
  },
});

  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  doc.text(
    `Generated On : ${new Date().toLocaleString("en-IN")}`,
    14,
    pageHeight - 8
  );

  doc.save("Daily_Work_Report.pdf");
};
const exportToExcel = () => {
  const data = filteredRecords.map((r: any, index: number) => ({
    "Sr. No": index + 1,
    "Inquiry Date": r.inquiry_date || "",
    "Unit Name": r.unit_name || "",
    "Contact Person": r.contact_person || "",
    "Mobile": r.mobile || "",
    "Reference Name": r.reference_name || "",
    "Scope of Work":
  r.inquiry_type === "Office Work"
    ? (r.office_work_type === "Other"
        ? r.other_office_work
        : r.office_work_type)
    : r.scope_of_work || "",
    "Client Reply": r.client_reply || "",
    "Work Confirm": r.work_confirm || "",
    "Next Action": String(r.next_action || "").replace(/[^\x20-\x7E]/g, "").trim(),
    "Portal ID": r.portal_id || "",
    "Portal Password": r.portal_password || "",
    "Status":
  r.inquiry_type === "Office Work"
    ? (r.status || "-")
    : (r.status || ""),
    "Priority": r.priority || "",
    "Payment Status": r.payment_status || "",
    "Quotation Amount": Number(r.quotation_amount || 0),
    "Received Amount": Number(r.received_amount || 0),
    "Balance Amount": Number(r.balance_amount || 0),
    "Next Follow-up": r.next_followup || "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  worksheet["!cols"] = [
    { wch: 8 },
    { wch: 15 },
    { wch: 35 },
    { wch: 25 },
    { wch: 18 },
    { wch: 22 },
    { wch: 35 },
    { wch: 20 },
    { wch: 18 },
    { wch: 25 },
    { wch: 22 },
    { wch: 22 },
    { wch: 16 },
    { wch: 14 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
  ];

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Daily Work Report"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(blob, `Daily_Work_Report_${Date.now()}.xlsx`);
};

const getPendingActionMessage = (action: string) => {
  const cleanAction = String(action || "")
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, "")
    .trim();

  switch (cleanAction) {
    case "Call Client":
      return "Kindly let us know a convenient time so that we can discuss your project.";

    case "Collect Documents":
      return "Kindly share the pending documents required for processing your application.";

    case "Collect Payment":
      return "Kindly release the pending payment so that we can continue the process.";

    case "Submit to GPCB":
      return "Your application is ready for submission. Kindly provide your approval to proceed.";

    case "Send Reminder":
      return "This is a friendly follow-up regarding your ongoing compliance work.";

    case "Factory Visit":
      return "Kindly confirm a convenient date and time for the factory visit.";

    case "Verify Digital Locker":
      return "Kindly verify your Digital Locker documents for further processing.";

    case "Upload Documents":
      return "Kindly upload the required documents to continue the compliance process.";

    default:
      return cleanAction;
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

  const serviceName =
    service ||
    "environmental compliance and regulatory work";

  const currentStatus = String(status || "").trim();
  const payment = String(paymentStatus || "").trim();

  const paragraphs: string[] = [];

  if (currentStatus === "In Progress") {
    paragraphs.push(
      `We would like to update you that your ${serviceName} is currently in progress. The relevant requirements and project details are being reviewed, and the necessary actions are being carried out for further processing.`
    );
  } else if (currentStatus === "Submitted") {
    paragraphs.push(
      `We would like to update you that your ${serviceName} has been submitted to the concerned authority. We will continue to monitor the progress and take the necessary action based on any further response or requirement.`
    );
  } else if (currentStatus === "Completed") {
    paragraphs.push(
      `We are pleased to inform you that your ${serviceName} work has been completed successfully.`
    );
  } else if (currentStatus === "On Hold") {
    paragraphs.push(
      `We would like to inform you that your ${serviceName} is currently on hold. Further processing will continue once the required matter is resolved.`
    );
  } else if (currentStatus === "Pending") {
    paragraphs.push(
      `Your ${serviceName} is currently pending for further processing. The required next steps will be taken based on the available project information and pending requirements.`
    );
  } else {
    paragraphs.push(
      `We would like to provide you with an update regarding your ${serviceName}. Our team is reviewing the current project requirements and will proceed with the necessary next steps accordingly.`
    );
  }

  if (pendingMessage) {
    paragraphs.push(pendingMessage);
  }

  if (payment === "Pending") {
    paragraphs.push(
      "Our records indicate that payment related to this service is pending. Kindly arrange the pending payment to avoid any delay in further processing."
    );
  } else if (payment === "Partially Paid") {
    paragraphs.push(
      "Partial payment has been received. Kindly arrange the remaining payment as applicable for the continuation of the service."
    );
  }

  return paragraphs.join("\n\n");
};

const addHistory = async (
  workRecordId: string,
  activityType: string,
  activityTitle: string,
  activityMessage: string
) => {
 const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) return;

const { error } = await supabase
  .from("work_record_history")
  .insert({
    user_id: user.id,
    work_record_id: workRecordId,
    activity_type: activityType,
    activity_title: activityTitle,
    activity_message: activityMessage,
  });

  if (error) {
    console.error("History Error:", error);
  }
};

const uploadOfficeDocuments = async () => {
    const {
  data: { session },
} = await supabase.auth.getSession();

const uploadReplacementDocument = async (file: File) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("work-record-documents")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("work-record-documents")
    .getPublicUrl(fileName);

  return {
    file_name: fileName,
    original_name: file.name,
    file_url: data.publicUrl,
    file_size: file.size,
    file_type: file.type,
  };
};

if (!session) {
  console.log("No Supabase Session - skipping auth check");
  
}

console.log("SUPABASE SESSION =", session);
  if (selectedDocuments.length === 0) return [];

  const uploadedFiles: any[] = [];

  for (const file of selectedDocuments) {
    const fileName = `${Date.now()}-${file.name}`;

    console.log("UPLOAD FILE NAME =", fileName);
    console.log("ORIGINAL FILE =", file.name);

    const { error } = await supabase.storage
      .from("work-record-documents")
      .upload(fileName, file);

    console.log("UPLOADED OBJECT =", fileName);

    if (error) {
      throw error;
    }

    const { data } = supabase.storage
  .from("work-record-documents")
  .getPublicUrl(fileName);

uploadedFiles.push({
  file_name: fileName,
  original_name: file.name,
  file_url: data.publicUrl,
  file_size: file.size,
  file_type: file.type,
});

}

  return uploadedFiles;
};

const handleSave = async () => {
  try {
    setIsSaving(true);

const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  alert("Please login again.");
  return;
}

    console.log("========== SAVE START ==========");
    console.log("isEditMode =", isEditMode);
    console.log("selectedRecord =", selectedRecord);

    const payload = {
      inquiry_date: formData.inquiryDate || null,
      unit_name: formData.unitName,
      contact_person: formData.contactPerson,
      mobile: formData.mobileNo,
      email: formData.email || null,
      reference_name: formData.referenceName,

      inquiry_type: formData.inquiryType,
      scope_of_work:
      formData.inquiryType === "Office Work"
      ? null
      : formData.scopeOfWork,

      work_description: formData.workDescription,
      client_reply:
      formData.inquiryType === "Office Work"
      ? null
      : formData.clientReply,
      
      next_action:
      formData.inquiryType === "Office Work"
      ? null
      : formData.nextAction,

      work_confirm:
      formData.inquiryType === "Office Work"
      ? null
      : formData.workConfirm,

      portal_id: formData.portalId,
      portal_password: formData.portalPassword,

      priority:
      formData.inquiryType === "Office Work"
      ? null
      : formData.priority,
      status: formData.status,

      last_followup: formData.lastFollowUp || null,
      next_followup: formData.nextFollowUp || null,
      reminder_date: formData.reminderDate || null,
      reminder_time: formData.reminderTime || null,

            quotation_amount:
        formData.quotationAmount === ""
          ? null
          : Number(formData.quotationAmount),

      advance_amount:
        formData.advanceAmount === ""
          ? null
          : Number(formData.advanceAmount),

      received_amount:
        formData.receivedAmount === ""
          ? null
          : Number(formData.receivedAmount),

      balance_amount:
        formData.balanceAmount === ""
          ? null
          : Number(formData.balanceAmount),

      payment_status: formData.paymentStatus,

      payment_mode:
        formData.paymentMode || null,

      payment_date:
        formData.paymentDate || null,

      invoice_no:
        formData.invoiceNo || null,

      receipt_no: formData.receiptNo || null,
      folder_id: formData.folderId || null,

      office_work_type: formData.officeWorkType || null,
      other_office_work: formData.otherOfficeWork || null,
      task_title: formData.taskTitle || null,
      task_description: formData.taskDescription || null,
      assigned_to: formData.assignedTo || null,
      due_date: formData.dueDate || null,
      remarks: formData.remarks || null,
      user_id: user.id,
    };

  if (
  isEditMode &&
  selectedRecord &&
  selectedRecord.status !== formData.status
) 
if (
  isEditMode &&
  selectedRecord &&
  selectedRecord.assigned_to !== formData.assignedTo
) 

{
  await addHistory(
    selectedRecord.id,
    "assigned_to",
    "Assigned To Changed",
    `${selectedRecord.assigned_to || "Not Assigned"} → ${formData.assignedTo || "Not Assigned"}`
  );
}
if (
  isEditMode &&
  selectedRecord &&
  selectedRecord.due_date !== formData.dueDate
) {
  await addHistory(
    selectedRecord.id,
    "due_date",
    "Due Date Changed",
    `${selectedRecord.due_date || "Not Set"} → ${formData.dueDate || "Not Set"}`
  );
  if (
  isEditMode &&
  selectedRecord &&
  selectedRecord.remarks !== formData.remarks
) {
  await addHistory(
    selectedRecord.id,
    "remarks",
    "Remarks Updated",
    `${selectedRecord.remarks || "No Remarks"} → ${formData.remarks || "No Remarks"}`
  );
  if (
  isEditMode &&
  selectedRecord &&
  selectedRecord.task_title !== formData.taskTitle
) {
  await addHistory(
    selectedRecord.id,
    "task_title",
    "Task Title Changed",
    `${selectedRecord.task_title || "Not Set"} → ${formData.taskTitle || "Not Set"}`
  );
  if (
  isEditMode &&
  selectedRecord &&
  selectedRecord.office_work_type !== formData.officeWorkType
) {
  await addHistory(
    selectedRecord.id,
    "office_work_type",
    "Office Work Type Changed",
    `${selectedRecord.office_work_type || "Not Set"} → ${formData.officeWorkType || "Not Set"}`
  );
}
}
}
}
if (
  isEditMode &&
  selectedRecord &&
  selectedRecord.status !== formData.status
) {
  await addHistory(
    selectedRecord.id,
    "status",
    "Status Changed",
    `${selectedRecord.status} → ${formData.status}`
  );
}

if (
  isEditMode &&
  selectedRecord &&
  selectedRecord.payment_status !== formData.paymentStatus
) {
  await addHistory(
    selectedRecord.id,
    "payment",
    "Payment Status Changed",
    `${selectedRecord.payment_status} → ${formData.paymentStatus}`
  );
}

if (
  isEditMode &&
  selectedRecord &&
  selectedRecord.next_followup !== formData.nextFollowUp
) {
  await addHistory(
    selectedRecord.id,
    "followup",
    "Next Follow-up Changed",
    `${selectedRecord.next_followup || "Not Set"} → ${formData.nextFollowUp || "Not Set"}`
  );
}

if (
  isEditMode &&
  selectedRecord &&
  selectedRecord.next_action !== formData.nextAction
) {
  await addHistory(
    selectedRecord.id,
    "next_action",
    "Next Action Changed",
    `${selectedRecord.next_action || "Not Set"} → ${formData.nextAction || "Not Set"}`
  );
}

if (
  isEditMode &&
  selectedRecord &&
  Number(selectedRecord.received_amount || 0) !==
    Number(formData.receivedAmount || 0)
) {
  await addHistory(
    selectedRecord.id,
    "received_amount",
    "Received Amount Updated",
    `₹${Number(selectedRecord.received_amount || 0).toLocaleString(
      "en-IN"
    )} → ₹${Number(formData.receivedAmount || 0).toLocaleString("en-IN")}`
  );
}

if (
  isEditMode &&
  selectedRecord &&
  Number(selectedRecord.quotation_amount || 0) !==
    Number(formData.quotationAmount || 0)
) {
  await addHistory(
    selectedRecord.id,
    "quotation_amount",
    "Quotation Amount Updated",
    `₹${Number(selectedRecord.quotation_amount || 0).toLocaleString(
      "en-IN"
    )} → ₹${Number(formData.quotationAmount || 0).toLocaleString("en-IN")}`
  );
}

console.log("New Next Action =", formData.nextAction);

console.log("Old Status =", selectedRecord?.status);
console.log("New Status =", formData.status);

console.log("Old Quotation =", selectedRecord?.quotation_amount);
console.log("New Quotation =", formData.quotationAmount);

console.log(
  "Quotation Changed =",
  Number(selectedRecord?.quotation_amount || 0) !==
    Number(formData.quotationAmount || 0)
);

    let error = null;

if (isEditMode && selectedRecord) {
   const result = await supabase
  .from("work_records")
  .update(payload)
  .eq("id", selectedRecord.id)
  .select();

console.log("UPDATE RESULT =", result);

error = result.error;
    } else {
      const result = await supabase
        .from("work_records")
        .insert([payload]);

      error = result.error;
    }

    if (error) throw error;

// Upload documents only after Work Record is saved
if (selectedDocuments.length > 0) {
  let workRecordId = selectedRecord?.id;

  // New Record
  if (!workRecordId) {
    const { data: latestRecord, error: latestError } = await supabase
      .from("work_records")
      .select("id")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (latestError) throw latestError;

    workRecordId = latestRecord.id;
  }

  let uploadedFiles = [];

try {
  uploadedFiles = await uploadOfficeDocuments();
} catch (err) {
  console.error("UPLOAD ERROR =", err);
  alert(JSON.stringify(err, null, 2));
  throw err;
}

  if (uploadedFiles.length > 0) {
    const documents = uploadedFiles.map((file) => ({
  work_record_id: workRecordId,
  user_id: user.id,
  file_name: file.file_name,
  original_name: file.original_name,
  file_url: file.file_url,
  file_size: file.file_size,
  file_type: file.file_type,
}));

const result = await supabase
  .from("work_record_documents")
  .insert(documents);

console.log("DOCUMENT INSERT RESULT =", result);

if (result.error) {
  console.error(result.error);
  alert(JSON.stringify(result.error, null, 2));
  throw result.error;
}
}
  setSelectedDocuments([]);
}

if (isEditMode && selectedRecord) {
  await addHistory(
    selectedRecord.id,
    "updated",
    "Work Record Updated",
    "Client work record has been updated."
  );
} else {
  const { data: latestRecord } = await supabase
    .from("work_records")
    .select("id")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (latestRecord) {
    await addHistory(
      latestRecord.id,
      "created",
      "Work Record Created",
      "New client work record created."
    );
  }
}

const { data: refreshedData, error: refreshError } = await supabase
  .from("work_records")
  .select("*")
  .order("created_at", { ascending: false });

if (!refreshError) {
  await fetchWorkRecords();
  await refreshFolderCounts();
}

resetForm();
    setShowForm(false);
    setIsEditMode(false);
    setSelectedRecord(null);

    alert("✅ Work Record Saved Successfully.");
  } catch (error: any) {
    console.error(error);
    alert(error.message || "Unknown Error");
  } finally {
    setIsSaving(false);
  }
};

const loadHistory = async (
  workRecordId: string,
  title: string
) => {
  setHistoryLoading(true);

  setHistoryTitle(title);
  setShowHistoryModal(true);

  const { data, error } = await supabase
    .from("work_record_history")
    .select("*")
    .eq("work_record_id", workRecordId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    setHistoryRecords([]);
  } else {
    setHistoryRecords(data || []);
  }

  setHistoryLoading(false);
};

useEffect(() => {
fetchWorkRecords();
fetchFolders();

const fetchCompanyProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setCompanyProfile(null);
    return;
  }

  const { data, error } = await supabase
    .from("industry_profile")
    .select("industry_name, company_logo")
    .eq("user_id", user.id)
    .maybeSingle();

  console.log("ERROR =", error);
  console.log("DATA =", data);

  setCompanyProfile(data || null);

  console.log("Company Profile =", data);
};

fetchCompanyProfile();
}, []);

useEffect(() => {
  fetchWorkRecords();
}, [selectedFolderId, workView]);

useEffect(() => {
  const interval = setInterval(() => {
    setToday(new Date());
  }, 60000); // Every 1 minute

  return () => clearInterval(interval);
}, []);

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1
        style={{
          color: "#0B4F84",
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Daily Work Record
      </h1>

      <p
        style={{
          color: "#666",
          marginBottom: "30px",
        }}
      >
        Manage Daily Work, Follow-ups, Pending Documents and Reminders
      </p>
{todayReminders.length > 0 && (
  <div
    style={{
      background: "#fff8e1",
      border: "2px solid #f59e0b",
      borderRadius: "12px",
      padding: "18px",
      marginBottom: "25px",
    }}
  >
    <h3
      style={{
        margin: 0,
        marginBottom: "15px",
        color: "#b45309",
      }}
    >
      🔔 Today's Reminders ({todayReminders.length})
    </h3>

    {todayReminders.map((item: any) => (
      <div
        key={item.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 0",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div>
          <div style={{ fontWeight: 700 }}>
            {item.unit_name}
          </div>

          <div>{item.contact_person}</div>

          <div>{item.mobile}</div>

          <div style={{ color: "#2563eb" }}>
            {item.next_action}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={async () => {
                const {
                  data: { user },
                } = await supabase.auth.getUser();

                if (!user) {
                  alert("Please login again.");
                  return;
                }

                const { data: profile, error } = await supabase
                  .from("industry_profile")
                  .select("industry_name")
                  .eq("user_id", user.id)
                  .maybeSingle();

if (error) {
  console.error(error);
  alert("Industry Profile not found.");
  return;
}

const service =
  item.scope_of_work ||
  item.task_title ||
  item.work_description ||
  "Compliance Service";

const pendingMessage = getPendingActionMessage(item.next_action);

const serviceMessage = getServiceMessage(
  item.scope_of_work,
  pendingMessage,
  item.status,
  item.payment_status
);

const msg = `Dear ${item.contact_person},

Company :
${item.unit_name}

Service :
${item.scope_of_work}

${serviceMessage}

Thank You,

${profile?.industry_name || ""}`;

alert("Before History Insert");

console.log("Before History Insert");

if (!user) return;

const { error: historyError } = await supabase
  .from("work_record_history")
  .insert({
    user_id: user.id,
    work_record_id: item.id,
    activity_type: "whatsapp",
    activity_title: "WhatsApp Reminder Opened",
    activity_message: `WhatsApp reminder opened for ${item.contact_person}`,
  });

alert("After History Insert");
console.log("After History Insert");
console.log("History Error =", historyError);
window.open(
  `https://wa.me/91${item.mobile}?text=${encodeURIComponent(msg)}`,
  "_blank"
);
            }}
            style={{
              background: "#25D366",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 16px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            🟢 WhatsApp
          </button>

          <button
            onClick={async () => {
                const {
                  data: { user: currentUser },
                } = await supabase.auth.getUser();

                if (!currentUser) {
                  alert("Please login again.");
                  return;
                }

                const { data: profile, error } = await supabase
                  .from("industry_profile")
                  .select("industry_name")
                  .eq("user_id", currentUser.id)
                  .maybeSingle();

if (error) {
  console.error(error);
  alert("Industry Profile not found.");
  return;
}
const subject = `Reminder - ${item.scope_of_work}`;

const pendingMessage = getPendingActionMessage(item.next_action);

const serviceMessage = getServiceMessage(
  item.scope_of_work,
  pendingMessage,
  item.status,
  item.payment_status
);

const msg = `Dear ${item.contact_person},

Company :
${item.unit_name}

Service :
${item.scope_of_work}

${serviceMessage}

Thank You,

${profile?.industry_name || ""}`;

if (!currentUser) return;

await supabase
  .from("work_record_history")
  .insert({
    user_id: currentUser.id,
    work_record_id: item.id,
    activity_type: "email",
    activity_title: "Email Reminder Opened",
    activity_message: `Email reminder opened for ${item.contact_person}`,
  });

window.open(
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(item.email || "")}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`,
  "_blank"
);
            }}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 16px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            📧 Email
          </button>
        </div>
      </div>
    ))}
  </div>
)}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #dbe4ee",
          borderRadius: "12px",
          padding: "30px",
          minHeight: "420px",
        }}
      >

      <WorkRecordFormModal
       open={showForm}
       title={isEditMode ? "Edit Work Record" : "Add New Work"}
       onClose={() => {
       setShowForm(false);
       resetForm();
       setSelectedRecord(null);
       setIsEditMode(false);
       }}
      >

        <h2>Add New Work</h2>

        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <h2
    style={{
      margin: 0,
      color: "#0B4F84",
    }}
  >
    Daily Work Records
  </h2>

  <button
   onClick={() => {
  resetForm();
  setSelectedRecord(null);
  setIsEditMode(false);
  setShowForm(true);
}}
    style={{
      background: "#0B4F84",
      color: "#fff",
      border: "none",
      height: "44px",
      padding: "0 22px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "14px",
      transition: "0.2s",
      boxShadow: "0 2px 6px rgba(11,79,132,0.20)",
    }}
  >
    {showForm ? "✕ Close Form" : "+ Add New Work"}
  </button>
</div>
<>
  <div
  style={{
    ...cardStyle,
    marginTop: "20px",
  }}
  >
    <h3
  style={{
    margin: "0 0 24px 0",
    color: "#0B4F84",
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: "12px",
  }}
>
  Add New Work
</h3>

    <div
  style={{
  display: "grid",
  gridTemplateColumns: "repeat(5,minmax(220px,1fr))",
  gap: "16px",
}}
>

  <div>
    <label>Date of Inquiry</label>
    <input
     type="date"
     name="inquiryDate"
     value={formData.inquiryDate}
     onChange={handleChange}
     style={inputStyle}
     />
  </div>
<div>
  <label>Folder</label>

  <select
    name="folderId"
    value={(formData as any).folderId || ""}
    onChange={handleChange}
    style={inputStyle}
  >
    <option value="">Select Folder</option>

    {folders.map((folder) => (
      <option key={folder.id} value={folder.id}>
        {folder.folder_name}
      </option>
    ))}
  </select>
</div>
  <div>
    <label>Unit Name</label>
    <input
    type="text"
    name="unitName"
    value={formData.unitName}
    onChange={handleChange}
    placeholder="ABC Industries Pvt. Ltd."
    style={inputStyle}
    />
  </div>

  <div>
    <label>Contact Person</label>
    <input
    type="text"
    name="contactPerson"
    value={formData.contactPerson}
    onChange={handleChange}
    placeholder="Mr. Deepak Jain"
    style={inputStyle}
    />
  </div>

  <div>
    <label>Mobile No.</label>
    <input
   type="text"
   name="mobileNo"
   value={formData.mobileNo}
   onChange={handleChange}
   placeholder="+91xxxxxxxxxx"
   style={inputStyle}
   />
  </div>

<div>
  <label>Email</label>
  <input
    type="email"
    name="email"
    value={formData.email || ""}
    onChange={handleChange}
    placeholder="client@email.com"
    style={inputStyle}
  />
</div>

<div>
  <label>Reference Name</label>

  <select
    name="referenceName"
    value={
  [
    "Direct Client",
    "Existing Client",
    "Consultant",
    "Architect",
    "CA",
    "Industry Association",
    "Google",
    "LinkedIn",
    "Website",
    "WhatsApp",
    "Facebook",
    "Other",
  ].includes(formData.referenceName)
    ? formData.referenceName
    : "Other"
}
    onChange={handleChange}
    style={inputStyle}
    >
    <option value="">Select Reference</option>
    <option>Direct Client</option>
    <option>Existing Client</option>
    <option>Consultant</option>
    <option>Architect</option>
    <option>CA</option>
    <option>Industry Association</option>
    <option>Google</option>
    <option>LinkedIn</option>
    <option>Website</option>
    <option>WhatsApp</option>
    <option>Facebook</option>
    <option>Other</option>
  </select>
  {![
  "Direct Client",
  "Existing Client",
  "Consultant",
  "Architect",
  "CA",
  "Industry Association",
  "Google",
  "LinkedIn",
  "Website",
  "WhatsApp",
  "Facebook",
  "",
  "Other",
].includes(formData.referenceName) && (
  <input
    type="text"
    name="referenceName"
    value={formData.referenceName}
    onChange={handleChange}
    placeholder="Enter Reference Name"
    style={{ ...inputStyle, marginTop: "10px" }}
  />
)}
</div>
</div>
  </div>
<div
  style={{
    border: "1px dashed #cbd5e1",
    borderRadius: "10px",
    padding: "35px",
    minHeight: "260",
    textAlign: "center",
    color: "#64748b",
  }}
>
  <div
  style={{
  ...grid4Style,
  marginTop: "15px",
}}
>
  <div>
    <label>Inquiry Type</label>

    <select
  name="inquiryType"
  value={formData.inquiryType}
  onChange={handleChange}
  style={inputStyle}
>
      <option value="" disabled>
        Select Inquiry Type
      </option>
      <option>New Inquiry</option>
      <option>Existing Client</option>
      <option>Follow-up</option>
      <option>Reference</option>
      <option>Office Work</option>
      <option>Personal Work</option>
    </select>

{formData.inquiryType === "Office Work" && (
  <div>
    <label>Office Work Type</label>
    <select
      name="officeWorkType"
      value={(formData as any).officeWorkType}
      onChange={handleChange}
      style={inputStyle}
    >
<option value="">Select Office Work Type</option>
<option>Documentation</option>
<option>Printing & Scanning</option>
<option>Data Entry</option>
<option>Client Follow-up</option>
<option>Authority Follow-up</option>
<option>Accounts</option>
<option>Office Visit</option>
<option>Administration</option>
<option>HR & Recruitment</option>
<option>Meeting & Discussion</option>
<option>Training & Development</option>
<option>Inventory & Supplies</option>
<option>Email & Correspondence</option>
<option>IT Support & Troubleshooting</option>
<option>Courier Inward/Outward</option>
<option>Research & Planning</option>
<option>Quality Check & Review</option>
<option>Marketing & Sales</option>
<option>Graphic Design & Media</option>
<option>Break / Personal</option>
<option>Other</option>
    </select>

{(formData as any).officeWorkType === "Other" && (
  <div style={{ marginTop: "10px" }}>
    <label>Other Office Work</label>

    <input
      type="text"
      name="otherOfficeWork"
      value={(formData as any).otherOfficeWork}
      onChange={handleChange}
      placeholder="Enter Office Work"
      style={inputStyle}
    />
  </div>
)}
<div style={{ marginTop: "10px" }}>
  <label>Task Title <span style={{ color: "red" }}>*</span></label>

  <input
    type="text"
    name="taskTitle"
    value={(formData as any).taskTitle}
    onChange={handleChange}
    placeholder="Enter Task Title"
    style={inputStyle}
  />
</div>
<div style={{ marginTop: "10px" }}>
  <label>Assigned To</label>

  <input
    type="text"
    name="assignedTo"
    value={(formData as any).assignedTo}
    onChange={handleChange}
    placeholder="Employee Name"
    style={inputStyle}
  />
</div>
<div style={{ marginTop: "10px" }}>
  <label>Due Date</label>

  <input
    type="date"
    name="dueDate"
    value={(formData as any).dueDate}
    onChange={handleChange}
    style={inputStyle}
  />
</div>

<div style={{ marginTop: "10px" }}>
  <label>Task Description</label>

  <textarea
    name="taskDescription"
    value={(formData as any).taskDescription}
    onChange={handleChange}
    rows={4}
    placeholder="Enter Task Description"
    style={{
      ...inputStyle,
      resize: "vertical",
      minHeight: "100px",
    }}
  />
</div>
<div>

  <label>Work Status</label>

  <select
    name="status"
    value={formData.status}
    onChange={handleChange}
    style={inputStyle}
  >
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
    <option value="On Hold">On Hold</option>
  </select>
</div>

<div style={{ marginTop: "10px" }}>

  <label>Remarks</label>

  <textarea
    name="remarks"
    value={(formData as any).remarks}
    onChange={handleChange}
    rows={3}
    placeholder="Enter Remarks"
    style={{
      ...inputStyle,
      resize: "vertical",
      minHeight: "80px",
    }}
  />

<div style={{ marginTop: "16px" }}>
  <label>
    📎 Documents
  </label>

  <input
    type="file"
    id="officeDocuments"
    multiple
    style={{
      ...inputStyle,
      padding: "10px",
      height: "auto",
      cursor: "pointer",
    }}

    // હાલમાં માત્ર UI
    onChange={(e) => {
  const files = Array.from(e.target.files || []);
  setSelectedDocuments(files);
}}
  />

  <div
    style={{
      marginTop: "6px",
      fontSize: "12px",
      color: "#64748b",
    }}
  >
    You can select multiple files (PDF, Word, Excel, Images, etc.).
    {selectedDocuments.length > 0 && (
  <div
    style={{
      marginTop: "10px",
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "10px",
    }}
  > 
    <strong>Selected Files:</strong>

    {selectedDocuments.map((file, index) => (
      <div key={index} style={{ marginTop: "4px" }}>
        📄 {file.name}
      </div>
    ))}
  </div>
)}

{uploadedDocuments.length > 0 && (
  <div
    style={{
      marginTop: "12px",
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "10px",
    }}
  >

<input
  ref={replaceInputRef}
  type="file"
  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
  style={{ display: "none" }}
  onChange={handleReplaceFileSelected}
/>

    <strong>Uploaded Documents:</strong>
<div style={{ color: "red", marginTop: 8 }}>
  Total Documents: {uploadedDocuments.length}
</div>

    {uploadedDocuments.map((doc: any) => (
  <div
    key={doc.id}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "8px",
      padding: "8px 0",
      borderBottom: "1px solid #e5e7eb",
    }}
  >
    <span>📄 {doc.original_name}</span>

    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
      }}
    >
      <a
        href={doc.file_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        👁 View
      </a>

<button
  type="button"
  onClick={() => handleReplaceDocument(doc)}
  style={{
    border: "none",
    background: "transparent",
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: 600,
  }}
>
  🔄 Replace
</button>

      <button
        type="button"
        onClick={() => handleDeleteDocument(doc)}
        style={{
          border: "none",
          background: "transparent",
          color: "#dc2626",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        🗑 Delete
      </button>
    </div>
  </div>
))}

  </div>
)}
  </div>
</div>

</div>
  </div>
)}
  </div>  

{formData.inquiryType !== "Office Work" && (
<div>
    <label>Scope of Work</label>

    <select
  name="scopeOfWork"
  value={
  [
    "Consent to Establish (CTE)",
    "Consent to Operate (CCA)",
    "CCA Renewal",
    "Consolidated Consent & Authorization",
    "Hazardous Waste Authorization",
    "Biomedical Waste Authorization",
    "Plastic EPR",
    "Battery EPR",
    "E-Waste EPR",
    "Used Oil EPR",
    "Tyre EPR",
    "CGWA NOC",
    "CGWA Renewal",
    "Environmental Clearance (EC)",
    "EC Amendment",
    "Environmental Audit",
    "EIA Report",
    "EMP Report",
    "NABL Laboratory Setup",
    "Laboratory Consultancy",
    "Air Monitoring",
    "Water Monitoring",
    "Noise Monitoring",
    "Stack Monitoring",
    "Factory License",
    "Fire NOC",
    "ISO Consultancy",
    "ESG Reporting",
    "Sustainability Reporting",
    "Other",
  ].includes(formData.scopeOfWork)
    ? formData.scopeOfWork
    : "Other"
}
  onChange={handleChange}
  style={inputStyle}
>
  <option value="">Select Scope of Work</option>

  <optgroup label="GPCB">
    <option>Consent to Establish (CTE)</option>
    <option>Consent to Operate (CCA)</option>
    <option>CCA Renewal</option>
    <option>Consolidated Consent & Authorization</option>
    <option>Hazardous Waste Authorization</option>
    <option>Biomedical Waste Authorization</option>
  </optgroup>

  <optgroup label="EPR">
    <option>Plastic EPR</option>
    <option>Battery EPR</option>
    <option>E-Waste EPR</option>
    <option>Used Oil EPR</option>
    <option>Tyre EPR</option>
  </optgroup>

  <optgroup label="Water">
    <option>CGWA NOC</option>
    <option>CGWA Renewal</option>
  </optgroup>

  <optgroup label="Environment">
    <option>Environmental Clearance (EC)</option>
    <option>EC Amendment</option>
    <option>Environmental Audit</option>
    <option>EIA Report</option>
    <option>EMP Report</option>
  </optgroup>

  <optgroup label="Laboratory">
    <option>NABL Laboratory Setup</option>
    <option>Laboratory Consultancy</option>
  </optgroup>

  <optgroup label="Monitoring">
    <option>Air Monitoring</option>
    <option>Water Monitoring</option>
    <option>Noise Monitoring</option>
    <option>Stack Monitoring</option>
  </optgroup>

  <optgroup label="Other">
    <option>Factory License</option>
    <option>Fire NOC</option>
    <option>ISO Consultancy</option>
    <option>ESG Reporting</option>
    <option>Sustainability Reporting</option>
    <option>Other</option>
  </optgroup>
</select>
{![
  "",
  "Consent to Establish (CTE)",
  "Consent to Operate (CCA)",
  "CCA Renewal",
  "Consolidated Consent & Authorization",
  "Hazardous Waste Authorization",
  "Biomedical Waste Authorization",
  "Plastic EPR",
  "Battery EPR",
  "E-Waste EPR",
  "Used Oil EPR",
  "Tyre EPR",
  "CGWA NOC",
  "CGWA Renewal",
  "Environmental Clearance (EC)",
  "EC Amendment",
  "Environmental Audit",
  "EIA Report",
  "EMP Report",
  "NABL Laboratory Setup",
  "Laboratory Consultancy",
  "Air Monitoring",
  "Water Monitoring",
  "Noise Monitoring",
  "Stack Monitoring",
  "Factory License",
  "Fire NOC",
  "ISO Consultancy",
  "ESG Reporting",
  "Sustainability Reporting",
  "Other",
].includes(formData.scopeOfWork) && (
  <input
    type="text"
    name="scopeOfWork"
    value={formData.scopeOfWork}
    onChange={handleChange}
    placeholder="Enter Scope of Work"
    style={{ ...inputStyle, marginTop: "10px" }}
  />
)}
  </div>
  )}

{formData.inquiryType !== "Office Work" && (
<div>
    <label>Priority</label>

<select
  name="priority"
  value={formData.priority}
  onChange={handleChange}
  style={inputStyle}
>
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
      <option>Urgent</option>
    </select>
  </div>
)}

  {formData.inquiryType !== "Office Work" && (
<div>
    <label>Status</label>

    <select
  name="status"
  value={formData.status}
  onChange={handleChange}
  style={inputStyle}
>
      <option>Pending</option>
      <option>In Progress</option>
      <option>Waiting for Client reply</option>
      <option>Government Query</option>
      <option>Completed process</option>
    </select>
  </div>
  )}
</div>
</div>

{formData.inquiryType !== "Office Work" && (
<div>
    <label>Work Confirm</label>

    <select
  name="workConfirm"
  value={formData.workConfirm}
  onChange={handleChange}
  style={inputStyle}
>
     <option>Pending</option>
     <option>Confirmed</option>
     <option>Rejected</option>
     <option>Completed</option>
    </select>
  </div>
)}
<div
  style={{
  display: "grid",
  gridTemplateColumns: "3fr 1.2fr 1fr 2fr",
  gap: "16px",
  alignItems: "start",
  marginTop: "15px",
}}
>
 <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    marginTop: "25",
  }}
>
   
{/* Work Description */}

  {formData.inquiryType !== "Office Work" && (
<div>
    <label
      style={{
        fontWeight: 600,
        color: "#334155",
      }}
    >
      Work Description
    </label>

    <textarea
  name="workDescription"
  value={formData.workDescription}
  onChange={handleChange}
  rows={5}
  placeholder={`Examples:
• Prepared Environmental Clearance (EC) application and uploaded required documents.
• Followed up with GPCB regarding pending consent approval.
• Collected original documents from the client and verified compliance details.
• Completed Battery EPR annual return filing and submitted the application.`}
  style={{
    ...inputStyle,
    height: "140px",
    resize: "vertical",
  }}
/>
  </div>
)}

{/* Bottom Row */}

  <div
  style={{
    display:
  formData.inquiryType === "Office Work"
    ? "none"
    : "grid",

  gridTemplateColumns: "2fr 1.5fr 2fr",
    gap: "20px",
    alignItems: "end",
    marginTop: "24px",
  }}
>
    <div>
      <label>Client Reply</label>

      <select
  name="clientReply"
  value={formData.clientReply}
  onChange={handleChange}
  style={{
    ...inputStyle,
    height: "46px",
  }}
>
        <option value="">Select</option>
        <option>Busy</option>
        <option>Call Later</option>
        <option>Agreed</option>
        <option>No Response</option>
        <option>Rejected</option>
      </select>
    </div>

    <div>
      <label>Next Action</label>

   <select
  name="nextAction"
  value={formData.nextAction}
  onChange={handleChange}
  style={{
    ...inputStyle,
    height: "46px",
  }}
>
        <option value="">Select Next Action</option>
      <option>📞 Call Client</option>
<option>📞 Follow-up Call</option>
<option>📅 Schedule Meeting</option>
<option>🏭 Schedule Factory Visit</option>
<option>📄 Collect Pending Documents</option>
<option>📄 Collect Original Documents</option>
<option>📤 Upload Documents</option>
<option>✍️ Sign Documents</option>
<option>🔐 Verify Digital Signature</option>
<option>🆔 Verify Digital Locker</option>
<option>💰 Collect Advance Payment</option>
<option>💰 Collect Balance Payment</option>
<option>📋 Approve Quotation</option>
<option>📨 Check Email</option>
<option>🏛️ Submit Application</option>
<option>📑 Respond to Authority Query</option>
<option>⏳ Awaiting Client Response</option>
<option>🏢 Awaiting Authority Approval</option>
<option>🎉 Deliver Certificate</option>
<option>🔄 General Follow-up</option>
      </select>
    </div>

<div>
      <label>Portal Login ID</label>

  <input
  type="text"
  name="portalId"
  value={formData.portalId}
  onChange={handleChange}
  placeholder="Enter Portal Login ID"
  style={{
    ...inputStyle,
    height: "46px",
  }}
/>
</div>
<div>
  <label>Portal Password</label>

  <input
    type="text"
    name="portalPassword"
    value={formData.portalPassword}
    onChange={handleChange}
    placeholder="Enter Portal Password"
    style={{
      ...inputStyle,
      height: "46px",
    }}
  />
</div>
  </div>
</div>
</div>
  
<div
  style={{
    display:
      formData.inquiryType === "Office Work"
        ? "none"
        : "block",
    marginTop: "20px",
    border: "1px solid #dbe4ee",
    borderRadius: "10px",
    padding: "15px",
    background: "#ffffff",
}}
>
  <h3
    style={{
      marginTop: 0,
      color: "#0B4F84",
    }}
  >
    Pending Documents
  </h3>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "10px",
    }}
  >
    <label><input type="checkbox" /> GST Certificate</label>
    <label><input type="checkbox" /> PAN Card</label>
    <label><input type="checkbox" /> Aadhaar Card</label>
    <label><input type="checkbox" /> MSME Certificate</label>

    <label><input type="checkbox" /> Factory License</label>
    <label><input type="checkbox" /> Electricity Bill</label>
    <label><input type="checkbox" /> Water Bill</label>
    <label><input type="checkbox" /> Site Layout</label>

    <label><input type="checkbox" /> CTE Copy</label>
    <label><input type="checkbox" /> CCA Copy</label>
    <label><input type="checkbox" /> Authorization Letter</label>
    <label><input type="checkbox" /> Other</label>
  </div>

  <div
    style={{
      marginTop: "15px",
      color: "#2563eb",
      fontWeight: "bold",
    }}
  >
    🔗 Digital Locker Integration (Next Step)
    <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "15px",
    marginTop: "20px",
  }}
>
  <div>
    <label>Last Follow-up</label>
    <input
  type="date"
  name="lastFollowUp"
  value={formData.lastFollowUp}
  onChange={handleChange}
  style={inputStyle}
/>
  </div>

  <div>
    <label>Next Follow-up</label>
    <input
  type="date"
  name="nextFollowUp"
  value={formData.nextFollowUp}
  onChange={handleChange}
  style={inputStyle}
/>
  </div>

  <div>
    <label>Reminder Date</label>
    <input
  type="date"
  name="reminderDate"
  value={formData.reminderDate}
  onChange={handleChange}
  style={inputStyle}
/>
  </div>

  <div>
    <label>Reminder Time</label>
    <input
  type="time"
  name="reminderTime"
  value={formData.reminderTime}
  onChange={handleChange}
  style={inputStyle}
/>
  </div>
</div>

<div
  style={{
    display:
      formData.inquiryType === "Office Work"
        ? "none"
        : "flex",
    gap: "25px",
    marginTop: "18px",
    alignItems: "center",
    flexWrap: "wrap",
  }}
>
</div>
</div>

<div
  style={{
    ...cardStyle,
    marginTop: "24px",
  }}
>
  <h3 style={sectionTitleStyle}>💰 Payment Information</h3>

  <div style={grid4Style}>
    <div>
      <label>Quotation Amount (₹)</label>
      <input
        type="number"
        name="quotationAmount"
        value={formData.quotationAmount}
        onChange={handleChange}
        style={inputStyle}
      />
    </div>

    <div>
      <label>Advance Amount (₹)</label>
      <input
        type="number"
        name="advanceAmount"
        value={formData.advanceAmount}
        onChange={handleChange}
        style={inputStyle}
      />
    </div>

    <div>
      <label>Received Amount (₹)</label>
      <input
        type="number"
        name="receivedAmount"
        value={formData.receivedAmount}
        onChange={handleChange}
        style={inputStyle}
      />
    </div>

    <div>
      <label>Balance Amount (₹)</label>
      <input
        type="number"
        name="balanceAmount"
        value={formData.balanceAmount}
        onChange={handleChange}
        style={inputStyle}
        readOnly
      />
    </div>

    <div>
      <label>Payment Status</label>
      <select
        name="paymentStatus"
        value={formData.paymentStatus}
        disabled
        onChange={handleChange}
        style={inputStyle}
      >
        <option>Pending</option>
        <option>Partial</option>
        <option>Paid</option>
      </select>
    </div>

    <div>
      <label>Payment Mode</label>
      <select
        name="paymentMode"
        value={formData.paymentMode}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="">Select</option>
        <option>Cash</option>
        <option>UPI</option>
        <option>Bank Transfer</option>
        <option>Cheque</option>
      </select>
    </div>

    <div>
      <label>Payment Date</label>
      <input
        type="date"
        name="paymentDate"
        value={formData.paymentDate}
        onChange={handleChange}
        style={inputStyle}
      />
    </div>

    <div>
      <label>Invoice No.</label>
      <input
        type="text"
        name="invoiceNo"
        value={formData.invoiceNo}
        onChange={handleChange}
        style={inputStyle}
      />
    </div>

    <div>
      <label>Receipt No.</label>
      <input
        type="text"
        name="receiptNo"
        value={formData.receiptNo}
        onChange={handleChange}
        style={inputStyle}
      />
    </div>
  </div>
</div>

  <label>
    <input type="checkbox" /> Email Reminder
  </label>

  <label>
    <input type="checkbox" /> WhatsApp Reminder
  </label>

  <label>
    <input type="checkbox" defaultChecked /> Portal Notification
  </label>
</div>
<div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "24px",
    marginBottom: "30px",
  }}
>
  <button
  type="button"
  onClick={resetForm}
  style={{
    background: "#64748b",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px 20px",
    cursor: "pointer",
    fontWeight: 600,
  }}
>
  Reset
</button>

  <button
  type="button"
  onClick={handleSave}
  disabled={isSaving}
  style={{
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px 24px",
    cursor: isSaving ? "not-allowed" : "pointer",
    opacity: isSaving ? 0.7 : 1,
    fontWeight: 600,
  }}
>
  {isSaving
  ? "Saving..."
  : isEditMode
  ? "Update Work Record"
  : "Save Work Record"}
</button>
</div>
</>

</WorkRecordFormModal>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    padding: "20px 24px",
    borderBottom: "1px solid #e2e8f0",
    flexWrap: "wrap",
  }}
>
  <div>
  <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
</div>

  <div
    style={{
      marginTop: "8px",
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    }}
  >
    <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  style={{ ...inputStyle, width: "170px" }}
>
  <option>All Status</option>
  <option>Pending</option>
  <option>In Progress</option>
  <option>Waiting for Client reply</option>
  <option>Government Query</option>
  <option>Completed process</option>
</select>

  <select
  value={priorityFilter}
  onChange={(e) => setPriorityFilter(e.target.value)}
  style={{ ...inputStyle, width: "170px" }}
>
  <option>All Priority</option>
  <option>Low</option>
  <option>Medium</option>
  <option>High</option>
  <option>Urgent</option>
  </select>

<select
  value={scopeFilter}
  onChange={(e) => setScopeFilter(e.target.value)}
  style={{ ...inputStyle, width: "220px" }}
>
  <option>All Scope</option>
  <option>Consent to Establish (CTE)</option>
  <option>Consent to Operate (CCA)</option>
  <option>CCA Renewal</option>
  <option>Consolidated Consent & Authorization</option>
  <option>Biomedical Waste Authorization</option>

  <option>Plastic EPR</option>
  <option>Battery EPR</option>
  <option>E-Waste EPR</option>
  <option>Used Oil EPR</option>
  <option>Tyre EPR</option>

  <option>CGWA NOC</option>
  <option>CGWA Renewal</option>

  <option>Environmental Clearance (EC)</option>
  <option>Environmental Audit</option>
  <option>NABL Laboratory Setup</option>

  <option>Other</option>
  </select>

    <select
  value={paymentStatusFilter}
  onChange={(e) => setPaymentStatusFilter(e.target.value)}
  style={{ ...inputStyle, width: "170px" }}
>
  <option>All Payment Status</option>
  <option>Pending</option>
  <option>Partial</option>
  <option>Paid</option>
</select>
  </div>
</div>

 <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "12px",
    minWidth: "470px",
  }}
>
<div
  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: "linear-gradient(135deg,#ecfeff,#dbeafe)",
    border: "1px solid #93c5fd",
    borderRadius: "14px",
    padding: "14px 20px",
    minWidth: "420px",
    boxShadow: "0 4px 12px rgba(59,130,246,0.15)",
  }}
>
<div>
  <div
    style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  }}
>  
</div>
    <div
      style={{
  fontSize: "13px",
  color: "#1e40af",
  fontWeight: 700,
  marginBottom: "8px",
  letterSpacing: "0.5px",
}}
    >
      📁 Current Workspace
    </div>

<div
    style={{
    fontSize: "32px",
    fontWeight: 800,
    color: "#0f172a",
    marginTop: "8px",
    }}
    >
      {selectedFolderId === "all"
        ? "All Folders"
        : folders.find((f) => f.id === selectedFolderId)?.folder_name ||
          "Unknown Folder"}
    </div>
  </div>

  <div
    style={{
      textAlign: "right",
    }}
  >
    <div
      style={{
  fontSize: "13px",
  color: "#021229",
  fontWeight: 600,
  marginLeft: "12px",
}}
    >
      Clients
    </div>

    <div
      style={{
      fontSize: "34px",
      fontWeight: 800,
      color: "#16a34a",
    }}
    >      
    {filteredRecords.length}
    </div>
    <div
  style={{
    marginTop: "14px",
    paddingTop: "12px",
    borderTop: "1px solid #dbeafe",
  }}
>   
  <div
    style={{
      fontSize: "13px",
      color: "#64748b",
      fontWeight: 600,
    }}
  >
    💰 Total Quotation
  </div>

  <div
    style={{
      fontSize: "22px",
      fontWeight: 700,
      color: "#0B4F84",
      marginTop: "4px",
    }}
  >
    ₹ {totalQuotation.toLocaleString("en-IN")}
  </div>
</div>

<div
  style={{
    marginTop: "14px",
    paddingTop: "12px",
    borderTop: "1px solid #dbeafe",
  }}
>
  <div
    style={{
      fontSize: "13px",
      color: "#64748b",
      fontWeight: 600,
    }}
  >
    💵 Total Received
  </div>

  <div
    style={{
      fontSize: "22px",
      fontWeight: 700,
      color: "#16a34a",
      marginTop: "4px",
    }}
  >
    ₹ {totalReceived.toLocaleString("en-IN")}
  </div>
</div>
<div
  style={{
    marginTop: "14px",
    paddingTop: "12px",
    borderTop: "1px solid #dbeafe",
  }}
>
  <div
    style={{
      fontSize: "13px",
      color: "#64748b",
      fontWeight: 600,
    }}
  >
    🧾 Balance
  </div>

  <div
    style={{
      fontSize: "22px",
      fontWeight: 700,
      color: totalBalance > 0 ? "#dc2626" : "#16a34a",
      marginTop: "4px",
    }}
  >
    ₹ {totalBalance.toLocaleString("en-IN")}
  </div>
</div>
  </div>
</div>
<select
  value={selectedFolderId}
  onChange={(e) => setSelectedFolderId(e.target.value)}
  style={{
  background: "#fff8e6",
  color: "#1f2937",
  border: "2px solid #f59e0b",
  borderRadius: "10px",
  height: "44px",
  minWidth: "170px",
  padding: "0 16px",
  fontSize: "15px",
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 2px 6px rgba(245,158,11,0.20)",
}}
>
  <option value="all">📁 All Folders</option>

  {folders.map((folder) => (
    <option key={folder.id} value={folder.id}>
      {folder.folder_name} ({folderCounts[folder.id] || 0})
    </option>
  ))}
</select>

<button
  type="button"
  onClick={() => setShowFolderManager(true)}
  style={{
    background: "#0f766e",
    color: "#fff",
    border: "none",
    height: "44px",
    padding: "0 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 600,
    marginLeft: "10px",
  }}
>
  📁 Manage Folders
</button>

<div
  style={{
    display: "flex",
    gap: "8px",
    marginLeft: "12px",
  }}
>
  {[
  { key: "client", label: "Client Work" },
  { key: "office", label: "Office Work" },
  ].map((tab) => (
    <button
      key={tab.key}
      onClick={() => setWorkView(tab.key as any)}
      style={{
        padding: "9px 16px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        background:
          workView === tab.key ? "#0B4F84" : "#e2e8f0",
        color:
          workView === tab.key ? "#fff" : "#334155",
      }}
    >
      {tab.label}
    </button>
  ))}
</div>

  <button
  onClick={() => {
  resetForm();

  if (selectedFolderId !== "all") {
    setFormData((prev) => ({
      ...prev,
      folderId: selectedFolderId,
    }));
  }

  setSelectedRecord(null);
  setIsEditMode(false);
  setShowForm(true);
}}

  style={{
    background: "#0B4F84",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    cursor: "pointer",
    fontWeight: 600,
    whiteSpace: "nowrap",
  }}
>
  + Add New Work
</button>

<button
  onClick={exportToExcel}
  style={{
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    cursor: "pointer",
    fontWeight: 600,
    whiteSpace: "nowrap",
  }}
>
  📗 Excel
</button>

<button
  onClick={exportToPDF}
  style={{
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    cursor: "pointer",
    fontWeight: 600,
    whiteSpace: "nowrap",
  }}
>
  📄 PDF
</button>

<button
  onClick={() => setShowDailySummaryModal(true)}
  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
>
  📋 Daily Work Summary
</button>

<input
  type="text"
  placeholder="🔍 Search Unit / Contact / Scope..."
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
  style={{
    width: "320px",
    height: "42px",
    padding: "0 14px",
    border: "1px solid #dbe4ee",
    borderRadius: "8px",
    outline: "none",
  }}
/>
</div>

</div>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginTop: "25px",
    marginBottom: "20px",
  }}
>
  {[
    {
      title: "Overdue",
      value: dashboardSummary.overdue,
      color: "#dc2626",
      icon: "🔴",
    },
    {
      title: "Today",
      value: dashboardSummary.today,
      color: "#f59e0b",
      icon: "🟠",
    },
    {
      title: "Upcoming",
      value: dashboardSummary.upcoming,
      color: "#16a34a",
      icon: "🟢",
    },
    {
      title: "Completed",
      value: dashboardSummary.completed,
      color: "#2563eb",
      icon: "✅",
    },
  ].map((card) => (
    <div
      key={card.title}
      style={{
        background: "#fff",
        border: `2px solid ${card.color}`,
        borderRadius: "12px",
        padding: "18px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ fontSize: "16px", fontWeight: 600 }}>
        {card.icon} {card.title}
      </div>

      <div
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          color: card.color,
          marginTop: "10px",
        }}
      >
        {card.value}
      </div>
    </div>
  ))}
</div>

<div
  style={{
    marginTop: "30px",
    background: "#fff",
    border: "1px solid #dbe4ee",
    borderRadius: "12px",
    overflowX: "auto",
    maxHeight: "600px",
    overflowY: "auto",
  }}
>

<div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "12px",
    gap: "10px",
  }}
>
  <span style={{ fontSize: "13px", fontWeight: 600 }}>
    Rows:
  </span>

  <select
    value={rowsPerPage}
    onChange={(e) => {
      setRowsPerPage(Number(e.target.value));
      setCurrentPage(1);
    }}
    style={{
      padding: "6px 10px",
      borderRadius: "6px",
      border: "1px solid #cbd5e1",
      cursor: "pointer",
    }}
  >
    <option value={10}>10</option>
    <option value={25}>25</option>
    <option value={50}>50</option>
    <option value={100}>100</option>
  </select>
</div>
{workView !== "office" && (
 <table
  style={{
    width: "100%",
    minWidth: "1900px",
    borderCollapse: "separate",
    borderSpacing: 0,
    tableLayout: "auto",
  }}
>
  <thead
  style={{
    position: "sticky",
    top: 0,
    zIndex: 5,
    background: "#f8fafc",
  }}
>
  <tr>
    <th
  style={{
    padding: "12px",
    borderBottom: "1px solid #dbe4ee",
    whiteSpace: "nowrap",
    fontSize: "13px",
    fontWeight: 700,
    color: "#0f172a",
    background: "#f8fafc",
    textAlign: "left",
  }}>Sr. No</th>
   <th
  onClick={() =>
    setSortConfig({
      key: "inquiry_date",
      direction:
        sortConfig.key === "inquiry_date" &&
        sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    })
  }
  style={{
    padding: "12px",
    borderBottom: "1px solid #dbe4ee",
    whiteSpace: "nowrap",
    fontSize: "13px",
    fontWeight: 700,
    color: "#0f172a",
    background: "#f8fafc",
    textAlign: "left",
    cursor: "pointer",
    userSelect: "none",
  }}
>
  Date{" "}
  {sortConfig.key === "inquiry_date"
    ? sortConfig.direction === "asc"
      ? "▲"
      : "▼"
    : "⇅"}
</th>
    <th
  onClick={() =>
    setSortConfig({
      key: "unit_name",
      direction:
        sortConfig.key === "unit_name" &&
        sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    })
  }
  style={{
    padding: "12px",
    borderBottom: "1px solid #dbe4ee",
    whiteSpace: "nowrap",
    fontSize: "13px",
    fontWeight: 700,
    color: "#0f172a",
    background: "#f8fafc",
    textAlign: "left",
    cursor: "pointer",
    userSelect: "none",
  }}
>
  Unit Name{" "}
  {sortConfig.key === "unit_name"
    ? sortConfig.direction === "asc"
      ? "▲"
      : "▼"
    : "⇅"}
</th>
    <th
  style={{
    padding: "12px",
    borderBottom: "1px solid #dbe4ee",
    whiteSpace: "nowrap",
    fontSize: "13px",
    fontWeight: 700,
    color: "#0f172a",
    background: "#f8fafc",
    textAlign: "left",
  }} >Contact Person & Mobile</th>
    <th
  style={{
    padding: "12px",
    borderBottom: "1px solid #dbe4ee",
    whiteSpace: "nowrap",
    fontSize: "13px",
    fontWeight: 700,
    color: "#0f172a",
    background: "#f8fafc",
    textAlign: "left",
  }}> Reference Name</th>
   <th
  style={{
    padding: "12px",
    borderBottom: "1px solid #dbe4ee",
    whiteSpace: "nowrap",
    fontSize: "13px",
    fontWeight: 700,
    color: "#0f172a",
    background: "#f8fafc",
    textAlign: "left",
  }} > Scope of Work</th>
    <th
  style={{
    padding: "12px",
    borderBottom: "1px solid #dbe4ee",
    whiteSpace: "nowrap",
    fontSize: "13px",
    fontWeight: 700,
    color: "#0f172a",
    background: "#f8fafc",
    textAlign: "left",
  }} >Client Reply</th>
    <th
  style={{
    padding: "12px",
    borderBottom: "1px solid #dbe4ee",
    whiteSpace: "nowrap",
    fontSize: "13px",
    fontWeight: 700,
    color: "#0f172a",
    background: "#f8fafc",
    textAlign: "left",
  }}> Work Confirm</th>
    <th
  style={{
    padding: "12px",
    borderBottom: "1px solid #dbe4ee",
    whiteSpace: "nowrap",
    fontSize: "13px",
    fontWeight: 700,
    color: "#0f172a",
    background: "#f8fafc",
    textAlign: "left",
  }}> Next Action</th>
    <th
  style={{
    padding: "12px",
    borderBottom: "1px solid #dbe4ee",
    whiteSpace: "nowrap",
    fontSize: "13px",
    fontWeight: 700,
    color: "#0f172a",
    background: "#f8fafc",
    textAlign: "left",
  }}> Login ID / Password</th>
  <th
  onClick={() =>
    setSortConfig({
      key: "status",
      direction:
        sortConfig.key === "status" &&
        sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    })
  }
  style={{
    padding: "12px",
    borderBottom: "1px solid #dbe4ee",
    whiteSpace: "nowrap",
    fontSize: "13px",
    fontWeight: 700,
    color: "#0f172a",
    background: "#f8fafc",
    textAlign: "left",
    cursor: "pointer",
    userSelect: "none",
  }}
>
  Status{" "}
  {sortConfig.key === "status"
    ? sortConfig.direction === "asc"
      ? "▲"
      : "▼"
    : "⇅"}
</th>
   <th
  onClick={() =>
    setSortConfig({
      key: "priority",
      direction:
        sortConfig.key === "priority" &&
        sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    })
  }
  style={{
    padding: "12px",
    borderBottom: "1px solid #dbe4ee",
    whiteSpace: "nowrap",
    fontSize: "13px",
    fontWeight: 700,
    color: "#0f172a",
    background: "#f8fafc",
    textAlign: "left",
    cursor: "pointer",
    userSelect: "none",
  }}
>
  Priority{" "}
  {sortConfig.key === "priority"
    ? sortConfig.direction === "asc"
      ? "▲"
      : "▼"
    : "⇅"}
</th>
   <th
  onClick={() =>
    setSortConfig({
      key: "payment_status",
      direction:
        sortConfig.key === "payment_status" &&
        sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    })
  }
  style={{
    padding: "12px",
    borderBottom: "1px solid #dbe4ee",
    whiteSpace: "nowrap",
    fontSize: "13px",
    fontWeight: 700,
    color: "#0f172a",
    background: "#f8fafc",
    textAlign: "left",
    cursor: "pointer",
    userSelect: "none",
  }}
>
  Payment Status{" "}
  {sortConfig.key === "payment_status"
    ? sortConfig.direction === "asc"
      ? "▲"
      : "▼"
    : "⇅"}
</th>
    <th
  style={{
    padding: "12px",
    borderBottom: "1px solid #dbe4ee",
    whiteSpace: "nowrap",
    fontSize: "13px",
    fontWeight: 700,
    color: "#0f172a",
    background: "#f8fafc",
    textAlign: "left",
  }}> Quotation (₹)</th>
  <th
  onClick={() =>
    setSortConfig({
      key: "next_followup",
      direction:
        sortConfig.key === "next_followup" &&
        sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    })
  }
  style={{
    padding: "12px",
    borderBottom: "1px solid #dbe4ee",
    whiteSpace: "nowrap",
    fontSize: "13px",
    fontWeight: 700,
    color: "#0f172a",
    background: "#f8fafc",
    textAlign: "left",
    cursor: "pointer",
    userSelect: "none",
  }}
>
  Next Follow-up{" "}
  {sortConfig.key === "next_followup"
    ? sortConfig.direction === "asc"
      ? "▲"
      : "▼"
    : "⇅"}
</th>
  <th>Actions</th>
  </tr>
</thead>

    <tbody>
      {workRecords
  .filter((record) => {
    const q = searchText.toLowerCase();

    return (
      record.unit_name?.toLowerCase().includes(q) ||
      record.contact_person?.toLowerCase().includes(q) ||
      record.mobile?.toLowerCase().includes(q) ||
      record.scope_of_work?.toLowerCase().includes(q) ||
      record.reference_name?.toLowerCase().includes(q) ||
      record.task_title?.toLowerCase().includes(q) ||
      record.office_work_type?.toLowerCase().includes(q) ||
      record.assigned_to?.toLowerCase().includes(q)
    );
  }).length === 0 ? (
    <tr>
      <td
        colSpan={14}
        style={{
          padding: "14px 10px",
          textAlign: "center",
          color: "#64748b",
        }}
      >
        No Work Records Found
      </td>
    </tr>
  ) : (
  filteredRecords
    .slice(startIndex, endIndex)
    .map((record, index) => (
<tr
  key={record.id}
  onClick={() => handleView(record)}
  style={{
  background:
    record.next_followup &&
    new Date(record.next_followup).setHours(0, 0, 0, 0) <
    new Date(today).setHours(0, 0, 0, 0) &&
    record.status !== "Completed"
      ? "#fff1f2"
      : index % 2 === 0
      ? "#ffffff"
      : "#fafbfc",

  transition: "0.2s",
  cursor: "pointer",
}}
  onMouseLeave={(e) => {
    e.currentTarget.style.background =
      index % 2 === 0 ? "#ffffff" : "#fafbfc";
  }}
>
  <td>{startIndex + index + 1}</td>
  <td>{record.inquiry_date || "-"}</td>
  <td>{record.unit_name || "-"}</td>
  <td>
  <div
  style={{
    fontWeight: 600,
    color: "#0f172a",
  }}
>
  {record.contact_person}
</div>
  <div
  style={{
    color: "#01060e",
    fontSize: "11px",
    marginTop: "4px",
  }}
>
    {record.mobile || "-"}
  </div>
</td>
  <td>{record.reference_name || "-"}</td>
  <td>
  {record.inquiry_type === "Office Work" ? (
    <>
      <div style={{ fontWeight: 600 }}>
        {record.task_title || "-"}
      </div>

      <div
        style={{
          fontSize: "12px",
          color: "#64748b",
          marginTop: "4px",
        }}
      >
        {record.office_work_type === "Other"
          ? record.other_office_work
          : record.office_work_type}
      </div>

      <div
        style={{
          fontSize: "11px",
          color: "#2563eb",
          marginTop: "4px",
        }}
      >
        👤 {record.assigned_to || "-"} | 📅 {record.due_date || "-"}
      </div>
    </>
  ) : (
    record.scope_of_work || "-"
  )}
</td>
  <td>
  {record.inquiry_type === "Office Work"
    ? (record.task_description || "-")
    : (record.client_reply || "-")}
</td>
  <td>
  {record.inquiry_type === "Office Work"
    ? (record.remarks || "-")
    : (record.work_confirm || "-")}
</td>
  <td>
  {record.inquiry_type === "Office Work"
    ? (record.assigned_to || "-")
    : (record.next_action || "-")}
</td>

<td>
  {record.inquiry_type === "Office Work" ? (
    <>
      <div style={{ fontWeight: 600 }}>
        📅 {record.due_date || "-"}
      </div>

      <div
        style={{
          color: "#64748b",
          fontSize: "12px",
          marginTop: "4px",
        }}
      >
        {record.status || "-"}
      </div>
    </>
  ) : (
    <>
      <div>{record.portal_id || "-"}</div>
      <div style={{ color: "#64748b", fontSize: "12px" }}>
        {record.portal_password || "-"}
      </div>
    </>
  )}
</td>

  <td
  style={{ padding: "14px 10px",
  }}
>
  <span
    style={{
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: 600,
      color: "#fff",
      background:
        record.status === "Completed" ||
        record.status === "Completed process"
          ? "#16a34a"
          : record.status === "In Progress"
          ? "#2563eb"
          : record.status === "Waiting for Client Reply"
          ? "#f59e0b"
          : "#ef4444",
   }}
>
  {record.status || "-"}
</span>
</td>

  <td style={{ padding: "14px 10px",}}>
  <span
    style={{
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: 600,
      color: "#fff",
      background:
        record.priority === "Urgent"
          ? "#dc2626"
          : record.priority === "High"
          ? "#ea580c"
          : record.priority === "Medium"
          ? "#2563eb"
          : "#16a34a",
    }}
  >
    {record.inquiry_type === "Office Work"
  ? (record.office_work_type === "Other"
      ? record.other_office_work
      : record.office_work_type)
  : record.priority}

  </span>
</td>
  <td style={{ padding: "14px 10px", }}>
  <span
    style={{
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: 600,
      color: "#fff",
      background:
           record.payment_status === "Paid"
           ? "#16a34a"
           : record.payment_status === "Partial"
           ? "#2563eb"
           : "#ef4444",
           }}
        >
    {record.inquiry_type === "Office Work"
  ? (record.remarks || "-")
  : (record.payment_status || "Pending")}

  </span>
</td>
  <td>
  {record.inquiry_type === "Office Work" ? (
    <span
      style={{
        fontWeight: 600,
        color: "#2563eb",
      }}
    >
      {record.assigned_to || "-"}
    </span>
  ) : (
    <span
      style={{
        fontWeight: 700,
        color: "#15803d",
      }}
    >
      ₹ {Number(record.quotation_amount || 0).toLocaleString("en-IN")}
    </span>
  )}
</td>
<td>
  {record.inquiry_type === "Office Work" ? (
    <span
      style={{
        background: "#2563eb",
        color: "#fff",
        padding: "5px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: 600,
        display: "inline-block",
        minWidth: "110px",
        textAlign: "center",
      }}
    >
      {record.due_date || "-"}
    </span>
  ) : (
    <>
      {record.next_followup ? (() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const followup = new Date(record.next_followup);
        followup.setHours(0, 0, 0, 0);

        let bg = "#16a34a";
        let text = record.next_followup;

        if (followup.getTime() === today.getTime()) {
          bg = "#f59e0b";
          text = "🟠 Today";
        } else if (followup < today) {
          bg = "#dc2626";
          text = "🔴 Overdue";
        }

        return (
          <span
            style={{
              background: bg,
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 600,
              display: "inline-block",
              minWidth: "110px",
              textAlign: "center",
            }}
            title={record.next_followup}
          >
            {text}
          </span>
        );
      })() : "-"}
    </>
  )}
</td>
<td>
  <div
    style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      gap:"8px"
    }}
  >

<button onClick={(e) => {
  e.stopPropagation();
  handleView(record);
}}>👁</button>

<button onClick={(e) => {
  e.stopPropagation();
  handleEdit(record);
}} > ✏️</button>
    
<button onClick={(e) => {
  e.stopPropagation();
  handleDelete(record.id);
}}>🗑</button>

  </div>
</td>
</tr>
    ))
  )}
</tbody>
  </table>
)}

{workView === "office" && (
  <div
    style={{
      overflowX: "auto",
      marginTop: "20px",
      border: "1px solid #e2e8f0",
      borderRadius: "10px",
      background: "#fff",
    }}
  >
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr
          style={{
            background: "#0B4F84",
            color: "#fff",
          }}
        >
          <th>Sr.</th>
          <th>Date</th>
          <th>Task Title</th>
          <th>Office Work</th>
          <th>Assigned To</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {filteredRecords
          .filter(
            (r) => r.inquiry_type === "Office Work"
          )
          .map((record, index) => (
            <tr key={record.id}>
              <td>{index + 1}</td>

              <td>{record.inquiry_date}</td>

              <td>{record.task_title}</td>

              <td>
                {record.office_work_type === "Other"
                  ? record.other_office_work
                  : record.office_work_type}
              </td>

              <td>{record.assigned_to}</td>

              <td>{record.due_date}</td>

              <td>{record.status}</td>

              <td>
                <button
                  onClick={() => handleView(record)}
                >
                  👁
                </button>

                <button
                  onClick={() => handleEdit(record)}
                >
                  ✏️
                </button>

                <button
                  onClick={() =>
                    handleDelete(record.id)
                  }
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
)}

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "16px",
  }}
>
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    style={{
      padding: "8px 14px",
      border: "1px solid #cbd5e1",
      borderRadius: "6px",
      background: currentPage === 1 ? "#f1f5f9" : "#ffffff",
      cursor: currentPage === 1 ? "not-allowed" : "pointer",
    }}
  >
    ◀ Previous
  </button>

 <span
  style={{
    fontWeight: 600,
    fontSize: "14px",
    color: "#334155",
  }}
>
  Showing{" "}
  {workRecords.length === 0
    ? 0
    : startIndex + 1}
  –
  {Math.min(endIndex, workRecords.length)} of{" "}
  {workRecords.length} Records
</span>

  <button
    onClick={() => {
      if (endIndex < workRecords.length) {
        setCurrentPage((prev) => prev + 1);
      }
    }}
    disabled={endIndex >= workRecords.length}
    style={{
      padding: "8px 14px",
      border: "1px solid #cbd5e1",
      borderRadius: "6px",
      background: endIndex >= workRecords.length ? "#f1f5f9" : "#ffffff",
      cursor: endIndex >= workRecords.length ? "not-allowed" : "pointer",
    }}
  >
    Next ▶
  </button>
</div>

{showTransferDialog && folderToDelete && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10000,
    }}
  >
    <div
      style={{
        width: "500px",
        background: "#fff",
        borderRadius: "12px",
        padding: "24px",
      }}
    >
      <h2 style={{ marginTop: 0 }}>
        ⚠️ Folder Contains Clients
      </h2>

      <p>
        <strong>{folderToDelete.folder_name}</strong> contains work records.
      </p>

      <p>
        Please move all clients to another folder before deleting.
      </p>

      <select
        value={transferFolderId}
        onChange={(e) => setTransferFolderId(e.target.value)}
        style={{
          width: "100%",
          height: "42px",
          marginTop: "15px",
          marginBottom: "20px",
        }}
      >
        <option value="">Select Target Folder</option>

        {folders
          .filter((f) => f.id !== folderToDelete.id)
          .map((folder) => (
            <option
              key={folder.id}
              value={folder.id}
            >
              {folder.folder_name}
            </option>
          ))}
      </select>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        <button
          onClick={() => {
            setShowTransferDialog(false);
            setFolderToDelete(null);
            setTransferFolderId("");
          }}
        >
          Cancel
        </button>

        <button
  onClick={handleTransferAndDelete}
  style={{
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    cursor: "pointer",
    fontWeight: 600,
  }}
>
  Transfer & Delete
</button>

      </div>
    </div>
  </div>
)}

{showFolderManager && (
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
        width: "650px",
        maxWidth: "95%",
        background: "#fff",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 10px 30px rgba(0,0,0,.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>📁 Folder Management</h2>

        <button
          onClick={() => setShowFolderManager(false)}
          style={{
            background: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "8px 14px",
            cursor: "pointer",
          }}
        >
          ✕ Close
        </button>
      </div>
<div
  style={{
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  }}
>
  <input
    type="text"
    placeholder="Enter Folder Name"
    value={newFolderName}
    onChange={(e) => setNewFolderName(e.target.value)}
    style={{
      flex: 1,
      height: "42px",
      padding: "0 12px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
    }}
  />

  <button
    type="button"
    onClick={() => {
      handleAddFolder();
    }}
    style={{
      background: "#16a34a",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "0 18px",
      cursor: "pointer",
      fontWeight: 600,
    }}
  >
    + Add Folder
  </button>
</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {folders.map((folder) => (
          <div
            key={folder.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "12px 16px",
            }}
          >
            {editingFolderId === folder.id ? (
  <input
    type="text"
    value={newFolderName}
    onChange={(e) => setNewFolderName(e.target.value)}
    style={{
      flex: 1,
      height: "36px",
      padding: "0 10px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
    }}
  />
) : (
  <strong>📁 <>
  {folder.folder_name}
  <span
    style={{
      marginLeft: 8,
      color: "#6b7280",
      fontSize: "13px",
      fontWeight: 500,
    }}
  >
    ({folderCounts[folder.id] || 0})
  </span>
</>
</strong>
)}

            <div style={{ display: "flex", gap: "10px" }}>
              <button
  onClick={() => {
    if (editingFolderId === folder.id) {
      handleRenameFolder();
    } else {
      setEditingFolderId(folder.id);
      setNewFolderName(folder.folder_name);
    }
  }}
>
  {editingFolderId === folder.id ? "💾 Save" : "✏ Edit"}
</button>
              <button
  onClick={() => handleDeleteFolder(folder.id)}
>
  🗑 Delete
</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
</div>
<ViewWorkRecordModal
  open={showViewModal}
  record={selectedRecord}
  onClose={closeViewModal}
/>

{showHistoryModal && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 99999,
    }}
  >
    <div
      style={{
        width: "900px",
        maxHeight: "80vh",
        overflowY: "auto",
        background: "#fff",
        borderRadius: "12px",
        padding: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>{historyTitle}</h2>

        <button
          onClick={() => setShowHistoryModal(false)}
        >
          ✕
        </button>
      </div>

      {historyLoading ? (
        <p>Loading...</p>
      ) : historyRecords.length === 0 ? (
        <p>No history found.</p>
      ) : (
        historyRecords.map((item: any) => (
          <div
            key={item.id}
            style={{
              borderLeft: "4px solid #0B4F84",
              padding: "12px 16px",
              marginBottom: "14px",
              background: "#f8fafc",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "#0B4F84",
              }}
            >
              {item.activity_title}
            </div>

            <div
              style={{
                marginTop: "6px",
                whiteSpace: "pre-wrap",
              }}
            >
              {item.activity_message}
            </div>

            <div
              style={{
                marginTop: "8px",
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              {new Date(item.created_at).toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  </div>
)}

<DailyWorkSummaryModal
  open={showDailySummaryModal}
  onClose={() => setShowDailySummaryModal(false)}
  records={filteredRecords}
/>
      </div>
    </div>
  );
}