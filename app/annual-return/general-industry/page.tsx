
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function GeneralIndustryPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const emptyForm: any = {
    financial_year: "",
    facility_name: "",
    facility_address: "",
    authorization_no: "",
    authorization_date: "",
    authorized_person: "",
    return_type: "Generator",
    remarks: "",
  };

  const [formData, setFormData] = useState<any>(emptyForm);
  const unitOptions = ["Kg/Month", "Kg/Yrs", "MT/Month", "MT/Yrs", "Nos/Month", "Nos/Yrs", "Ltr/Month", "Ltr/Yrs", "Other unit if any"];

  // Production table rows (start with one row)
  const [productRows, setProductRows] = useState<any[]>([
    { id: Date.now().toString(), productName: "", actualQty: "", unit: "MT", ccaQty: "", ccaUnit: "MT" },
  ]);

  const addProductRow = () =>
    setProductRows((s) => [...s, { id: Date.now().toString(), productName: "", actualQty: "", unit: "MT", ccaQty: "", ccaUnit: "MT" }]);
  const updateProductRow = (id: string, key: string, value: any) => setProductRows((s) => s.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
  const removeProductRow = (id: string) => setProductRows((s) => s.filter((r) => r.id !== id));

  // PART A waste table rows (start with one row)
  const [wasteRows, setWasteRows] = useState<any[]>([
    { id: Date.now().toString(), type: "", schedule: "", totalQty: "", unit: "MT", ccaQty: "", ccaUnit: "MT" },
  ]);
  const addWasteRow = () => setWasteRows((s) => [...s, { id: Date.now().toString(), type: "", schedule: "", totalQty: "", unit: "MT", ccaQty: "", ccaUnit: "MT" }]);
  const updateWasteRow = (id: string, key: string, value: any) => setWasteRows((s) => s.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
  const removeWasteRow = (id: string) => setWasteRows((s) => s.filter((r) => r.id !== id));

  // Quantity dispatched / utilized / storage
  const [dispatched, setDispatched] = useState<any>({ disposal: "", recycler: "", others: "", disposalUnit: "MT", recyclerUnit: "MT", othersUnit: "MT" });
  const [utilizedInHouse, setUtilizedInHouse] = useState<any>({ qty: "", unit: "MT" });
  const [inStorage, setInStorage] = useState<any>({ qty: "", unit: "MT" });

  // PART B (7 rows)
  const partBLabels = [
    "Sent for recycling",
    "Sent for co-processing",
    "Sent for landfilling",
    "Sent for incineration",
    "Sent for secure landfill",
    "Sent for treatment",
    "Other disposition",
  ];
  const [partB, setPartB] = useState<any>(partBLabels.map((l) => ({ label: l, qty: "", unit: "MT" })));

  // PART C (8 rows)
  const partCLabels = [
    "Quantity of waste received during the year (1.	domestic sources or 2.	imported (if applicable)",
    "Quantity in stock at the beginning of the year",
    "Quantity recycled or co-processed or used",
    "Quantity of products dispatched (wherever applicable)",
    "Quantity of waste generated",
    "Quantity of waste disposed",
    "Quantity re-exported (wherever applicable)",
    "Quantity in storage at the end of the year",
  ];
  const [partC, setPartC] = useState<any>(partCLabels.map((l) => ({ label: l, qty: "", unit: "MT" })));

  const fetchRecords = async () => {
    const { data, error } = await supabase
      .from("annual_return_general_industry")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setRecords(data || []);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const validateForm = () => {
    const required = [
      { key: "financial_year", label: "Financial Year" },
      { key: "facility_name", label: "Facility Name" },
      { key: "facility_address", label: "Facility Address" },
      { key: "authorization_no", label: "Authorization Number" },
      { key: "authorization_date", label: "Authorization Date" },
      { key: "authorized_person", label: "Authorized Person" },
    ];

    const missing = required.filter((r) => !formData[r.key]?.toString().trim());
    if (missing.length) {
      alert(`Please fill required fields: ${missing.map((m) => m.label).join(", ")}`);
      return false;
    }
    return true;
  };

  const printPage = () => {
    window.print();
  };

  const saveRecord = async () => {
    if (!validateForm()) return;
    setLoading(true);

    const payload = {
  ...formData,

  product_rows: productRows,
  waste_rows: wasteRows,

  dispatched: dispatched,
  utilized_in_house: utilizedInHouse,
  in_storage: inStorage,

  part_b: partB,
  part_c: partC,
};

    if (editingId) {
      const { error } = await supabase
        .from("annual_return_general_industry")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }
      alert("Record Updated Successfully");
      setEditingId(null);
    } else {
      const { error } = await supabase.from("annual_return_general_industry").insert([payload]);
      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }
      alert("Record Saved Successfully");
    }

    setFormData(emptyForm);setProductRows([
  {
    id: Date.now().toString(),
    productName: "",
    actualQty: "",
    unit: "MT",
    ccaQty: "",
    ccaUnit: "MT",
  },
]);

setWasteRows([
  {
    id: Date.now().toString(),
    type: "",
    schedule: "",
    totalQty: "",
    unit: "MT",
    ccaQty: "",
    ccaUnit: "MT",
  },
]);

setDispatched({
  disposal: "",
  recycler: "",
  others: "",
  disposalUnit: "MT",
  recyclerUnit: "MT",
  othersUnit: "MT",
});

setUtilizedInHouse({
  qty: "",
  unit: "MT",
});

setInStorage({
  qty: "",
  unit: "MT",
});

setPartB(
  partBLabels.map((l) => ({
    label: l,
    qty: "",
    unit: "MT",
  }))
);

setPartC(
  partCLabels.map((l) => ({
    label: l,
    qty: "",
    unit: "MT",
  }))
);
    fetchRecords();
    setLoading(false);
  };

 const editRecord = (rec: any) => {
  setEditingId(rec.id);

  setFormData({
    financial_year: rec.financial_year || "",
    facility_name: rec.facility_name || "",
    facility_address: rec.facility_address || "",
    authorization_no: rec.authorization_no || "",
    authorization_date: rec.authorization_date || "",
    authorized_person: rec.authorized_person || "",
    return_type: rec.return_type || "Generator",
    remarks: rec.remarks || "",
  });

  setProductRows(rec.product_rows || []);
  setWasteRows(rec.waste_rows || []);

  setDispatched(
    rec.dispatched || {
      disposal: "",
      recycler: "",
      others: "",
      disposalUnit: "MT",
      recyclerUnit: "MT",
      othersUnit: "MT",
    }
  );

  setUtilizedInHouse(
    rec.utilized_in_house || {
      qty: "",
      unit: "MT",
    }
  );

  setInStorage(
    rec.in_storage || {
      qty: "",
      unit: "MT",
    }
  );

  setPartB(rec.part_b || []);
  setPartC(rec.part_c || []);

  window.scrollTo({ top: 0, behavior: "smooth" });
};

  const deleteRecord = async (id: string) => {
    if (!confirm("Delete this record?")) return;
    const { error } = await supabase.from("annual_return_general_industry").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    fetchRecords();
  };

  const styles: any = {
    page: { padding: 20, fontFamily: "Arial, sans-serif", color: "#000" },
    formHeader: { textAlign: "center", marginBottom: 24 },
    sectionTitle: { margin: "20px 0 10px", fontSize: 16, fontWeight: 700 },
    table: { width: "100%", borderCollapse: "collapse", marginBottom: 16 },
    th: { border: "1px solid #000", padding: 8, background: "#f5f5f5", textAlign: "left" },
    td: { border: "1px solid #000", padding: 8, verticalAlign: "top" },
    input: { width: "100%", padding: 8, border: "1px solid #000", fontSize: 14 },
    textarea: { width: "100%", padding: 8, border: "1px solid #000", fontSize: 14, minHeight: 80, resize: "vertical" },
    buttonRow: { display: "flex", gap: 8, marginTop: 12 },
    primaryBtn: { background: "#000", color: "#fff", border: "none", padding: "10px 16px", cursor: "pointer", fontWeight: 700 },
    secondaryBtn: { background: "#fff", color: "#000", border: "1px solid #000", padding: "10px 16px", cursor: "pointer", fontWeight: 700 },
    dangerBtn: { background: "#fff", color: "#000", border: "1px solid #000", padding: "8px 12px", cursor: "pointer", fontWeight: 700 },
    savedRecordsTitle: { margin: "32px 0 12px", fontSize: 18, fontWeight: 700 },
  };

  return (
    <div style={styles.page}>
      
       <style>{`
      @media print {
        .no-print {
          display: none !important;
        }
      }
    `}</style>

      <div id="print-area">
        <div style={styles.formHeader}>
          <h1>FORM 4</h1>
          <div>[See rules 6(5), 13(8), 16(6) and 20(2)]</div>
          <div>FORM FOR FILING ANNUAL RETURNS</div>
        </div>

        <div style={styles.sectionTitle}>SECTION A — Facility & Authorization Details</div>

        <table style={{ ...styles.table, borderCollapse: "collapse", width: "100%" }}>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #000", padding: 8, width: 40 }}>1</td>
              <td style={{ border: "1px solid #000", padding: 8, width: 260 }}>Financial Year</td>
              <td style={{ border: "1px solid #000", padding: 8 }}>
                <select value={formData.financial_year} onChange={(e) => setFormData({ ...formData, financial_year: e.target.value })} style={styles.input}>
                  <option value="">Select Financial Year</option>
                  <option>FY 2024-25</option>
                  <option>FY 2025-26</option>
                  <option>FY 2026-27</option>
                </select>
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: 8 }}>2</td>
              <td style={{ border: "1px solid #000", padding: 8 }}>Facility Name</td>
              <td style={{ border: "1px solid #000", padding: 8 }}><input value={formData.facility_name} onChange={(e) => setFormData({ ...formData, facility_name: e.target.value })} style={styles.input} /></td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: 8 }}>3</td>
              <td style={{ border: "1px solid #000", padding: 8 }}>Facility Address</td>
              <td style={{ border: "1px solid #000", padding: 8 }}><textarea value={formData.facility_address} onChange={(e) => setFormData({ ...formData, facility_address: e.target.value })} style={styles.textarea} /></td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: 8 }}>4</td>
              <td style={{ border: "1px solid #000", padding: 8 }}>Authorization Number</td>
              <td style={{ border: "1px solid #000", padding: 8 }}><input value={formData.authorization_no} onChange={(e) => setFormData({ ...formData, authorization_no: e.target.value })} style={styles.input} /></td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: 8 }}>5</td>
              <td style={{ border: "1px solid #000", padding: 8 }}>Authorization Issue Date</td>
              <td style={{ border: "1px solid #000", padding: 8 }}><input type="date" value={formData.authorization_date} onChange={(e) => setFormData({ ...formData, authorization_date: e.target.value })} style={styles.input} /></td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: 8 }}>6</td>
              <td style={{ border: "1px solid #000", padding: 8 }}>Name Of Authorized Person</td>
              <td style={{ border: "1px solid #000", padding: 8 }}><input value={formData.authorized_person} onChange={(e) => setFormData({ ...formData, authorized_person: e.target.value })} style={styles.input} /></td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: 8 }}>7</td>
              <td style={{ border: "1px solid #000", padding: 8 }}>Authorized Person Full Address</td>
              <td style={{ border: "1px solid #000", padding: 8 }}><textarea value={formData.authorized_person_address || ""} onChange={(e) => setFormData({ ...formData, authorized_person_address: e.target.value })} style={styles.textarea} /></td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: 8 }}>8</td>
              <td style={{ border: "1px solid #000", padding: 8 }}>Telephone / Fax Number</td>
              <td style={{ border: "1px solid #000", padding: 8 }}><input value={formData.telephone_fax || ""} onChange={(e) => setFormData({ ...formData, telephone_fax: e.target.value })} style={styles.input} /></td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: 8 }}>9</td>
              <td style={{ border: "1px solid #000", padding: 8 }}>E-Mail ID</td>
              <td style={{ border: "1px solid #000", padding: 8 }}><input type="email" value={formData.email_id || ""} onChange={(e) => setFormData({ ...formData, email_id: e.target.value })} style={styles.input} /></td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: 8 }}>10</td>
              <td style={{ border: "1px solid #000", padding: 8 }}>Production During The Year</td>
              <td style={{ border: "1px solid #000", padding: 8 }}>
                <div style={{ marginBottom: 8 }}>
                  <button type="button" onClick={addProductRow} style={styles.secondaryBtn}>+ Add Row</button>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={{ border: "1px solid #000", padding: 6 }}>Product Name</th>
                        <th style={{ border: "1px solid #000", padding: 6 }}>Actual Production Quantity</th>
                        <th style={{ border: "1px solid #000", padding: 6 }}>Unit</th>
                        <th style={{ border: "1px solid #000", padding: 6 }}>Production As Per CCA</th>
                        <th style={{ border: "1px solid #000", padding: 6 }}>Unit</th>
                        <th style={{ border: "1px solid #000", padding: 6 }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productRows.map((r) => (
                        <tr key={r.id}>
                          <td style={{ border: "1px solid #000", padding: 6 }}><input value={r.productName} onChange={(e) => updateProductRow(r.id, "productName", e.target.value)} style={styles.input} /></td>
                          <td style={{ border: "1px solid #000", padding: 6 }}><input value={r.actualQty} onChange={(e) => updateProductRow(r.id, "actualQty", e.target.value)} style={styles.input} /></td>
                          <td style={{ border: "1px solid #000", padding: 6 }}>
                            <select value={r.unit} onChange={(e) => updateProductRow(r.id, "unit", e.target.value)} style={styles.input}>{unitOptions.map((u) => <option key={u}>{u}</option>)}</select>
                          </td>
                          <td style={{ border: "1px solid #000", padding: 6 }}><input value={r.ccaQty} onChange={(e) => updateProductRow(r.id, "ccaQty", e.target.value)} style={styles.input} /></td>
                          <td style={{ border: "1px solid #000", padding: 6 }}>
                            <select value={r.ccaUnit} onChange={(e) => updateProductRow(r.id, "ccaUnit", e.target.value)} style={styles.input}>{unitOptions.map((u) => <option key={u}>{u}</option>)}</select>
                          </td>
                          <td style={{ border: "1px solid #000", padding: 6 }}><button type="button" onClick={() => removeProductRow(r.id)} style={styles.dangerBtn}>Remove</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div style={styles.sectionTitle}>PART A — To be filled by Hazardous Waste Generators</div>
        <div>
          <div style={{ marginBottom: 8 }}>
            <button type="button" onClick={addWasteRow} style={styles.secondaryBtn}>+ Add Waste Row</button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #000", padding: 6 }}>Type Of Waste</th>
                  <th style={{ border: "1px solid #000", padding: 6 }}>Schedule</th>
                  <th style={{ border: "1px solid #000", padding: 6 }}>Total Actual Waste Generation Quantity</th>
                  <th style={{ border: "1px solid #000", padding: 6 }}>Unit</th>
                  <th style={{ border: "1px solid #000", padding: 6 }}>Waste Generation Quantity As Per CCA</th>
                  <th style={{ border: "1px solid #000", padding: 6 }}>Unit</th>
                  <th style={{ border: "1px solid #000", padding: 6 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {wasteRows.map((w) => (
                  <tr key={w.id}>
                    <td style={{ border: "1px solid #000", padding: 6 }}><input value={w.type} onChange={(e) => updateWasteRow(w.id, "type", e.target.value)} style={styles.input} /></td>
                    <td style={{ border: "1px solid #000", padding: 6 }}><input value={w.schedule} onChange={(e) => updateWasteRow(w.id, "schedule", e.target.value)} style={styles.input} /></td>
                    <td style={{ border: "1px solid #000", padding: 6 }}><input value={w.totalQty} onChange={(e) => updateWasteRow(w.id, "totalQty", e.target.value)} style={styles.input} /></td>
                    <td style={{ border: "1px solid #000", padding: 6 }}>
                      <select value={w.unit} onChange={(e) => updateWasteRow(w.id, "unit", e.target.value)} style={styles.input}>{unitOptions.map((u) => <option key={u}>{u}</option>)}</select>
                    </td>
                    <td style={{ border: "1px solid #000", padding: 6 }}><input value={w.ccaQty} onChange={(e) => updateWasteRow(w.id, "ccaQty", e.target.value)} style={styles.input} /></td>
                    <td style={{ border: "1px solid #000", padding: 6 }}>
                      <select value={w.ccaUnit} onChange={(e) => updateWasteRow(w.id, "ccaUnit", e.target.value)} style={styles.input}>{unitOptions.map((u) => <option key={u}>{u}</option>)}</select>
                    </td>
                    <td style={{ border: "1px solid #000", padding: 6 }}><button type="button" onClick={() => removeWasteRow(w.id)} style={styles.dangerBtn}>Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={styles.sectionTitle}>Quantity Dispatched</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: 8 }}>
          <label>To Disposal Facility</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={dispatched.disposal} onChange={(e) => setDispatched({ ...dispatched, disposal: e.target.value })} style={styles.input} />
            <select value={dispatched.disposalUnit} onChange={(e) => setDispatched({ ...dispatched, disposalUnit: e.target.value })} style={styles.input}>{unitOptions.map((u) => <option key={u}>{u}</option>)}</select>
          </div>

          <label>To Recycler / Co-Processor</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={dispatched.recycler} onChange={(e) => setDispatched({ ...dispatched, recycler: e.target.value })} style={styles.input} />
            <select value={dispatched.recyclerUnit} onChange={(e) => setDispatched({ ...dispatched, recyclerUnit: e.target.value })} style={styles.input}>{unitOptions.map((u) => <option key={u}>{u}</option>)}</select>
          </div>

          <label>Others</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={dispatched.others} onChange={(e) => setDispatched({ ...dispatched, others: e.target.value })} style={styles.input} />
            <select value={dispatched.othersUnit} onChange={(e) => setDispatched({ ...dispatched, othersUnit: e.target.value })} style={styles.input}>{unitOptions.map((u) => <option key={u}>{u}</option>)}</select>
          </div>
        </div>

        <div style={styles.sectionTitle}>Quantity Utilized In-House</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input value={utilizedInHouse.qty} onChange={(e) => setUtilizedInHouse({ ...utilizedInHouse, qty: e.target.value })} style={styles.input} />
          <select value={utilizedInHouse.unit} onChange={(e) => setUtilizedInHouse({ ...utilizedInHouse, unit: e.target.value })} style={styles.input}>{unitOptions.map((u) => <option key={u}>{u}</option>)}</select>
        </div>

        <div style={styles.sectionTitle}>Quantity In Storage At End Of Year</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input value={inStorage.qty} onChange={(e) => setInStorage({ ...inStorage, qty: e.target.value })} style={styles.input} />
          <select value={inStorage.unit} onChange={(e) => setInStorage({ ...inStorage, unit: e.target.value })} style={styles.input}>{unitOptions.map((u) => <option key={u}>{u}</option>)}</select>
        </div>

        <div style={styles.sectionTitle}>PART B — Treatment, Storage and Disposal Facility Operators (7 rows)</div>
        <div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #000", padding: 6, width: 60 }}>Sr No</th>
                <th style={{ border: "1px solid #000", padding: 6 }}>Description</th>
                <th style={{ border: "1px solid #000", padding: 6, width: 160 }}>Quantity</th>
                <th style={{ border: "1px solid #000", padding: 6, width: 120 }}>Unit</th>
              </tr>
            </thead>
            <tbody>
              {partB.map((p: any, idx: number) => (
                <tr key={idx}>
                  <td style={{ border: "1px solid #000", padding: 6, textAlign: "center" }}>{idx + 1}</td>
                  <td style={{ border: "1px solid #000", padding: 6 }}>{p.label}</td>
                  <td style={{ border: "1px solid #000", padding: 6 }}><input value={p.qty} onChange={(e) => { const copy = [...partB]; copy[idx].qty = e.target.value; setPartB(copy); }} style={styles.input} /></td>
                  <td style={{ border: "1px solid #000", padding: 6 }}>
                    <select value={p.unit} onChange={(e) => { const copy = [...partB]; copy[idx].unit = e.target.value; setPartB(copy); }} style={styles.input}>{unitOptions.map((u) => <option key={u}>{u}</option>)}</select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.sectionTitle}>PART C — Recycler / Co-processor Details (8 rows)</div>
        <div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #000", padding: 6, width: 60 }}>Sr No</th>
                <th style={{ border: "1px solid #000", padding: 6 }}>Description</th>
                <th style={{ border: "1px solid #000", padding: 6, width: 160 }}>Quantity</th>
                <th style={{ border: "1px solid #000", padding: 6, width: 120 }}>Unit</th>
              </tr>
            </thead>
            <tbody>
              {partC.map((p: any, idx: number) => (
                <tr key={idx}>
                  <td style={{ border: "1px solid #000", padding: 6, textAlign: "center" }}>{idx + 1}</td>
                  <td style={{ border: "1px solid #000", padding: 6 }}>{p.label}</td>
                  <td style={{ border: "1px solid #000", padding: 6 }}><input value={p.qty} onChange={(e) => { const copy = [...partC]; copy[idx].qty = e.target.value; setPartC(copy); }} style={styles.input} /></td>
                  <td style={{ border: "1px solid #000", padding: 6 }}>
                    <select value={p.unit} onChange={(e) => { const copy = [...partC]; copy[idx].unit = e.target.value; setPartC(copy); }} style={styles.input}>{unitOptions.map((u) => <option key={u}>{u}</option>)}</select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      <div className="no-print" style={styles.buttonRow}>
        <button type="button" onClick={() => { setFormData(emptyForm); setEditingId(null); }} style={styles.secondaryBtn}>Reset Form</button>
        <button type="button" onClick={printPage} style={styles.secondaryBtn}>Export / Print</button>
        <button type="button" onClick={saveRecord} style={styles.primaryBtn}>{loading ? "Saving..." : editingId ? "Update Record" : "Save Record"}</button>
      </div>

      <div className="no-print saved-records" style={{ marginTop: 20 }}>
        <div className="no-print" style={{ marginBottom: 8 }}>
          <strong>Saved Records</strong>
        </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Financial Year</th>
                <th style={styles.th}>Facility Name</th>
                <th style={styles.th}>Authorized Person</th>
                <th style={styles.th}>Return Type</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td style={{ ...styles.td, textAlign: "center" }} colSpan={5}>No records found.</td>
                </tr>
              ) : (
                records.map((r) => (
                  <tr key={r.id}>
                    <td style={styles.td}>{r.financial_year || "-"}</td>
                    <td style={styles.td}>{r.facility_name || "-"}</td>
                    <td style={styles.td}>{r.authorized_person || "-"}</td>
                    <td style={styles.td}>{r.return_type || "-"}</td>
                    <td style={styles.td}>
                      <button onClick={() => editRecord(r)} style={styles.secondaryBtn}>Edit</button>
                      <button onClick={() => deleteRecord(r.id)} style={styles.dangerBtn}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div><div
  style={{
    marginTop: "60px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  }}
>
  <div>
    <div
      style={{
        width: "180px",
        height: "80px",
        border: "1px dashed #000",
        marginBottom: "10px",
      }}
    />
    <div>Company Stamp</div>
  </div>

  <div style={{ textAlign: "center" }}>
    <div
      style={{
        width: "250px",
        borderTop: "1px solid #000",
        marginBottom: "10px",
      }}
    />
    <div>Signature of Authorized Person</div>
  </div>
</div>
        
      </div>
  );
}