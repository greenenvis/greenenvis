"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function EWastePage() {
  const emptyForm: any = {
    financial_year: "",

    unit_name: "",
    unit_address: "",

    authorized_person: "",
    contact_details: "",
    email_id: "",

    category_type: "",

    destination_details: "",

    material_recovered: "",

    place: "",
    return_date: "",
  };

  const [formData, setFormData] = useState<any>(emptyForm);
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
const fetchRecords = async () => {
  const { data, error } = await supabase
    .from("annual_return_ewaste")
    .select("*")
    .order("created_at", { ascending: false });

  if (!error) {
    setRecords(data || []);
  }
};

useEffect(() => {
  fetchRecords();
}, []);

const validateForm = () => {
  if (!formData.financial_year) {
    alert("Please Select Financial Year");
    return false;
  }

  if (!formData.unit_name) {
    alert("Please Enter Unit Name");
    return false;
  }

  if (!formData.authorized_person) {
    alert("Please Enter Authorised Person Name");
    return false;
  }

  return true;
};
const saveRecord = async () => {
  if (!validateForm()) return;

  setLoading(true);

  const payload = {
    ...formData,
  };
  
  if (editingId) {
    const { error } = await supabase
      .from("annual_return_ewaste")
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
    const { error } = await supabase
      .from("annual_return_ewaste")
      .insert([payload]);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    alert("Record Saved Successfully");
  }

  setLoading(false);
  fetchRecords();
  setFormData(emptyForm);
};
const editRecord = (rec: any) => {
  setEditingId(rec.id);
  setFormData({ ...rec });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const deleteRecord = async (id: string) => {
  if (!confirm("Delete this record?")) return;

  const { error } = await supabase
    .from("annual_return_ewaste")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Record Deleted Successfully");
  fetchRecords();
};

  return (
  <>
    <style jsx global>{`
      @media print {
        .no-print {
          display: none !important;
        }
      }
    `}</style>

    <div style={{ padding: "20px" }}>

      <h1>E-Waste Annual Return (Form-3)</h1>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
  <label>
    <strong>Financial Year : </strong>
  </label>

  <select
    value={formData.financial_year}
    onChange={(e) =>
      setFormData({
        ...formData,
        financial_year: e.target.value,
      })
    }
    style={{
      marginLeft: "10px",
      padding: "6px",
      minWidth: "220px",
    }}
  >
    <option value="">Select Financial Year</option>
    <option value="2025-26">2025-26</option>
    <option value="2026-27">2026-27</option>
    <option value="2027-28">2027-28</option>
  </select>
</div>
<h2>SECTION 1 - Unit Details</h2>

<table
  border={1}
  cellPadding={8}
  style={{ width: "100%", borderCollapse: "collapse" }}
>
  <tbody>

    <tr>
      <td style={{ width: "30%" }}>
        Name of Producer / Manufacturer / Refurbisher / Dismantler / Recycler
      </td>

      <td>
        <input
          type="text"
          value={formData.unit_name}
          onChange={(e) =>
            setFormData({
              ...formData,
              unit_name: e.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </td>
    </tr>

    <tr>
      <td>Complete Address</td>

      <td>
        <textarea
          value={formData.unit_address}
          onChange={(e) =>
            setFormData({
              ...formData,
              unit_address: e.target.value,
            })
          }
          style={{
            width: "100%",
            minHeight: "70px",
          }}
        />
      </td>
    </tr>

  </tbody>
</table>
<h2 style={{ marginTop: "30px" }}>
  SECTION 2 - Authorised Person Details
</h2>

<table
  border={1}
  cellPadding={8}
  style={{ width: "100%", borderCollapse: "collapse" }}
>
  <tbody>

    <tr>
      <td style={{ width: "30%" }}>
        Name of Authorised Person
      </td>

      <td>
        <input
          type="text"
          value={formData.authorized_person}
          onChange={(e) =>
            setFormData({
              ...formData,
              authorized_person: e.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </td>
    </tr>

    <tr>
      <td>
        Contact No.
      </td>

      <td>
        <input
          type="text"
          value={formData.contact_details}
          onChange={(e) =>
            setFormData({
              ...formData,
              contact_details: e.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </td>
    </tr>

    <tr>
      <td>
        E-mail ID
      </td>

      <td>
        <input
          type="email"
          value={formData.email_id}
          onChange={(e) =>
            setFormData({
              ...formData,
              email_id: e.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </td>
    </tr>

  </tbody>
</table>
<h2 style={{ marginTop: "30px" }}>
  SECTION 3 - Category
</h2>

<table
  border={1}
  cellPadding={8}
  style={{ width: "100%", borderCollapse: "collapse" }}
>
  <tbody>

    <tr>
      <td style={{ width: "30%" }}>
        Select Category
      </td>

      <td>
        <select
          value={formData.category_type}
          onChange={(e) =>
            setFormData({
              ...formData,
              category_type: e.target.value,
            })
          }
          style={{ width: "100%", padding: "6px" }}
        >
          <option value="">Select Category</option>
          <option value="Producer">Producer</option>
          <option value="Manufacturer">Manufacturer</option>
          <option value="Refurbisher">Refurbisher</option>
          <option value="Dismantler">Dismantler</option>
          <option value="Recycler">Recycler</option>
          <option value="Bulk Consumer">Bulk Consumer</option>
        </select>
      </td>
    </tr>

  </tbody>
</table>

<h2 style={{ marginTop: "30px" }}>
SECTION 4 - E-Waste Details
</h2>

<table
  border={1}
  cellPadding={8}
  style={{
    width: "100%",
    borderCollapse: "collapse",
  }}
>
  <thead>
    <tr>
      <th style={{ width: "10%" }}>Sr.</th>
      <th>Description</th>
      <th style={{ width: "25%" }}>Quantity / Details</th>
    </tr>
  </thead>

  <tbody>

    <tr>
      <td>3(A)</td>
      <td>Bulk Consumers - Quantity of E-Waste</td>
      <td>
        <input type="text" style={{ width: "100%" }} />
      </td>
    </tr>

    <tr>
      <td>3(B)</td>
      <td>Refurbishers - Quantity of E-Waste</td>
      <td>
        <input type="text" style={{ width: "100%" }} />
      </td>
    </tr>

    <tr>
      <td rowSpan={4}>3(C)</td>
      <td>i. Quantity of E-Waste Processed (Code Wise)</td>
      <td>
        <input type="text" style={{ width: "100%" }} />
      </td>
    </tr>

    <tr>
      <td>ii. Details of Materials / Components Recovered & Sold</td>
      <td>
        <textarea
          style={{
            width: "100%",
            minHeight: "60px",
          }}
        />
      </td>
    </tr>

    <tr>
      <td>iii. Quantity of E-Waste Sent to Recycler</td>
      <td>
        <input type="text" style={{ width: "100%" }} />
      </td>
    </tr>

    <tr>
      <td>iv. Residual Quantity Sent to TSDF</td>
      <td>
        <input type="text" style={{ width: "100%" }} />
      </td>
    </tr>

    <tr>
      <td rowSpan={3}>3(D)</td>
      <td>i. Quantity of E-Waste Processed (Code Wise)</td>
      <td>
        <input type="text" style={{ width: "100%" }} />
      </td>
    </tr>

    <tr>
      <td>ii. Details of Materials Recovered & Sold</td>
      <td>
        <textarea
          style={{
            width: "100%",
            minHeight: "60px",
          }}
        />
      </td>
    </tr>

    <tr>
      <td>iii. Residual Quantity Sent to TSDF</td>
      <td>
        <input type="text" style={{ width: "100%" }} />
      </td>
    </tr>

  </tbody>

</table>
<h2 style={{ marginTop: "30px" }}>
  SECTION 5 - Destination Details
</h2>

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
        Name & Full Address of Destination
      </td>

      <td>
        <textarea
          value={formData.destination_details}
          onChange={(e) =>
            setFormData({
              ...formData,
              destination_details: e.target.value,
            })
          }
          style={{
            width: "100%",
            minHeight: "80px",
          }}
        />
      </td>
    </tr>

  </tbody>
</table>
<h2 style={{ marginTop: "30px" }}>
  SECTION 6 - Material Recovered / Segregated
</h2>

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
        Type & Quantity of Materials Segregated / Recovered
      </td>

      <td>
        <textarea
          value={formData.material_recovered}
          onChange={(e) =>
            setFormData({
              ...formData,
              material_recovered: e.target.value,
            })
          }
          style={{
            width: "100%",
            minHeight: "100px",
          }}
        />
      </td>
    </tr>

  </tbody>
</table>
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
        <td style={{ width: "30%" }}>Place</td>

        <td>
          <input
            type="text"
            value={formData.place}
            onChange={(e) =>
              setFormData({
                ...formData,
                place: e.target.value,
              })
            }
            style={{ width: "100%" }}
          />
        </td>
      </tr>

      <tr>
        <td>Date</td>

        <td>
          <input
            type="date"
            value={formData.return_date}
            onChange={(e) =>
              setFormData({
                ...formData,
                return_date: e.target.value,
              })
            }
            style={{ width: "100%" }}
          />
        </td>
      </tr>

      <tr>
        <td>Signature of Authorised Person</td>

        <td>
          <input
            type="text"
            value={formData.authorized_person}
            readOnly
            style={{
              width: "80%",
              background: "#f5f5f5",
            }}
          />
        </td>
      </tr>

    </tbody>
  </table>

</div>
<div
  className="no-print"
  style={{
    marginTop: "30px",
    display: "flex",
    gap: "10px",
  }}
>
  <button
    onClick={saveRecord}
    disabled={loading}
    style={{
      padding: "10px 20px",
      backgroundColor: "#198754",
      color: "white",
      border: "none",
      cursor: "pointer",
    }}
  >
    {editingId ? "Update Record" : "Save Record"}
  </button>

  <button
    onClick={() => window.print()}
    style={{
      padding: "10px 20px",
      backgroundColor: "#0d6efd",
      color: "white",
      border: "none",
      cursor: "pointer",
    }}
  >
    Export / Print PDF
  </button>
</div>
<div className="no-print">

  <hr style={{ margin: "30px 0" }} />

  <h2>Saved Records</h2>

  <table
    border={1}
    cellPadding={8}
    style={{
      width: "100%",
      borderCollapse: "collapse",
    }}
  >
    <thead>
      <tr>
        <th>Financial Year</th>
        <th>Unit Name</th>
        <th>Authorised Person</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>

    <tbody>

      {records.map((rec: any) => (

        <tr key={rec.id}>

          <td>{rec.financial_year}</td>

          <td>{rec.unit_name}</td>

          <td>{rec.authorized_person}</td>

          <td>
            <button
              onClick={() => editRecord(rec)}
            >
              Edit
            </button>
          </td>

          <td>
            <button
              onClick={() => deleteRecord(rec.id)}
            >
              Delete
            </button>
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

    </div>
  </>
);
}