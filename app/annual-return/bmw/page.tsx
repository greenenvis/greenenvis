"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function BMWPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const emptyForm: any = {
    financial_year: "",

    gpcb_id: "",
    authorized_person_name: "",
    correspondence_address: "",
    contact_no: "",
    website_url: "",

    hcf_name: "",
    facility_address: "",
    email_id: "",
    gps_coordinates: "",
    ownership_type: "",

    bmw_authorization_no: "",
    authorization_valid_upto: "",
    consent_water_act: "",
    consent_air_act: "",
    waste_generation: [
       { color: "Yellow", qty: "" },
       { color: "Red", qty: "" },
       { color: "White", qty: "" },
       { color: "Blue", qty: "" },
    ],
    bmw_committee_exists: "",
    training_conducted: "",
    personnel_not_trained: "",
    personnel_trained: "",
    personnel_induction_trained: "",
    training_manual_available: "",
    accident_occurred: "",
    liquid_waste_standards: "",
    disinfection_log_standards: "",
    reporting_period: "",
    head_name_designation: "",
    place: "",
    remarks: "",
    other_information: "",
  };

  const [formData, setFormData] = useState<any>(emptyForm);
  const updateWasteQty = (index: number, value: string) => {
  const updated = [...formData.waste_generation];
  updated[index].qty = value;

  setFormData({
    ...formData,
    waste_generation: updated,
  });
};
const fetchRecords = async () => {
  const { data, error } = await supabase
    .from("annual_return_bmw")
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

  if (!formData.gpcb_id) {
    alert("Please Enter GPCB ID");
    return false;
  }

  if (!formData.authorized_person_name) {
    alert("Please Enter Authorized Person Name");
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
      .from("annual_return_bmw")
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
      .from("annual_return_bmw")
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
    .from("annual_return_bmw")
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

    <div style={{ padding: 20 }}>

      <h1>Biomedical Waste Annual Return (Form IV)</h1>
<div style={{ marginBottom: "20px" }}>
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
      padding: "5px",
      minWidth: "200px",
    }}
  >
    <option value="">Select Financial Year</option>
    <option value="2025-26">2025-26</option>
    <option value="2026-27">2026-27</option>
    <option value="2027-28">2027-28</option>
  </select>
</div>
      <h2>SECTION 1 Occupier Details</h2>

      <table
        border={1}
        cellPadding={8}
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <tbody>
          <tr>
            <td style={{ width: "30%" }}>GPCB ID</td>
            <td>
              <input
                type="text"
                value={formData.gpcb_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gpcb_id: e.target.value,
                  })
                }
                style={{ width: "100%" }}
              />
            </td>
          </tr>

          <tr>
            <td>Name of Authorised Person</td>
            <td>
              <input
                type="text"
                value={formData.authorized_person_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorized_person_name: e.target.value,
                  })
                }
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
  <td>Address for Correspondence</td>
  <td>
    <textarea
      value={formData.correspondence_address}
      onChange={(e) =>
        setFormData({
          ...formData,
          correspondence_address: e.target.value,
        })
      }
      style={{ width: "100%", minHeight: "60px" }}
    />
  </td>
</tr>

<tr>
  <td>Contact No.</td>
  <td>
    <input
      type="text"
      value={formData.contact_no}
      onChange={(e) =>
        setFormData({
          ...formData,
          contact_no: e.target.value,
        })
      }
      style={{ width: "100%" }}
    />
  </td>
</tr>

<tr>
  <td>Website URL</td>
  <td>
    <input
      type="text"
      value={formData.website_url}
      onChange={(e) =>
        setFormData({
          ...formData,
          website_url: e.target.value,
        })
      }
      style={{ width: "100%" }}
    />
  </td>
</tr>
<tr>
  <td>Name of Health Care Facility (HCF) / CBMWTF</td>
  <td>
    <input
      type="text"
      value={formData.hcf_name}
      onChange={(e) =>
        setFormData({
          ...formData,
          hcf_name: e.target.value,
        })
      }
      style={{ width: "100%" }}
    />
  </td>
</tr>

<tr>
  <td>Address of Facility</td>
  <td>
    <textarea
      value={formData.facility_address}
      onChange={(e) =>
        setFormData({
          ...formData,
          facility_address: e.target.value,
        })
      }
      style={{ width: "100%", minHeight: "60px" }}
    />
  </td>
</tr>

<tr>
  <td>Email Address</td>
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

<tr>
  <td>GPS Coordinates (Lat and Long)</td>
  <td>
    <input
      type="text"
      value={formData.gps_coordinates}
      onChange={(e) =>
        setFormData({
          ...formData,
          gps_coordinates: e.target.value,
        })
      }
      style={{ width: "100%" }}
    />
  </td>
</tr>

