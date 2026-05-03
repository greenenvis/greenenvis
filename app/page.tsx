"use client";

import { FaUsers, FaClipboardList, FaCheckCircle, FaFolder, FaBell } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* SIDEBAR */}
      <div className="w-64 bg-green-800 text-white p-5">
        <h2 className="text-xl font-bold">GreenEnvis</h2>
        <p className="text-sm mb-5 opacity-80">Compliance Simplified</p>

        {[
          "Dashboard",
          "Clients",
          "Compliance",
          "Applications",
          "Documents",
          "Tasks",
          "Reminders",
          "Quotations",
          "Checklists",
          "Reports",
        ].map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded mb-2 cursor-pointer ${
              i === 0 ? "bg-green-700" : "hover:bg-green-700"
            }`}
          >
            {m}
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Simplify Compliance. Save Time. Stay Compliant.
            </h1>
            <p className="text-gray-500">
              All your compliance in one smart dashboard
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <span>🔔</span>
            <span>👤 GreenEnvis</span>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <Card icon={<FaUsers />} value="24" title="Total Clients" />
          <Card icon={<FaClipboardList />} value="17" title="Pending Work" />
          <Card icon={<FaCheckCircle />} value="32" title="Complete Work" />
          <Card icon={<FaFolder />} value="14" title="File Closed" />
          <Card icon={<FaBell />} value="09" title="Reminder Work" />
        </div>

        {/* TOOLS */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            "Share Checklist",
            "Auto Quotation",
            "Siting Criteria Info",
            "Acts, Rules & Forms",
          ].map((t, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-lg shadow hover:shadow-md cursor-pointer"
            >
              <h3 className="font-semibold">{t}</h3>
              <p className="text-sm text-gray-500 mt-2">
                Click to open
              </p>
            </div>
          ))}
        </div>

        {/* TRACKER */}
        <div className="bg-white p-5 rounded-lg shadow mb-6">
          <h3 className="font-semibold mb-3">Compliance Tracker</h3>

          <div className="grid grid-cols-6 gap-3">
            {["CTE","CCA","EC","HW","Form 4&5","Other"].map((c,i)=>(
              <div key={i} className="bg-gray-100 p-3 rounded text-center">
                <p className="font-medium">{c}</p>
                <p className="text-sm text-gray-600">
                  {Math.floor(Math.random()*10)+1} Pending
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="grid grid-cols-3 gap-4">

          <div className="bg-white p-5 rounded shadow col-span-2">
            <h3 className="font-semibold mb-2">Recent Activities</h3>
            <p>Client A - CTE Submitted</p>
            <p>Client B - CCA Approved</p>
            <p>Client C - Document Uploaded</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3 className="font-semibold mb-2">Upcoming Reminders</h3>
            <p>CTE Renewal - 15 Days</p>
            <p>CCA Renewal - 22 Days</p>
            <p>HW Return - 30 Days</p>
          </div>

        </div>

      </div>
    </div>
  );
}

function Card({ icon, value, title }: any) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
      <div className="text-xl text-green-600">{icon}</div>
      <div>
        <h2 className="font-bold">{value}</h2>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
}