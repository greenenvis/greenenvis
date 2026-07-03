"use client";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "60px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          color: "#166534",
          marginBottom: "20px",
        }}
      >
        GreenEnvis
      </h1>

      <h2
        style={{
          fontSize: "28px",
          marginBottom: "15px",
        }}
      >
        India's Smart Environmental Compliance Platform
      </h2>

      <p
        style={{
          fontSize: "18px",
          color: "#475569",
        }}
      >
        Manage SPCB licenses (CTE&CCA), EPR Certificate, BMW Authorization, CGWA, Documents,
        Renewals licenses & Other Compliance from one dashboard.
      </p>
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "20px",
    marginTop: "60px",
  }}
>
  {[
    "Industry",
    "Consultant",
    "Laboratory",
    "Small Business",
    "Government Authority",
  ].map((sector) => (
  <div
  key={sector}
  onClick={() => {
    if (sector === "Industry") router.push("/industry-login");
    if (sector === "Consultant") router.push("/consultant-login");
    if (sector === "Laboratory") router.push("/laboratory-login");
    if (sector === "Small Business") router.push("/small-business-login");
    if (sector === "Government Authority") router.push("/government-login");
  }}
  style={{
    background: "#ffffff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    cursor: "pointer",
  }}
>
      <h3>{sector}</h3>
    </div>
  ))}
</div>
    </main>
  );
}