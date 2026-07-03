"use client";

import { useState } from "react";

export default function AddCompliancePage() {

const [category, setCategory] = useState("");
const [complianceName, setComplianceName] = useState("");
const complianceOptions: Record<string, string[]> = {
    
  "Consent / Authorization": [
    "Consent to Establish (CTE)",
    "Consent to Operate (CCA)",
    "Hazardous Waste Authorization",
    "Biomedical Waste Authorization",
    "Plastic Waste Registration",
    "E-Waste Registration",
    "Battery Waste Registration",
    "Used Oil Registration",
    "CGWA NOC",
  ],

  "Annual Return": [
    "Biomedical Waste Annual Return",
    "Hazardous Waste Annual Return",
    "E-Waste Annual Return",
    "Plastic Waste Annual Return",
    "Battery Waste Annual Return",
    "Used Oil Annual Return",
    "Tyre Waste Annual Return",
  ],

  Monitoring: [
    "Water Analysis",
    "Wastewater Analysis",
    "Stack Emission Monitoring",
    "Ambient Air Monitoring",
    "Noise Monitoring",
    "Groundwater Analysis",
  ],

  "EPR Compliance": [
    "Plastic EPR",
    "E-Waste EPR",
    "Battery EPR",
    "Used Oil EPR",
    "Tyre EPR",
  ],

  "CGWA Compliance": [
    "CGWA Renewal",
    "Groundwater Monitoring",
    "Rainwater Harvesting Compliance",
  ],

  "Environmental Clearance": [
    "EC Six Monthly Compliance",
    "EC Annual Compliance",
  ],

  "Other Compliance": [
    "Form-4",
    "Form-5",
    "Manifest",
    "Show Cause Reply",
    "Court / NGT Compliance",
  ],
};
const frequencyMap: Record<string, string> = {
  // Annual Returns
  "Biomedical Waste Annual Return": "Annual",
  "Hazardous Waste Annual Return": "Annual",
  "E-Waste Annual Return": "Annual",
  "Plastic Waste Annual Return": "Annual",
  "Battery Waste Annual Return": "Annual",
  "Used Oil Annual Return": "Annual",
  "Tyre Waste Annual Return": "Annual",

  // Monitoring
  "Water Analysis": "Monthly",
  "Wastewater Analysis": "Monthly",
  "Stack Emission Monitoring": "Quarterly",
  "Ambient Air Monitoring": "Quarterly",
  "Noise Monitoring": "Half-Yearly",
  "Groundwater Analysis": "Half-Yearly",

  // Consent
  "Consent to Establish (CTE)": "One Time",
  "Consent to Operate (CCA)": "As Per Validity",
  "Hazardous Waste Authorization": "As Per Validity",
  "Biomedical Waste Authorization": "As Per Validity",
  "Plastic Waste Registration": "As Per Validity",
  "E-Waste Registration": "As Per Validity",
  "Battery Waste Registration": "As Per Validity",
  "Used Oil Registration": "As Per Validity",
  "CGWA NOC": "As Per Validity",

  // EC
  "EC Six Monthly Compliance": "Half-Yearly",
  "EC Annual Compliance": "Annual",
};
const dueDateRuleMap: Record<
  string,
  {
    dueDate: string;
    reminder: string;
  }
> = {
  // ===== Annual Returns =====
  "Biomedical Waste Annual Return": {
    dueDate: "30 June Every Year",
    reminder: "30 Days Before",
  },

  "Hazardous Waste Annual Return": {
    dueDate: "30 June Every Year",
    reminder: "30 Days Before",
  },

  "E-Waste Annual Return": {
    dueDate: "30 June Every Year",
    reminder: "30 Days Before",
  },

  "Plastic Waste Annual Return": {
    dueDate: "30 June Every Year",
    reminder: "30 Days Before",
  },

  "Battery Waste Annual Return": {
    dueDate: "30 June Every Year",
    reminder: "30 Days Before",
  },

  "Used Oil Annual Return": {
    dueDate: "30 June Every Year",
    reminder: "30 Days Before",
  },

  "Tyre Waste Annual Return": {
    dueDate: "30 June Every Year",
    reminder: "30 Days Before",
  },

  // ===== Monitoring =====

  "Water Analysis": {
    dueDate: "Last Day of Every Month",
    reminder: "7 Days Before",
  },

  "Wastewater Analysis": {
    dueDate: "Last Day of Every Month",
    reminder: "7 Days Before",
  },

  "Stack Emission Monitoring": {
    dueDate: "Quarter End",
    reminder: "15 Days Before",
  },

  "Ambient Air Monitoring": {
    dueDate: "Quarter End",
    reminder: "15 Days Before",
  },

  "Noise Monitoring": {
    dueDate: "Half Yearly",
    reminder: "15 Days Before",
  },

  "Groundwater Analysis": {
    dueDate: "Half Yearly",
    reminder: "15 Days Before",
  },
};
return (
    <div style={{ padding: "20px" }}>
      <h1>Add New Compliance</h1>

  <div style={{ marginTop: "30px" }}>

  <table
    border={1}
    cellPadding={8}
    style={{
      width: "100%",
      borderCollapse: "collapse",
    }}
  >
    <tbody>

      <tr>
        <td style={{ width: "30%" }}>
          Compliance Category
        </td>

        <td>
        <select
  value={category}
  onChange={(e) => {
    setCategory(e.target.value);
    setComplianceName("");
  }}
  style={{
    width: "100%",
    padding: "8px",
  }}
>
  <option value="">Select Category</option>

  <option>Consent / Authorization</option>

  <option>Annual Return</option>

  <option>Monitoring</option>

  <option>EPR Compliance</option>

  <option>CGWA Compliance</option>

  <option>Environmental Clearance</option>

  <option>Other Compliance</option>
</select>
        </td>
      </tr>

    </tbody>
  </table>
<div style={{ marginTop: "25px" }}>

  <table
    border={1}
    cellPadding={8}
    style={{
      width: "100%",
      borderCollapse: "collapse",
    }}
  >
    <tbody>

      <tr>

        <td style={{ width: "30%" }}>
          Compliance Name
        </td>

        <td>

   <select
  value={complianceName}
  onChange={(e) => setComplianceName(e.target.value)}
  style={{
    width: "100%",
    padding: "8px",
  }}
>
  <option value="">Select Compliance</option>

  {(complianceOptions[category] || []).map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ))}
