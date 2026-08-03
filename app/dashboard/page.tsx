"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import {Calendar,
  dateFnsLocalizer,
} from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  format,
  parse,
  startOfWeek,
  getDay,
} from "date-fns";

import { enUS } from "date-fns/locale";
import Sidebar from "./Sidebar";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function ClientDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const [documents, setDocuments] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  
  const [calendarDate, setCalendarDate] = useState(new Date());

  const [showNotifications, setShowNotifications] =
  useState(false);
  const [hasNewNotifications, setHasNewNotifications] =
  useState(false);

  const fetchDocuments = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setDocuments([]);
    return;
  }

  const { data, error } = await supabase
    .from("industry_documents")
    .select("*")
    .eq("user_id", user.id);

  if (!error) {
    setDocuments(data || []);
  }
};

const fetchNotifications = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setNotifications([]);
    return;
  }

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (!error) {
    setNotifications(data || []);

    setHasNewNotifications(
      (data || []).some((n) => !n.is_read)
    );
  }
};

  useEffect(() => {
  fetchDocuments();
  fetchNotifications();

  const refreshNotifications = () => {
    fetchNotifications();
  };

  window.addEventListener(
    "notifications-updated",
    refreshNotifications
  );

  return () => {
    window.removeEventListener(
      "notifications-updated",
      refreshNotifications
    );
  };
}, []);

  const goToDocuments = () => {
  router.push("/dashboard/document-center");
};

const openDocuments = (filter: string) => {
  router.push(
    `/dashboard/document-center?filter=${encodeURIComponent(filter)}`
  );
};

const sidebarMenu = [
  "🏠 Dashboard",
  "🏭 Client Profile",
  "📋 Compliance Tracker",
  "📄 Forms",
  "📁 Formats",
  "📚 Knowledge Center",
  "💳 Payment Details",
  "👨‍💼 My Consultant",
  "🛟 Support",
];

 const summaryCards = [
  {
    title: "Total Documents",
    value: documents.length.toString(),
    color: "#2563eb",
    filter: "All",
  },
  {
    title: "Completed",
    value: documents
      .filter((d) => d.ai_status === "Completed")
      .length.toString(),
    color: "#16a34a",
    filter: "Completed",
  },
  {
    title: "Processing",
    value: documents
      .filter((d) => d.ai_status === "Processing")
      .length.toString(),
    color: "#f59e0b",
    filter: "Processing",
  },
  {
    title: "Expired",
    value: documents
      .filter((d) => {
        if (!d.valid_upto) return false;
        return new Date(d.valid_upto) < new Date();
      })
      .length.toString(),
    color: "#dc2626",
    filter: "Expired",
  },
];
  const reminders = documents
  .filter((d) => {
    if (d.ai_status === "Failed") return true;

    if (!d.valid_upto) return false;

    const diff = Math.ceil(
      (new Date(d.valid_upto).getTime() -
        new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return diff <= 30;
  })

  .sort((a, b) => {
    if (!a.valid_upto) return 1;
    if (!b.valid_upto) return -1;

    return (
      new Date(a.valid_upto).getTime() -
      new Date(b.valid_upto).getTime()
    );
  });

return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        fontFamily: "Arial, sans-serif",
      }}
    >

      {/* Main Content */}
      <div 
        style={{ 
          flex: 1, padding: "30px" }}>
            {/* Top Header */}