<tr>
  <td>Ownership Type</td>
  <td>
    <input
      type="text"
      value={formData.ownership_type}
      onChange={(e) =>
        setFormData({
          ...formData,
          ownership_type: e.target.value,
        })
      }
      style={{ width: "100%" }}
    />
  </td>
</tr>

<tr>
  <td>Authorization Number under BMW Rules</td>
  <td>
    <input
      type="text"
      value={formData.bmw_authorization_no}
      onChange={(e) =>
        setFormData({
          ...formData,
          bmw_authorization_no: e.target.value,
        })
      }
      style={{ width: "100%" }}
    />
  </td>
</tr>

<tr>
  <td>Authorization Valid Upto</td>
  <td>
    <input
      type="date"
      value={formData.authorization_valid_upto}
      onChange={(e) =>
        setFormData({
          ...formData,
          authorization_valid_upto: e.target.value,
        })
      }
      style={{ width: "100%" }}
    />
  </td>
</tr>

  <tr>
  <td>Consent under Water Act (Consent No.)</td>
  <td>
    <input
      type="text"
      value={formData.consent_water_act}
      onChange={(e) =>
        setFormData({
          ...formData,
          consent_water_act: e.target.value,
        })
      }
      style={{ width: "100%" }}
    />
  </td>
</tr>

<tr>
  <td>Consent under Air Act (Consent No.)</td>
  <td>
    <input
      type="text"
      value={formData.consent_air_act}
      onChange={(e) =>
        setFormData({
          ...formData,
          consent_air_act: e.target.value,
        })
      }
      style={{ width: "100%" }}
    />
  </td>
</tr>
        </tbody>
      </table>
      <h2 style={{ marginTop: "30px" }}>SECTION 2 Type of Facility</h2>

<table
  border={1}
  cellPadding={8}
  style={{ width: "100%", borderCollapse: "collapse" }}
