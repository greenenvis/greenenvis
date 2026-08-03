"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/supabase";

export default function DeletedWorkRecordsPage() {
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    loadDeletedRecords();
  }, []);

const loadDeletedRecords = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setRecords([]);
    return;
  }
  
  const { data, error } = await supabase
    .from("work_record_deleted_history")
    .select("*")
    .eq("deleted_by", user.id)
    .order("deleted_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setRecords(data || []);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>🗑 Deleted Work Records</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 20,
        }}
      >
        <thead>
          <tr>
            <th>Unit Name</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Deleted At</th>
          </tr>
        </thead>

        <tbody>
          {records.map((item) => (
            <tr key={item.id}>
              <td>{item.unit_name}</td>
              <td>{item.contact_person}</td>
              <td>{item.status}</td>
              <td>{item.payment_status}</td>
              <td>
                {new Date(item.deleted_at).toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}