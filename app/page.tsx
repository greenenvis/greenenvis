"use client";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", fontFamily: "Arial", background: "#f5f7fb" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "250px",
        background: "#1e7c3f",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px"
      }}>
        <h2>GreenEnvis</h2>
        <p style={{ fontSize: "12px", marginBottom: "20px" }}>Compliance Simplified</p>

        {[
          "Dashboard",
          "Clients",
          "Compliance",
          "Applications",
          "Documents",
          "Tasks",
          "Reminders",
          "Quotations",
          "Checklists",
          "Reports",
        ].map((item, i) => (
          <div key={i} style={{
            padding: "10px",
            marginBottom: "8px",
            borderRadius: "6px",
            cursor: "pointer",
            background: i === 0 ? "#145c2d" : "transparent"
          }}>
            {item}
          </div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "20px" }}>

        {/* HEADER */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px"
        }}>
          <h2>Simplify Compliance. Save Time.</h2>
          <div>👤 GreenEnvis</div>
        </div>

        {/* STATS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          gap: "15px",
          marginBottom: "20px"
        }}>
          {[
            { title: "Total Clients", val: 24 },
            { title: "Pending Work", val: 17 },
            { title: "Complete Work", val: 32 },
            { title: "File Closed", val: 14 },
            { title: "Reminder Work", val: 9 },
          ].map((s, i) => (
            <div key={i} style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}>
              <h2>{s.val}</h2>
              <p>{s.title}</p>
            </div>
          ))}
        </div>

        {/* TOOLS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "15px",
          marginBottom: "20px"
        }}>
          {[
            "Share Checklist",
            "Auto Quotation",
            "Siting Criteria",
            "Acts & Rules"
          ].map((t, i) => (
            <div key={i} style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center"
            }}>
              <h4>{t}</h4>
              <p style={{ fontSize: "12px" }}>Click to open</p>
            </div>
          ))}
        </div>

        {/* COMPLIANCE TRACKER */}
        <div style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px"
        }}>
          <h3>Compliance Tracker</h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(6,1fr)",
            gap: "10px"
          }}>
            {[
              "CTE",
              "CCA",
              "EC",
              "HW",
              "Form 4 & 5",
              "Other"
            ].map((c, i) => (
              <div key={i} style={{
                padding: "10px",
                background: "#f1f5f9",
                borderRadius: "6px",
                textAlign: "center"
              }}>
                {c}
                <br />
                <b>{Math.floor(Math.random()*10)+1} Pending</b>
              </div>
            ))}
          </div>
        </div>

        {/* REMINDERS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px"
        }}>

          <div style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px"
          }}>
            <h3>Recent Activities</h3>
            <p>Client A - CTE Submitted</p>
            <p>Client B - CCA Approved</p>
            <p>Client C - Document Uploaded</p>
          </div>

          <div style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px"
          }}>
            <h3>Upcoming Reminders</h3>
            <p>CTE Renewal - 15 Days</p>
            <p>CCA Renewal - 22 Days</p>
            <p>HW Return - 30 Days</p>
          </div>

        </div>

      </div>
    </div>
  );
}