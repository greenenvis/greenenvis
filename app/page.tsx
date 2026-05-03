"use client";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", background: "#f6f8fb", fontFamily: "Segoe UI" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "260px",
        background: "#0f7b3f",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px"
      }}>
        <h2>GreenEnvis</h2>
        <p style={{ fontSize: "12px", opacity: 0.8 }}>Compliance Simplified</p>

        <div style={{ marginTop: "20px" }}>
          {["Dashboard","Clients","Compliance","Applications","Documents","Tasks","Reminders","Quotations","Checklists","Reports"].map((m,i)=>(
            <div key={i} style={{
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "10px",
              background: i===0 ? "#0b5e2e" : "transparent",
              cursor: "pointer"
            }}>
              {m}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: "25px" }}>

        {/* HEADER */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <h2 style={{ margin:0 }}>Simplify Compliance. Save Time.</h2>
            <p style={{ color:"#666" }}>All your compliance in one dashboard</p>
          </div>
          <div>👤 GreenEnvis</div>
        </div>

        {/* STATS */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(5,1fr)",
          gap:"15px",
          marginTop:"20px"
        }}>
          {[
            ["24","Total Clients"],
            ["17","Pending Work"],
            ["32","Complete Work"],
            ["14","File Closed"],
            ["09","Reminder Work"],
          ].map((s,i)=>(
            <div key={i} style={{
              background:"#fff",
              padding:"20px",
              borderRadius:"12px",
              boxShadow:"0 4px 12px rgba(0,0,0,0.05)"
            }}>
              <h2>{s[0]}</h2>
              <p>{s[1]}</p>
            </div>
          ))}
        </div>

        {/* TOOLS */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(4,1fr)",
          gap:"15px",
          marginTop:"20px"
        }}>
          {[
            "Share Checklist",
            "Auto Quotation",
            "Siting Criteria",
            "Acts & Rules"
          ].map((t,i)=>(
            <div key={i} style={{
              background:"#fff",
              padding:"20px",
              borderRadius:"12px",
              textAlign:"center",
              boxShadow:"0 4px 12px rgba(0,0,0,0.05)"
            }}>
              <h4>{t}</h4>
              <p style={{fontSize:"12px",color:"#777"}}>Click to open</p>
            </div>
          ))}
        </div>

        {/* TRACKER */}
        <div style={{
          background:"#fff",
          padding:"20px",
          borderRadius:"12px",
          marginTop:"20px"
        }}>
          <h3>Compliance Tracker</h3>

          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(6,1fr)",
            gap:"10px",
            marginTop:"10px"
          }}>
            {["CTE","CCA","EC","HW","Form 4&5","Other"].map((c,i)=>(
              <div key={i} style={{
                background:"#f1f5f9",
                padding:"10px",
                borderRadius:"8px",
                textAlign:"center"
              }}>
                <b>{c}</b>
                <br/>
                {Math.floor(Math.random()*10)+1} Pending
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"2fr 1fr",
          gap:"20px",
          marginTop:"20px"
        }}>

          <div style={{
            background:"#fff",
            padding:"20px",
            borderRadius:"12px"
          }}>
            <h3>Recent Activities</h3>
            <p>Client A - CTE Submitted</p>
            <p>Client B - CCA Approved</p>
            <p>Client C - Document Uploaded</p>
          </div>

          <div style={{
            background:"#fff",
            padding:"20px",
            borderRadius:"12px"
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