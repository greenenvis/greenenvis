"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const categories = [
    {
      icon: "🏭",
      title: "Industry",
      description:
        "Manage environmental compliances, licenses, renewals, documents and statutory records from one dashboard.",
      button: "Login",
      color: "#16a34a",
      path: "/login",
      active: true,
    },
    {
      icon: "👨‍💼",
      title: "Consultant",
      description:
        "Manage multiple industries, compliances and client activities from a single workspace.",
      button: "Coming Soon",
      color: "#f59e0b",
      path: "/coming-soon/consultant",
      active: false,
    },
    
    {
      icon: "🧪",
      title: "Laboratory",
      description:
        "Upload NABL reports, sample tracking and laboratory management.",
      button: "Coming Soon",
      color: "#f59e0b",
      path: "/coming-soon/laboratory",
      active: false,
    },
    {
      icon: "🏪",
      title: "Small Business",
      description:
        "Simple compliance solution specially designed for MSMEs and startups.",
      button: "Coming Soon",
      color: "#f59e0b",
      path: "/coming-soon/small-business",
      active: false,
    },
    {
      icon: "🏛",
      title: "Government Authority",
      description:
        "Inspection, monitoring and compliance verification platform.",
      button: "Coming Soon",
      color: "#f59e0b",
      path: "/coming-soon/government-authority",
      active: false,
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#eef7ff 0%,#ffffff 40%,#f8fafc 100%)",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {/* Hero Section */}

      <section
        style={{
          maxWidth: "1450px",
          margin: "0 auto",
          padding: "70px 30px 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "#dcfce7",
            color: "#166534",
            padding: "8px 18px",
            borderRadius: "50px",
            fontWeight: 700,
            marginBottom: "25px",
          }}
        >
          🌱 India's Smart Environmental Compliance Platform
        </div>

        <h1
          style={{
            fontSize: "64px",
            color: "#0B4F84",
            margin: 0,
            fontWeight: 800,
          }}
        >
          GreenEnvis
        </h1>

        <p
          style={{
            maxWidth: "950px",
            margin: "30px auto",
            fontSize: "21px",
            lineHeight: "36px",
            color: "#475569",
          }}
        >
          One platform to manage CTE, CCA, EPR, Biomedical Waste,
          Hazardous Waste, CGWA, Environmental Documents,
          Compliance Calendar and Smart Reporting.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              padding: "20px 35px",
              boxShadow: "0 10px 25px rgba(0,0,0,.06)",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                color: "#166534",
                fontWeight: 700,
              }}
            >
              30 Days
            </div>

            <div>Free Trial</div>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              padding: "20px 35px",
              boxShadow: "0 10px 25px rgba(0,0,0,.06)",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                color: "#0B4F84",
                fontWeight: 700,
              }}
            >
              Cloud
            </div>

            <div>Secure Platform</div>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              padding: "20px 35px",
              boxShadow: "0 10px 25px rgba(0,0,0,.06)",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                color: "#7c3aed",
                fontWeight: 700,
              }}
            >
              Smart
            </div>

            <div>Compliance System</div>
          </div>
        </div>
      </section>
            {/* User Categories */}

      <section
        style={{
          maxWidth: "1450px",
          margin: "0 auto",
          padding: "10px 30px 70px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "38px",
            color: "#0f172a",
            marginBottom: "15px",
          }}
        >
          Choose Your Portal
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            maxWidth: "760px",
            margin: "0 auto 50px",
            fontSize: "18px",
            lineHeight: "30px",
          }}
        >
          Select your category to access GreenEnvis services.
          Industry Login is currently available.
          Other modules will be released soon.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "30px",
          }}
        >
          {categories.map((item) => (
            <div
              key={item.title}
              onClick={() => router.push(item.path)}
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                padding: "35px",
                border: "1px solid #e5e7eb",
                cursor: "pointer",
                transition: ".25s",
                boxShadow: "0 12px 35px rgba(0,0,0,.06)",
              }}
            >
              <div
                style={{
                  fontSize: "58px",
                  textAlign: "center",
                }}
              >
                {item.icon}
              </div>

              <h3
                style={{
                  textAlign: "center",
                  fontSize: "26px",
                  color: "#0B4F84",
                  marginTop: "18px",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  textAlign: "center",
                  color: "#64748b",
                  lineHeight: "28px",
                  minHeight: "90px",
                  marginTop: "18px",
                }}
              >
                {item.description}
              </p>

              <div
                style={{
                  marginTop: "25px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    background: item.active
                      ? "#16a34a"
                      : "#f59e0b",
                    color: "#ffffff",
                    padding: "12px 28px",
                    borderRadius: "50px",
                    fontWeight: 700,
                    fontSize: "15px",
                  }}
                >
                  {item.button}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
            <section
        style={{
          background: "#ffffff",
          padding: "70px 30px",
          borderTop: "1px solid #e5e7eb",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            maxWidth: "1450px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "38px",
              color: "#0B4F84",
              marginBottom: "15px",
            }}
          >
            Why GreenEnvis?
          </h2>

          <p
            style={{
              textAlign: "center",
              maxWidth: "850px",
              margin: "0 auto 55px",
              color: "#64748b",
              fontSize: "18px",
              lineHeight: "30px",
            }}
          >
            GreenEnvis simplifies environmental compliance by bringing
            licenses, renewals, statutory records and document management
            together in one secure cloud platform.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "28px",
            }}
          >
            {[
              {
                icon: "📑",
                title: "Document Management",
                desc: "Store environmental approvals, certificates and important compliance documents securely.",
              },
              {
                icon: "📅",
                title: "Compliance Tracking",
                desc: "Track renewals, due dates and important statutory activities from one dashboard.",
              },
              {
                icon: "📊",
                title: "Daily Work Monitoring",
                desc: "Maintain daily work records and generate smart work summary reports instantly.",
              },
              {
                icon: "☁️",
                title: "Cloud Based",
                desc: "Access your compliance information securely from anywhere and anytime.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                style={{
                  background: "#f8fafc",
                  borderRadius: "18px",
                  padding: "30px",
                  border: "1px solid #dbe4ee",
                }}
              >
                <div
                  style={{
                    fontSize: "48px",
                    marginBottom: "18px",
                  }}
                >
                  {feature.icon}
                </div>

                <h3
                  style={{
                    marginTop: 0,
                    color: "#0B4F84",
                    fontSize: "24px",
                  }}
                >
                  {feature.title}
                </h3>

                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "28px",
                    marginBottom: 0,
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
            <footer
        style={{
          background: "#0B4F84",
          color: "#ffffff",
          padding: "60px 30px",
        }}
      >
        <div
          style={{
            maxWidth: "1450px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "40px",
          }}
        >
          <div>
            <h2
              style={{
                marginTop: 0,
                fontSize: "32px",
              }}
            >
              GreenEnvis
            </h2>

            <p
              style={{
                color: "#dbeafe",
                lineHeight: "30px",
              }}
            >
              Smart Environmental Compliance Platform
              designed to simplify statutory compliance,
              document management and reporting for
              industries across India.
            </p>
          </div>

          <div>
            <h3>Platform</h3>

            <p>🏭 Industry Portal</p>
            <p>📊 Daily Work Record</p>
            <p>📁 Document Management</p>
            <p>📅 Compliance Tracker</p>
          </div>

          <div>
            <h3>Coming Soon</h3>

            <p>👨‍💼 Consultant Portal</p>
            <p>🧪 Laboratory Portal</p>
            <p>🏪 MSME Portal</p>
            <p>🏛 Government Authority</p>
          </div>

          <div>
            <h3>Support</h3>

            <p>📧 info@greenenvis.com</p>
            <p>📱 +91 87807 23063</p>
            <p>🌐 Gujarat, India</p>
            <p>Version : v1.0 Beta</p>
          </div>
        </div>

        <hr
          style={{
            margin: "35px 0",
            borderColor: "rgba(255,255,255,.15)",
          }}
        />

        <div
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            fontSize: "15px",
          }}
        >
          © {new Date().getFullYear()} GreenEnvis.
          All Rights Reserved.
        </div>
      </footer>
    </main>
  );
}