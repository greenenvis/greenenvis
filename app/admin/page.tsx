"use client";

import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [noticeType, setNoticeType] = useState("notice");
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotices = async () => {
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setNotices(data || []);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleAddNotice = async () => {
    if (!title) {
      alert("Please enter notice title");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("notices").insert([
      {
        title,
        notice_type: noticeType,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error adding notice");
      console.log(error);
      return;
    }

    alert("Notice Added Successfully");

    setTitle("");
    fetchNotices();
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from("notices")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchNotices();
    }
  };

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
        <h1 style={{ color: "#166534" }}>
          Admin Notice Management Panel
        </h1>

        <div
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "12px",
            marginTop: "20px",
            marginBottom: "30px",
          }}
        >
          <h2>Add New Notice</h2>

          <input
            placeholder="Enter Notice Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          <select
            value={noticeType}
            onChange={(e) => setNoticeType(e.target.value)}
            style={inputStyle}
          >
            <option value="notice">Notice Board</option>
            <option value="advertisement">Current Advertisement</option>
          </select>

          <button
            onClick={handleAddNotice}
            disabled={loading}
            style={buttonStyle}
          >
            {loading ? "Adding..." : "Add Notice"}
          </button>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "12px",
          }}
        >
          <h2>All Notices</h2>

          {notices.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #dbe3ea",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "14px",
              }}
            >
              <p><b>Title:</b> {item.title}</p>
              <p><b>Type:</b> {item.notice_type}</p>
              <p><b>Date:</b> {new Date(item.created_at).toLocaleDateString()}</p>

              <button
                onClick={() => handleDelete(item.id)}
                style={{
                  background: "#dc2626",
                  color: "#ffffff",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "16px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "15px",
};

const buttonStyle = {
  background: "#16a34a",
  color: "#ffffff",
  border: "none",
  padding: "14px 22px",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
};