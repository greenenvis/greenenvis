"use client";

import {
  LayoutDashboard,
  Factory,
  UserRound,
  FlaskConical,
  Store,
  Landmark,
  Building2,
  Users,
  ClipboardCheck,
  FileText,
  CreditCard,
  Calculator,
  BarChart3,
  Bell,
  Bot,
  ShieldCheck,
  Settings,
  ClipboardList,
  LogOut,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";

import { supabase } from "@/app/supabase";

import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [selectedMenu, setSelectedMenu] =
    useState<string>("");

  const menuIcons: Record<
    string,
    React.ElementType
  > = {
    Dashboard: LayoutDashboard,
    Industry: Factory,
    Consultant: UserRound,
    Laboratory: FlaskConical,
    "Small Business": Store,
    Government: Landmark,
    "Office Management": Building2,
    "Client Management": Users,
    Compliance: ClipboardCheck,
    "Document Center": FileText,
    Subscription: CreditCard,
    Accounting: Calculator,
    Analytics: BarChart3,
    Notifications: Bell,
    "AI Center": Bot,
    Security: ShieldCheck,
    Settings: Settings,
    "Audit Trail": ClipboardList,
  };

  const menus = [
    "Dashboard",
    "Industry",
    "Consultant",
    "Laboratory",
    "Small Business",
    "Government",
    "Office Management",
    "Client Management",
    "Compliance",
    "Document Center",
    "Subscription",
    "Accounting",
    "Analytics",
    "Notifications",
    "AI Center",
    "Security",
    "Settings",
    "Audit Trail",
  ];

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(
      "Logout failed:",
      error
    );
    return;
  }

  router.push("/login");
};

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);

    if (menu === "Dashboard") {
      router.push("/super-admin/dashboard");
      return;
    }

    if (menu === "Industry") {
      router.push("/super-admin/industry");
      return;
    }

    if (menu === "Consultant") {
      router.push("/super-admin/consultant");
      return;
    }
if (menu === "Subscription") {
  router.push("/super-admin/subscription");
  return;
}

  };

  return (
    <aside
      style={{
        width: 260,
        background: "#0B4F6C",
        color: "#fff",
        minHeight: "100vh",
        padding: 20,
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          textAlign: "center",
          paddingBottom: 20,
          marginBottom: 20,
          borderBottom:
            "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#ffffff",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          GreenEnvis
        </h2>

        <div
          style={{
            marginTop: 6,
            fontSize: "12px",
            color: "#cbd5e1",
          }}
        >
          Super Admin Panel
        </div>
      </div>

      {menus.map((menu) => {
        const Icon = menuIcons[menu];

        const routeActive =
          (menu === "Dashboard" &&
            pathname ===
              "/super-admin/dashboard") ||
          (menu === "Industry" &&
            pathname ===
              "/super-admin/industry") ||
          (menu === "Consultant" &&
            pathname ===
              "/super-admin/consultant");

        const isActive =
          routeActive ||
          selectedMenu === menu;

        return (
          <div
            key={menu}
            onClick={() =>
              handleMenuClick(menu)
            }
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 14px",
              marginBottom: 6,
              borderRadius: 10,
              cursor: "pointer",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 500,
              background: isActive
                ? "#16a34a"
                : "transparent",
              boxShadow: isActive
                ? "0 4px 12px rgba(22,163,74,0.35)"
                : "none",
              transition:
                "background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
              userSelect: "none",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background =
                  "rgba(255,255,255,0.12)";

                e.currentTarget.style.transform =
                  "translateX(3px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background =
                  "transparent";

                e.currentTarget.style.transform =
                  "translateX(0)";
              }
            }}
          >
            {Icon ? (
              <Icon
                size={18}
                strokeWidth={2}
                style={{
                  marginRight: 10,
                  flexShrink: 0,
                }}
              />
            ) : null}

            <span>{menu}</span>
          </div>
        );
      })}
<div
  onClick={handleLogout}
  style={{
    display: "flex",
    alignItems: "center",
    padding: "12px 14px",
    marginTop: 14,
    borderRadius: 10,
    cursor: "pointer",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 500,
    borderTop:
      "1px solid rgba(255,255,255,0.15)",
    paddingTop: 18,
    transition:
      "background 0.2s ease, transform 0.2s ease",
    userSelect: "none",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background =
      "rgba(220,38,38,0.85)";

    e.currentTarget.style.transform =
      "translateX(3px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background =
      "transparent";

    e.currentTarget.style.transform =
      "translateX(0)";
  }}
>
  <LogOut
    size={18}
    strokeWidth={2}
    style={{
      marginRight: 10,
      flexShrink: 0,
    }}
  />

  <span>Logout</span>
</div>
    </aside>
  );
}