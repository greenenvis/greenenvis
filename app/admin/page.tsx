"use client";

import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function AdminPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      alert("Error loading inquiries");
    } else {
      setInquiries(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            color: "#166534",
            marginBottom: "10px",
          }}
        >
          Admin Real Inquiry List
        </h1>

        <p
          style={{
            marginBottom: "25px",
            color: "#475569",
          }}
        >
          Live inquiries submitted from website
        </p>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            overflowX: "auto",
          }}
        >
          {loading ? (
            <h3>Loading inquiries...</h3>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#0f172a",
                    color: "#ffffff",
                  }}
                >
                  <th style={thStyle}>Industry</th>
                  <th style={thStyle}>Contact Person</th>
                  <th style={thStyle}>Mobile</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Service</th>
                  <th style={thStyle}>Details</th>
                </tr>
              </thead>

              <tbody>
                {inquiries.map((item) => (
                  <tr key={item.id}>
                    <td style={tdStyle}>{item.industry_name}</td>
                    <td style={tdStyle}>{item.contact_person}</td>
                    <td style={tdStyle}>{item.mobile}</td>
                    <td style={tdStyle}>{item.email}</td>
                    <td style={tdStyle}>{item.service}</td>
                    <td style={tdStyle}>{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "14px",
  textAlign: "left" as const,
  fontSize: "14px",
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #e2e8f0",
  fontSize: "14px",
};