>
  <tbody>
    <tr>
      <td style={{ width: "10%" }}>1</td>
      <td style={{ width: "40%" }}>
        Specialization of Health Care Facility
      </td>
      <td>
        <input
          type="text"
          value={formData.specialization}
          onChange={(e) =>
            setFormData({
              ...formData,
              specialization: e.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </td>
    </tr>

    <tr>
      <td>2</td>
      <td>Type of Health Care Facility and No of Beds</td>
      <td>
        <input
          type="text"
          value={formData.facility_type_beds}
          onChange={(e) =>
            setFormData({
              ...formData,
              facility_type_beds: e.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </td>
    </tr>

    <tr>
      <td>3</td>
      <td>License Number With Health Department</td>
      <td>
        <input
          type="text"
          value={formData.health_license_no}
          onChange={(e) =>
            setFormData({
              ...formData,
              health_license_no: e.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </td>
    </tr>

    <tr>
      <td>4</td>
      <td>License Expiry Date</td>
      <td>
        <input
          type="date"
          value={formData.license_expiry_date}
          onChange={(e) =>
            setFormData({
              ...formData,
              license_expiry_date: e.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </td>
    </tr>
  </tbody>
</table>
<h2 style={{ marginTop: "30px" }}>
  SECTION 4 Waste Generation and Disposal
</h2>

<table
  border={1}
  cellPadding={8}
  style={{ width: "100%", borderCollapse: "collapse" }}
>
  <thead>
    <tr>
      <th>Sr No</th>
      <th>Type of Waste</th>
      <th>Quantity (Kg per annum)</th>
    </tr>
  </thead>

  <tbody>
    {formData.waste_generation.map((row: any, index: number) => (
      <tr key={index}>
        <td>{["i", "ii", "iii", "iv"][index]}</td>

        <td>{row.color}</td>

        <td>
          <input
            type="number"
            value={row.qty}
            onChange={(e) =>
              updateWasteQty(index, e.target.value)
            }
            style={{ width: "100%" }}
          />
        </td>
      </tr>
    ))}
  </tbody>
</table>
<h2 style={{ marginTop: "30px" }}>
  SECTION 5 TSDF
</h2>

<table
  border={1}
  cellPadding={8}
  style={{ width: "100%", borderCollapse: "collapse" }}
>
  <tbody>
    <tr>
      <td style={{ width: "10%" }}>1</td>
      <td>On-site Storage Facility Size (area sqm)</td>
      <td>
        <input
          type="text"
          value={formData.tsdf_area_size}
          onChange={(e) =>
            setFormData({
              ...formData,
              tsdf_area_size: e.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </td>
    </tr>

    <tr>
      <td>2</td>
      <td>On-site Storage Capacity (in kg)</td>
      <td>
        <input
          type="text"
          value={formData.tsdf_storage_capacity}
          onChange={(e) =>
            setFormData({
              ...formData,
              tsdf_storage_capacity: e.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </td>
    </tr>

    <tr>
      <td>3</td>
      <td>Provision Type</td>
      <td>
        <input
          type="text"
          value={formData.tsdf_provision_type}
          onChange={(e) =>
            setFormData({
              ...formData,
              tsdf_provision_type: e.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </td>
    </tr>

    <tr>
      <td>4</td>
      <td>CBMWTF Operator Name</td>
      <td>
        <input
          type="text"
          value={formData.cbmwtf_operator_name}
          onChange={(e) =>
            setFormData({
              ...formData,
              cbmwtf_operator_name: e.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </td>
    </tr>

    <tr>
      <td>5</td>
      <td>Treatment / Disposal Facility Details</td>
      <td>
        <textarea
          value={formData.treatment_disposal_details}
          onChange={(e) =>
            setFormData({
              ...formData,
              treatment_disposal_details: e.target.value,
            })
          }
          style={{ width: "100%", minHeight: "60px" }}
        />
      </td>
    </tr>
  </tbody>
</table>
<h2 style={{ marginTop: "30px" }}>
  SECTION 6 Bio Medical Waste Management Committee
</h2>

<table
  border={1}
  cellPadding={8}
  style={{ width: "100%", borderCollapse: "collapse" }}
>
  <tbody>
    <tr>
      <td style={{ width: "10%" }}>1</td>
      <td>BMW Management Committee Exists?</td>

      <td>
        <label>
          <input
            type="radio"
            name="bmw_committee_exists"
            value="Yes"
            checked={formData.bmw_committee_exists === "Yes"}
            onChange={(e) =>
              setFormData({
                ...formData,
                bmw_committee_exists: e.target.value,
              })
            }
          />
          Yes
        </label>

        &nbsp;&nbsp;&nbsp;&nbsp;

        <label>
          <input
            type="radio"
            name="bmw_committee_exists"
            value="No"
            checked={formData.bmw_committee_exists === "No"}
            onChange={(e) =>
              setFormData({
                ...formData,
                bmw_committee_exists: e.target.value,
              })
            }
          />
          No
        </label>
      </td>
    </tr>
  </tbody>
</table>
<h2 style={{ marginTop: "30px" }}>
  SECTION 7 Training Details
</h2>

<table
  border={1}
  cellPadding={8}
  style={{ width: "100%", borderCollapse: "collapse" }}
>
  <tbody>

    <tr>
      <td style={{ width: "10%" }}>1</td>
      <td>No. of Trainings Conducted</td>
      <td>
        <input
          type="number"
          value={formData.training_conducted}
          onChange={(e) =>
            setFormData({
              ...formData,
              training_conducted: e.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </td>
    </tr>

    <tr>
      <td>2</td>
      <td>No. of Personnel Not Trained</td>
      <td>
        <input
          type="number"
          value={formData.personnel_not_trained}
          onChange={(e) =>
            setFormData({
              ...formData,
              personnel_not_trained: e.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </td>
    </tr>

    <tr>
      <td>3</td>
      <td>No. of Personnel Trained</td>
      <td>
        <input
          type="number"
          value={formData.personnel_trained}
          onChange={(e) =>
            setFormData({
              ...formData,
              personnel_trained: e.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </td>
    </tr>

    <tr>
      <td>4</td>
      <td>No. of Personnel Trained at Induction</td>
      <td>
        <input
          type="number"
          value={formData.personnel_induction_trained}
          onChange={(e) =>
            setFormData({
              ...formData,
              personnel_induction_trained: e.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </td>
    </tr>

    <tr>
      <td>5</td>
      <td>Training Manual Available</td>
      <td>

        <label>
          <input
            type="radio"
            name="training_manual_available"
            value="Yes"
            checked={formData.training_manual_available === "Yes"}
            onChange={(e) =>
              setFormData({
                ...formData,
                training_manual_available: e.target.value,
              })
            }
          />
          Yes
        </label>

        &nbsp;&nbsp;&nbsp;&nbsp;

        <label>
          <input
            type="radio"
            name="training_manual_available"
            value="No"
            checked={formData.training_manual_available === "No"}
            onChange={(e) =>
              setFormData({
                ...formData,
                training_manual_available: e.target.value,
              })
            }
          />
          No
        </label>

      </td>
    </tr>

  </tbody>
</table>
<h2 style={{ marginTop: "30px" }}>
  SECTION 8 Accidents
</h2>

<table
  border={1}
  cellPadding={8}
  style={{ width: "100%", borderCollapse: "collapse" }}
>
  <tbody>
    <tr>
      <td style={{ width: "10%" }}>1</td>
      <td>
        Confirm whether any accident occurred during the reporting period
      </td>

      <td>
        <label>
          <input
            type="radio"
            name="accident_occurred"
            value="Yes"
            checked={formData.accident_occurred === "Yes"}
            onChange={(e) =>
              setFormData({
                ...formData,
                accident_occurred: e.target.value,
              })
            }
          />
          Yes
        </label>

        &nbsp;&nbsp;&nbsp;&nbsp;

        <label>
          <input
            type="radio"
            name="accident_occurred"
            value="No"
            checked={formData.accident_occurred === "No"}
            onChange={(e) =>
              setFormData({
                ...formData,
                accident_occurred: e.target.value,
              })
            }
          />
          No
        </label>
      </td>
    </tr>
  </tbody>
</table>
<h2 style={{ marginTop: "30px" }}>
  SECTION 9 Standards Compliance
</h2>

<table
  border={1}
  cellPadding={8}
  style={{ width: "100%", borderCollapse: "collapse" }}
>
  <tbody>

    <tr>
      <td style={{ width: "10%" }}>1</td>
      <td>Liquid Waste Standards Meet</td>
      <td>
        <label>
          <input
            type="radio"
            name="liquid_waste_standards"
            value="Yes"
            checked={formData.liquid_waste_standards === "Yes"}
            onChange={(e) =>
              setFormData({
                ...formData,
                liquid_waste_standards: e.target.value,
              })
            }
          />
          Yes
        </label>

        &nbsp;&nbsp;&nbsp;&nbsp;

        <label>
          <input
            type="radio"
            name="liquid_waste_standards"
            value="No"
            checked={formData.liquid_waste_standards === "No"}
            onChange={(e) =>
              setFormData({
                ...formData,
                liquid_waste_standards: e.target.value,
              })
            }
          />
          No
        </label>
      </td>
    </tr>

    <tr>
      <td>2</td>
      <td>Disinfection Log Standards Meet</td>
      <td>
        <label>
          <input
            type="radio"
            name="disinfection_log_standards"
            value="Yes"
            checked={formData.disinfection_log_standards === "Yes"}
            onChange={(e) =>
              setFormData({
                ...formData,
                disinfection_log_standards: e.target.value,
              })
            }
          />
          Yes
        </label>

        &nbsp;&nbsp;&nbsp;&nbsp;

        <label>
          <input
            type="radio"
            name="disinfection_log_standards"
            value="No"
            checked={formData.disinfection_log_standards === "No"}
            onChange={(e) =>
              setFormData({
                ...formData,
                disinfection_log_standards: e.target.value,
              })
            }
          />
          No
        </label>
      </td>
    </tr>

    <tr>
      <td>3</td>
      <td>Reporting Period</td>
      <td>
        <input
          type="text"
          value={formData.reporting_period}
          onChange={(e) =>
            setFormData({
              ...formData,
              reporting_period: e.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </td>
    </tr>

    <tr>
      <td>4</td>
      <td>Name & Designation of Head</td>
      <td>
        <input
          type="text"
          value={formData.head_name_designation}
          onChange={(e) =>
            setFormData({
              ...formData,
              head_name_designation: e.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </td>
    </tr>

    <tr>
      <td>5</td>
      <td>Place</td>
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
      <td>6</td>
      <td>Remarks</td>
      <td>
        <textarea
          value={formData.remarks}
          onChange={(e) =>
            setFormData({
              ...formData,
              remarks: e.target.value,
            })
          }
          style={{ width: "100%", minHeight: "60px" }}
        />
      </td>
    </tr>

    <tr>
      <td>7</td>
      <td>Other Relevant Information</td>
      <td>
        <textarea
          value={formData.other_information}
          onChange={(e) =>
            setFormData({
              ...formData,
              other_information: e.target.value,
            })
          }
          style={{ width: "100%", minHeight: "60px" }}
        />
      </td>
    </tr>

  </tbody>
</table>
<div
  className="no-print"
  style={{ marginTop: "30px", display: "flex", gap: "10px" }}
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
    Save Record
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
<div className="no-print"></div>
<hr style={{ margin: "30px 0" }} />

<h2 className="no-print">Saved Records</h2>

<table
  border={1}
  cellPadding={8}
  style={{ width: "100%", borderCollapse: "collapse" }}
>
  <thead>
    <tr>
      <th className="no-print"> Financial Year</th>
      <th className="no-print"> GPCB ID</th>
      <th className="no-print"> Authorized Person</th>
      <th className="no-print"> Edit</th>
      <th className="no-print">Delete</th>
    </tr>
  </thead>

  <tbody>
    {records.map((rec: any) => (
      <tr key={rec.id}>
        <td className="no-print"> {rec.financial_year}</td>
        <td className="no-print"> {rec.gpcb_id}</td>
        <td className="no-print"> {rec.authorized_person_name}</td>

        <td>
          <button onClick={() => editRecord(rec)} className="no-print">
            Edit
          </button>
        </td>

        <td>
          <button onClick={() => deleteRecord(rec.id)} className="no-print">
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

 </div>
  </>
);
}