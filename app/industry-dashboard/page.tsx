"use client";

export default function IndustryDashboard() {
  const modules = [
    {
      title: "Compliance Library",
      icon: "📚",
    },
    {
      title: "Compliance Tracker",
      icon: "📊",
    },
    {
      title: "Checklists",
      icon: "📋",
    },
    {
      title: "Forms & Formats",
      icon: "📄",
    },
    {
      title: "Siting Criteria",
      icon: "🏭",
    },
    {
      title: "Proposal Generator",
      icon: "📑",
    },
    {
      title: "Quotation Generator",
      icon: "💰",
    },
    {
      title: "Document Center",
      icon: "📁",
    },
    {
      title: "Reminders",
      icon: "🔔",
    },
    {
      title: "Pending Tasks",
      icon: "✅",
    },
  ];

  const stats = [
    {
      title: "Compliance Alerts",
      value: "05",
      icon: "⚠️",
    },
    {
      title: "Upcoming Renewals",
      value: "03",
      icon: "📅",
    },
    {
      title: "Pending Tasks",
      value: "08",
      icon: "📝",
    },
    {
      title: "Documents Uploaded",
      value: "24",
      icon: "📂",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f3f4f6",
      }}
    >
      {/* Sidebar */}

      <div
        style={{
          width: "280px",
          background: "#065f46",
          color: "#ffffff",
          padding: "25px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            marginBottom: "40px",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            paddingBottom: "20px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "30px",
            }}
          >
            🌿 GreenEnvis
          </h1>

          <p
            style={{
              marginTop: "10px",
              color: "#d1fae5",
              fontSize: "14px",
            }}
          >
            Environmental Compliance Portal
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            fontSize: "15px",
          }}
        >
          <div>🏠 Dashboard</div>
          <div>📚 Compliance Library</div>
          <div>📋 Checklists</div>
          <div>📄 Forms & Formats</div>
          <div>🏭 Siting Criteria</div>
          <div>📊 Compliance Tracker</div>
          <div>📑 Proposal Generator</div>
          <div>💰 Quotation Generator</div>
          <div>📁 Document Center</div>
          <div>🔔 Reminders</div>
          <div>✅ Pending Tasks</div>
          <div>⚙️ Profile Settings</div>
        </div>
      </div>

      {/* Main Area */}

      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        {/* Top Header */}

        <div
          style={{
            background: "#ffffff",
            padding: "20px 30px",
            borderRadius: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#065f46",
              }}
            >
              GreenEnvis Industry Portal
            </h1>

            <p
              style={{
                marginTop: "8px",
                color: "#64748b",
              }}
            >
              Manage all environmental compliances from one dashboard.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              fontSize: "22px",
            }}
          >
            <span>🔔</span>
            <span>⚙️</span>

            <div
              style={{
                background: "#ecfdf5",
                padding: "10px 15px",
                borderRadius: "10px",
                color: "#065f46",
                fontWeight: "bold",
              }}
            >
              Industry User
            </div>
          </div>
        </div>

        {/* Stats */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {stats.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#ffffff",
                borderRadius: "15px",
                padding: "25px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  fontSize: "30px",
                  marginBottom: "10px",
                }}
              >
                {item.icon}
              </div>

              <h3
                style={{
                  color: "#64748b",
                  marginBottom: "10px",
                }}
              >
                {item.title}
              </h3>

              <h1
                style={{
                  margin: 0,
                  color: "#065f46",
                }}
              >
                {item.value}
              </h1>
            </div>
          ))}
        </div>

        {/* Modules */}

        <div
          style={{
            background: "#ffffff",
            borderRadius: "15px",
            padding: "25px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              color: "#065f46",
              marginBottom: "25px",
            }}
          >
            Quick Access Modules
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
              gap: "20px",
            }}
          >
            {modules.map((module, index) => (
              <div
                key={index}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e5e7eb",
                  borderRadius: "15px",
                  padding: "25px",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                <div
                  style={{
                    fontSize: "35px",
                    marginBottom: "15px",
                  }}
                >
                  {module.icon}
                </div>

                <h3
                  style={{
                    margin: 0,
                    color: "#065f46",
                  }}
                >
                  {module.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}