<div
  style={{
    background: "#ffffff",
    padding: "20px 30px",
    borderRadius: "14px",
    marginBottom: "25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <div>
    <h1 style={{ 
      margin: 0, color: "#166534" }}>
      Welcome to GreenEnvis Portal
    </h1>

    <p
      style={{
        color: "#64748b",
        marginTop: "8px",
      }}
    >
      Smart Environmental Compliance Management System
    </p>
  </div>

<div
  style={{
    position: "relative",
    cursor: "pointer",
  }}

 onClick={() => {
  setShowNotifications(!showNotifications);
  setHasNewNotifications(false);
  }}
>
    <div
      style={{
        fontSize: "34px",
      }}
    >
      🔔
    </div>
{showNotifications && (
  <div
    style={{
      position: "absolute",
      top: "50px",
      right: 0,
      width: "360px",
      background: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      zIndex: 999,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        padding: "15px",
        background: "#166534",
        color: "#ffffff",
        fontWeight: "bold",
      }}
    >
      🔔 Notifications
    </div>

<div
  onClick={() => {
    setShowNotifications(false);
    router.push("/dashboard/document-center");
  }}
  style={{
    padding: "14px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#166534",
    cursor: "pointer",
    background: "#f9fafb",
  }}
>
      View All Documents →
       </div>
       {notifications
  .filter((d) => !d.is_read)
  .slice(0, 5)
  .map((doc) => (

  <div
  key={doc.id}
  onClick={async () => {
    console.log("Clicked Notification ID:", doc.id);

    const { error } = await supabase
  .from("notifications")
  .update({
    is_read: true,
  })
  .eq("id", doc.id);

console.log("Read Update Error:", error);

await fetchNotifications();

setHasNewNotifications(false);

setShowNotifications(false);

router.push("/dashboard/document-center");
}}

  style={{
    padding: "14px",
    borderBottom: "1px solid #f1f5f9",
    cursor: "pointer",
    transition: "0.2s",
}}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#f8fafc";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "#ffffff";
  }}
>
          <div
            style={{
              fontWeight: 600,
            }}
          >
            {doc.title}
          </div>

          <div
            style={{
              color:
              doc.priority === "High"
              ? "#dc2626"
              : "#d97706",
              fontSize: "13px",
              marginTop: "4px",
            }}
          >
            {doc.message}

          </div>
        </div>
      ))}
  </div>
)}

    {hasNewNotifications && (
  <div
    style={{
      position: "absolute",
      top: "-8px",
      right: "-8px",
      background: "#dc2626",
      color: "#ffffff",
      borderRadius: "50%",
      width: "24px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: "bold",
    }}
  >
    {
     notifications.filter((d) => !d.is_read).length
    }
  </div>

  )}
  </div>
</div>

        {/* Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {summaryCards.map((card, index) => (

            <div
              key={index}
              onClick={() => openDocuments(card.filter)}
              style={{
              background: card.color,
              color: "#ffffff",
              padding: "24px",
              borderRadius: "14px",
              cursor: "pointer",
              transition: "0.2s ease",
             }}
            >
              <h3 style={{ margin: 0 }}>{card.title}</h3>
              <h1 style={{ marginTop: "10px" }}>{card.value}</h1>
              <small
              
  style={{
    display: "block",
    marginTop: "14px",
    opacity: 0.9,
    fontWeight: "bold",
    fontSize: "13px",
  }}
>
  Click to View →
</small>
    </div>
      ))}
    </div>
    
<div
  style={{
    background: "#ffffff",
    borderRadius: "14px",
    padding: "25px",
    marginBottom: "25px",
  }}
>
  <h2
    style={{
      marginTop: 0,
      marginBottom: "20px",
      color: "#166534",
    }}
  >
    📅 Compliance Calendar (Live)
  </h2>

  <Calendar
    localizer={localizer}

    date={calendarDate}

   onNavigate={(date) => setCalendarDate(date)}

  events={documents
  .filter((doc) => doc.valid_upto)
  .map((doc: any) => {
    const eventDate = new Date(doc.valid_upto);

    return {
      title:
        doc.ai_status === "Failed"
          ? `❌ ${doc.document_name}`
          : eventDate < new Date()
          ? `🔴 ${doc.document_name}`
          : `🟡 ${doc.document_name}`,

      start: eventDate,
      end: eventDate,

      allDay: true,

      resource: doc,
    };
  })}
  
  startAccessor="start"
  endAccessor="end"

  defaultView="month"

  views={["month"]}

  popup

eventPropGetter={(event: any) => {
let background = "#16a34a";

  if (event.resource.ai_status === "Failed") {
    background = "#dc2626";
  } else if (
    new Date(event.resource.valid_upto) < new Date()
  ) {
    background = "#dc2626";
  } else {
    const diff = Math.ceil(
      (new Date(event.resource.valid_upto).getTime() -
        new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diff <= 30) {
      background = "#f59e0b";
    }
  }

  return {
    style: {
      background,
      border: "none",
      borderRadius: "6px",
      color: "#fff",
      fontWeight: "bold",
    },
  };
}}

  toolbar={true}

onSelectEvent={(event: any) => {
  router.push(
    `/dashboard/document-center?document=${encodeURIComponent(
      event.resource.document_name
    )}`
  );
}}
  style={{
    height: 620,
  }}
/>
<p>Total Events: {documents.filter((d) => d.valid_upto).length}</p>
      </div>
        {/* Applications Table */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            padding: "30px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
          🔔 Compliance Reminders
          </h2>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
              }}
            >
              <thead>
  <tr style={{ background: "#0b4f84", color: "#ffffff" }}>
    <th style={thStyle}>Consent No.</th>
    <th style={thStyle}>Document</th>
    <th style={thStyle}>Document Type</th>
    <th style={thStyle}>Reminder</th>
    <th style={thStyle}>Priority</th>
    <th style={thStyle}>Due</th>
    <th style={thStyle}>Action</th>
  </tr>
