"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function ReminderPage() {
  const [reminders, setReminders] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
  const { data: reminderData } = await supabase
  .from("compliance_reminders")
  .select("*")
  .order("due_date");

setReminders(reminderData || []);

const { data: profileData } = await supabase
  .from("industry_profile")
  .select("*")
  .limit(1)
  .single();

setProfile(profileData);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Reminder Engine</h1>

      <p style={{ color: "#666", marginBottom: 20 }}>
        Upcoming environmental compliances.
      </p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead
          style={{
            background: "#166534",
            color: "#fff",
          }}
        >
          <tr>
            <th style={{ padding: 12 }}>Compliance</th>
            <th style={{ padding: 12 }}>Document</th>
            <th style={{ padding: 12 }}>Due Date</th>
            <th style={{ padding: 12 }}>Reminder Date</th>
            <th style={{ padding: 12 }}>Status</th>
          </tr>
        </thead>

        <tbody>
         {reminders
  .filter((item) => {
    if (!profile) return false;

    switch (item.document_name) {
      case "Hazardous Waste Authorization":
        return profile.hazardous_waste;

      case "Plastic EPR Certificate":
        return profile.plastic_epr;

      case "E-Waste EPR Certificate":
        return profile.ewaste_epr;

      case "Used Oil EPR Certificate":
        return profile.used_oil_epr;

      case "Battery EPR Certificate":
        return profile.battery_epr;

      case "Tyre EPR Certificate":
        return profile.tyre_epr;

      case "CGWA NOC":
        return profile.cgwa_noc;

      case "Factory License":
        return profile.factory_license;

      case "Fire NOC":
        return profile.fire_noc;

      default:
        return true;
    }
  })
  .map((item) => (
            <tr key={item.id}>
              <td style={{ padding: 12 }}>{item.compliance_name}</td>
              <td style={{ padding: 12 }}>{item.document_name}</td>
              <td style={{ padding: 12 }}>{item.due_date}</td>
              <td style={{ padding: 12 }}>{item.reminder_date}</td>
              <td style={{ padding: 12 }}>
                <span
                  style={{
                    background: "#fef3c7",
                    color: "#92400e",
                    padding: "5px 10px",
                    borderRadius: 20,
                    fontWeight: "bold",
                  }}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}