</select>

        </td>

      </tr>

    </tbody>
  </table>

</div>
<div style={{ marginTop: "25px" }}>

  <table
    border={1}
    cellPadding={8}
    style={{
      width: "100%",
      borderCollapse: "collapse",
    }}
  >
    <tbody>

      <tr>

        <td style={{ width: "30%" }}>
          Frequency
        </td>

        <td>

         <input
  type="text"
  value={frequencyMap[complianceName] || ""}
  readOnly
  placeholder="Will be selected automatically"
  style={{
    width: "100%",
    padding: "8px",
    background: "#f5f5f5",
  }}
/>

        </td>

      </tr>

    </tbody>
  </table>

</div>
<div style={{ marginTop: "25px" }}>

  <table
    border={1}
    cellPadding={8}
    style={{
      width: "100%",
      borderCollapse: "collapse",
    }}
  >
    <tbody>

      <tr>

        <td style={{ width: "30%" }}>
          Due Date Rule
        </td>

        <td>

          <input
            type="text"
            value={dueDateRuleMap[complianceName]?.dueDate || ""}
            readOnly
            placeholder="Will be selected automatically"
            style={{
              width: "100%",
              padding: "8px",
              background: "#f5f5f5",
            }}
          />

        </td>

      </tr>

    </tbody>
  </table>

</div>
</div>
    </div>
  );
}