</thead>

  <tbody>

  {reminders.map((doc, index) => {

  let reminder = "";

  if (doc.ai_status === "Failed") {
    reminder = "❌ Wrong Document";
  } else if (doc.valid_upto) {
    const diff = Math.ceil(
      (new Date(doc.valid_upto).getTime() -
        new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diff < 0) {
      reminder = "🔴 Expired";
    } else if (diff <= 30) {
      reminder = `🟡 ${diff} Days Left`;
    } else {
      reminder = "🟢 Active";
    }
  }

  let priority = "";
let due = "";

if (doc.ai_status === "Failed") {
  priority = "High";
  due = "Immediate";
} else if (doc.valid_upto) {
  const diff = Math.ceil(
    (new Date(doc.valid_upto).getTime() -
      new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (diff < 0) {
   priority = "High";
    due = "Today";
  } else if (diff <= 30) {
    priority = "Medium";
    due = `${diff} Days`;
  } else {
    priority = "Low";
    due = "-";
  }
}

return (        
  <tr key={index}>
  <td style={tdStyle}>{doc.consent_no || "-"}</td>

  <td style={tdStyle}>{doc.document_name}</td>

  <td style={tdStyle}>{doc.document_type || "-"}</td>

  <td style={tdStyle}>{reminder}</td>

  <td style={tdStyle}>
  <span
    style={{
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "13px",
      fontWeight: "bold",
      color: "#fff",
      whiteSpace: "nowrap",
      display: "inline-block",
      minWidth: "80px",
      textAlign: "center",

      background:
      priority === "High"
    ? "#dc2626"
    : priority === "Medium"
    ? "#f59e0b"
    : "#16a34a",
    }}
  >
    <>
  {priority === "High" && "🔴 "}
  {priority === "Medium" && "🟡 "}
  {priority === "Low" && "🟢 "}
  {priority}
</>
  </span>
</td>

  <td style={tdStyle}>
  <span
    style={{
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "bold",
      background:
        due === "Immediate"
          ? "#fee2e2"
          : due === "Today"
          ? "#fef3c7"
          : "#dcfce7",
      color:
        due === "Immediate"
          ? "#dc2626"
          : due === "Today"
          ? "#b45309"
          : "#166534",
    }}
  >
    {due}
  </span>
</td>

  <td style={tdStyle}>
    <button
      onClick={() =>
        router.push("/dashboard/document-center")
      }
      style={{
        background: "#16a34a",
        color: "#ffffff",
        border: "none",
        padding: "8px 14px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      View
    </button>
  </td>
</tr>


                );
               })
              }
              </tbody>
            </table>
          </div>
        </div>

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/918780723063"
          target="_blank"
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            background: "#25D366",
            color: "#ffffff",
            padding: "16px 22px",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "bold",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            zIndex: 999,
          }}
        >
          WhatsApp Us
        </a>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "14px",
  textAlign: "left" as const,
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #e2e8f0",
};