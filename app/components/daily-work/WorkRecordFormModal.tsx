"use client";

import React from "react";

type Props = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function WorkRecordFormModal({
  open,
  title,
  children,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        overflowY: "auto",
        zIndex: 9999,
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "95%",
          maxWidth: "1700px",
          background: "#fff",
          borderRadius: "14px",
          boxShadow: "0 20px 50px rgba(0,0,0,.25)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "#0B4F84",
            color: "#fff",
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "22px",
            }}
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "#ef4444",
              color: "#fff",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            padding: "24px",
            maxHeight: "82vh",
            overflowY: "auto",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}