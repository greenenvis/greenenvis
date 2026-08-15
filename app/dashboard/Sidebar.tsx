"use client";

import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../supabase";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

 const sidebarMenu = [
  { title: "📝 Daily Work Record", path: "/dashboard/daily-work-record" },

  { title: "🏠 Dashboard", path: "/dashboard" },
  { title: "🏭 Client Profile", path: "/dashboard/industry-profile" },
  { title: "📋 Compliance Tracker", path: "/dashboard/compliance-tracker" },
  { title: "📄 Forms", path: "/dashboard/forms" },
  { title: "📁 Formats", path: "/dashboard/formats" },
  { title: "📚 Knowledge Center", path: "/dashboard/under-development" },
  { title: "💳 Payment Details", path: "/dashboard/under-development" },
  { title: "👨‍💼 My Consultant", path: "/dashboard/under-development" },
  { title: "🛟 Support", path: "/dashboard/under-development" },
  { title: "🗂️ Digital Locker", path: "/dashboard/under-development" },
];

  return (
    <div
      style={{
        width: "280px",
        background: "#ffffff",
        borderRight: "1px solid #dbe4ee",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        <img
          src="/logo.png"
          alt="Logo"
          style={{
            width: "180px",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gap: "12px",
        }}
      >
        {sidebarMenu.map((menu) => (
          <div
            key={menu.title}
            onClick={() => router.push(menu.path)}
            style={{
              padding: "14px 16px",
              borderRadius: "10px",
              border: "1px solid #dbe4ee",
              cursor: "pointer",
              transition: "0.2s",

              background:
                pathname === menu.path
                  ? "#0B4F84"
                  : "#ffffff",

              color:
                pathname === menu.path
                  ? "#ffffff"
                  : "#000000",

              fontWeight:
                pathname === menu.path
                  ? "bold"
                  : "normal",
            }}
          >
            {menu.title}
          </div>
        ))}

        <button
          onClick={handleLogout}
          style={{
            marginTop: "25px",
            background: "#dc2626",
            color: "#ffffff",
            border: "none",
            padding: "14px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
