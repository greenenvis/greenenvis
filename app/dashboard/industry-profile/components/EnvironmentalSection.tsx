export default function EnvironmentalSection({
  profile,
  setProfile,
  isEditing,
  chemicalForm,
setChemicalForm,
editingChemicalId,
setEditingChemicalId,
addChemical,
editChemical,
deleteChemical,
}: any) {

  const approvals = [
    ["Environmental Clearance (EC)", "environmental_clearance"],
    ["Consent to Establish (CTE)", "cte"],
    ["Consent to Operate (CCA)", "cca"],
    ["CGWA NOC", "cgwa_noc"],
    ["Factory License", "factory_license"],
    ["Fire NOC", "fire_noc"],
    ["PESO License", "peso"],
    ["MSIHC Applicable", "msihc"],
    ["Explosive License", "explosive_license"],
  ];

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "25px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "25px",
          color: "#166534",
        }}
      >
        🌍 Environmental Compliance
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <tbody>

          <tr>
            <td
              style={{
                width: "260px",
                padding: "12px",
                fontWeight: "bold",
                verticalAlign: "top",
              }}
            >
              Applicable Approvals
            </td>

            <td style={{ padding: "12px" }}>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2,300px)",
                  gap: "12px",
                }}
              >

                {approvals.map(([label, key]) => (

                  <label key={key}>

                    <input
                      type="checkbox"
                      disabled={!isEditing}
                      checked={profile[key]}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          [key]: e.target.checked,
                        })
                      }
                    />

                    {" "}

                    {label}

                  </label>

                ))}

              </div>

            </td>
          </tr>
{/* ============================
   CTE Details
============================ */}

{profile.cte && (

<tr>

<td
style={{
padding:"12px",
fontWeight:"bold",
verticalAlign:"top",
}}
>

CTE Details

</td>

<td style={{padding:"12px"}}>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,240px)",
gap:"18px",
}}
>

<div>
<label style={{display:"block",marginBottom:"5px",fontWeight:"bold"}}>
CTE Number
</label>

<input
type="text"
disabled={!isEditing}
value={profile.cte_no}
placeholder="Enter CTE Number"
onChange={(e)=>
setProfile({
...profile,
cte_no:e.target.value,
})
}
style={{width:"100%",padding:"10px"}}
/>
</div>

<div>
<label style={{display:"block",marginBottom:"5px",fontWeight:"bold"}}>
Issue Date
</label>

<input
type="date"
disabled={!isEditing}
value={profile.cte_issue_date}
onChange={(e)=>
setProfile({
...profile,
cte_issue_date:e.target.value,
})
}
style={{width:"100%",padding:"10px"}}
/>
</div>

<div>
<label style={{display:"block",marginBottom:"5px",fontWeight:"bold"}}>
Valid Upto
</label>

<input
type="date"
disabled={!isEditing}
value={profile.cte_valid_upto}
onChange={(e)=>
setProfile({
...profile,
cte_valid_upto:e.target.value,
})
}
style={{width:"100%",padding:"10px"}}
/>
</div>

</div>

</td>

</tr>

)}

{/* ============================
   CCA Details
============================ */}

{profile.cca && (

<tr>

<td
style={{
padding:"12px",
fontWeight:"bold",
verticalAlign:"top",
}}
>

CCA Details

</td>

<td style={{padding:"12px"}}>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,240px)",
gap:"18px",
}}
>

<div>
<label style={{display:"block",marginBottom:"5px",fontWeight:"bold"}}>
CCA Number
</label>

<input
type="text"
disabled={!isEditing}
value={profile.cca_no}
placeholder="Enter CCA Number"
onChange={(e)=>
setProfile({
...profile,
cca_no:e.target.value,
})
}
style={{width:"100%",padding:"10px"}}
/>
</div>

<div>
<label style={{display:"block",marginBottom:"5px",fontWeight:"bold"}}>
Issue Date
</label>

<input
type="date"
disabled={!isEditing}
value={profile.cca_issue_date}
onChange={(e)=>
setProfile({
...profile,
cca_issue_date:e.target.value,
})
}
style={{width:"100%",padding:"10px"}}
/>
</div>

<div>
<label style={{display:"block",marginBottom:"5px",fontWeight:"bold"}}>
Valid Upto
</label>

<input
type="date"
disabled={!isEditing}
value={profile.cca_valid_upto}
onChange={(e)=>
setProfile({
...profile,
cca_valid_upto:e.target.value,
})
}
style={{width:"100%",padding:"10px"}}
/>
</div>

</div>

</td>

</tr>

)}

{/* ============================
   Environmental Clearance
============================ */}

{profile.environmental_clearance && (

<tr>

<td
style={{
padding:"12px",
fontWeight:"bold",
verticalAlign:"top",
}}
>

Environmental Clearance

</td>

<td style={{padding:"12px"}}>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,240px)",
gap:"18px",
}}

>

<div>

<label
style={{
display:"block",
marginBottom:"5px",
fontWeight:"bold",
}}
>
EC Number
</label>

<input
type="text"
disabled={!isEditing}
value={profile.ec_no}
onChange={(e)=>
setProfile({
...profile,
ec_no:e.target.value,
})
}
placeholder="Enter EC Number"
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label
style={{
display:"block",
marginBottom:"5px",
fontWeight:"bold",
}}
>
Issue Date
</label>

<input
type="date"
disabled={!isEditing}
value={profile.ec_issue_date}
onChange={(e)=>
setProfile({
...profile,
ec_issue_date:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label
style={{
display:"block",
marginBottom:"5px",
fontWeight:"bold",
}}
>
Valid Upto
</label>

<input
type="date"
disabled={!isEditing}
value={profile.ec_valid_upto}
onChange={(e)=>
setProfile({
...profile,
ec_valid_upto:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label
style={{
display:"block",
marginBottom:"5px",
fontWeight:"bold",
}}
>
Issuing Authority
</label>

<select
disabled={!isEditing}
value={profile.ec_authority}
onChange={(e)=>
setProfile({
...profile,
ec_authority:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
>

<option value="">Select</option>
<option>MoEFCC</option>
<option>SEIAA</option>

</select>

</div>

<div>

<label
style={{
display:"block",
marginBottom:"5px",
fontWeight:"bold",
}}
>
EC Category
</label>

<select
disabled={!isEditing}
value={profile.ec_category}
onChange={(e)=>
setProfile({
...profile,
ec_category:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
>

<option value="">Select</option>

<option>A</option>
<option>B1</option>
<option>B2</option>

</select>

</div>

</div>

</td>

</tr>

)}
{/* ============================
   CGWA Details
============================ */}

{profile.cgwa_noc && (

<tr>

<td
style={{
padding:"12px",
fontWeight:"bold",
verticalAlign:"top",
}}
>

CGWA NOC Details

</td>

<td style={{padding:"12px"}}>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,240px)",
gap:"18px",
}}
>

<div>

<label
style={{
display:"block",
marginBottom:"5px",
fontWeight:"bold",
}}
>
CGWA NOC Number
</label>

<input
type="text"
disabled={!isEditing}
value={profile.cgwa_noc_no}
placeholder="Enter CGWA NOC Number"
onChange={(e)=>
setProfile({
...profile,
cgwa_noc_no:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label
style={{
display:"block",
marginBottom:"5px",
fontWeight:"bold",
}}
>
Issue Date
</label>

<input
type="date"
disabled={!isEditing}
value={profile.cgwa_issue_date}
onChange={(e)=>
setProfile({
...profile,
cgwa_issue_date:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label
style={{
display:"block",
marginBottom:"5px",
fontWeight:"bold",
}}
>
Valid Upto
</label>

<input
type="date"
disabled={!isEditing}
value={profile.cgwa_valid_upto}
onChange={(e)=>
setProfile({
...profile,
cgwa_valid_upto:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label
style={{
display:"block",
marginBottom:"5px",
fontWeight:"bold",
}}
>
Permitted Quantity (KLD)
</label>

<input
type="number"
disabled={!isEditing}
value={profile.cgwa_permitted_quantity}
placeholder="0.000"
onChange={(e)=>
setProfile({
...profile,
cgwa_permitted_quantity:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label
style={{
display:"block",
marginBottom:"5px",
fontWeight:"bold",
}}
>
Annual Quantity (m³/year)
</label>

<input
type="number"
disabled={!isEditing}
value={profile.cgwa_annual_quantity}
placeholder="0.000"
onChange={(e)=>
setProfile({
...profile,
cgwa_annual_quantity:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

</div>

</td>

</tr>

)}
{/* ============================
   Factory License
============================ */}

{profile.factory_license && (

<tr>

<td
style={{
padding:"12px",
fontWeight:"bold",
verticalAlign:"top",
}}
>

Factory License

</td>

<td style={{padding:"12px"}}>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,240px)",
gap:"18px",
}}
>

<div>
<label style={{display:"block",marginBottom:"5px",fontWeight:"bold"}}>
License Number
</label>

<input
type="text"
disabled={!isEditing}
value={profile.factory_license_no}
placeholder="Enter Factory License Number"
onChange={(e)=>
setProfile({
...profile,
factory_license_no:e.target.value,
})
}
style={{width:"100%",padding:"10px"}}
/>
</div>

<div>
<label style={{display:"block",marginBottom:"5px",fontWeight:"bold"}}>
Issue Date
</label>

<input
type="date"
disabled={!isEditing}
value={profile.factory_license_issue_date}
onChange={(e)=>
setProfile({
...profile,
factory_license_issue_date:e.target.value,
})
}
style={{width:"100%",padding:"10px"}}
/>
</div>

<div>
<label style={{display:"block",marginBottom:"5px",fontWeight:"bold"}}>
Valid Upto
</label>

<input
type="date"
disabled={!isEditing}
value={profile.factory_license_valid_upto}
onChange={(e)=>
setProfile({
...profile,
factory_license_valid_upto:e.target.value,
})
}
style={{width:"100%",padding:"10px"}}
/>
</div>

</div>

</td>

</tr>

)}

{/* ============================
   Fire NOC
============================ */}

{profile.fire_noc && (

<tr>

<td
style={{
padding:"12px",
fontWeight:"bold",
verticalAlign:"top",
}}
>

Fire NOC

</td>

<td style={{padding:"12px"}}>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,240px)",
gap:"18px",
}}
>

<div>
<label style={{display:"block",marginBottom:"5px",fontWeight:"bold"}}>
Fire NOC Number
</label>

<input
type="text"
disabled={!isEditing}
value={profile.fire_noc_no}
placeholder="Enter Fire NOC Number"
onChange={(e)=>
setProfile({
...profile,
fire_noc_no:e.target.value,
})
}
style={{width:"100%",padding:"10px"}}
/>
</div>

<div>
<label style={{display:"block",marginBottom:"5px",fontWeight:"bold"}}>
Issue Date
</label>

<input
type="date"
disabled={!isEditing}
value={profile.fire_noc_issue_date}
onChange={(e)=>
setProfile({
...profile,
fire_noc_issue_date:e.target.value,
})
}
style={{width:"100%",padding:"10px"}}
/>
</div>

<div>
<label style={{display:"block",marginBottom:"5px",fontWeight:"bold"}}>
Valid Upto
</label>

<input
type="date"
disabled={!isEditing}
value={profile.fire_noc_valid_upto}
onChange={(e)=>
setProfile({
...profile,
fire_noc_valid_upto:e.target.value,
})
}
style={{width:"100%",padding:"10px"}}
/>
</div>

</div>

</td>

</tr>

)}

{/* ============================
   PESO License
============================ */}

{profile.peso && (

<tr>

<td
style={{
padding:"12px",
fontWeight:"bold",
verticalAlign:"top",
}}
>

PESO License

</td>

<td style={{padding:"12px"}}>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,240px)",
gap:"18px",
}}
>

<div>
<label style={{display:"block",marginBottom:"5px",fontWeight:"bold"}}>
PESO License Number
</label>

<input
type="text"
disabled={!isEditing}
value={profile.peso_license_no}
placeholder="Enter PESO License Number"
onChange={(e)=>
setProfile({
...profile,
peso_license_no:e.target.value,
})
}
style={{width:"100%",padding:"10px"}}
/>
</div>

<div>
<label style={{display:"block",marginBottom:"5px",fontWeight:"bold"}}>
Issue Date
</label>

<input
type="date"
disabled={!isEditing}
value={profile.peso_issue_date}
onChange={(e)=>
setProfile({
...profile,
peso_issue_date:e.target.value,
})
}
style={{width:"100%",padding:"10px"}}
/>
</div>

<div>
<label style={{display:"block",marginBottom:"5px",fontWeight:"bold"}}>
Valid Upto
</label>

<input
type="date"
disabled={!isEditing}
value={profile.peso_valid_upto}
onChange={(e)=>
setProfile({
...profile,
peso_valid_upto:e.target.value,
})
}
style={{width:"100%",padding:"10px"}}
/>
</div>

</div>

</td>

</tr>

)}
{/* ============================
   MSIHC Details
============================ */}

{profile.msihc && (

<tr>

<td
style={{
padding:"12px",
fontWeight:"bold",
verticalAlign:"top",
}}
>

MSIHC Details

</td>

<td style={{padding:"12px"}}>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,240px)",
gap:"18px",
}}
>

<div>

<label
style={{
display:"block",
marginBottom:"5px",
fontWeight:"bold",
}}
>
Applicable Rule
</label>

<select
disabled={!isEditing}
value={profile.msihc_rule}
onChange={(e)=>
setProfile({
...profile,
msihc_rule:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
>

<option value="">Select Rule</option>

<option>MSIHC Rules, 1989</option>

<option>Chemical Accident Rules</option>

</select>

</div>

<div>

<label
style={{
display:"block",
marginBottom:"5px",
fontWeight:"bold",
}}
>
Hazard Category
</label>

<select
disabled={!isEditing}
value={profile.hazard_category}
onChange={(e)=>
setProfile({
...profile,
hazard_category:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
>

<option value="">Select</option>

<option>Toxic</option>

<option>Flammable</option>

<option>Explosive</option>

<option>Oxidizer</option>

<option>Corrosive</option>

<option>Mixed</option>

</select>

</div>

<div>

<label
style={{
display:"block",
marginBottom:"5px",
fontWeight:"bold",
}}
>
MAH Unit
</label>

<select
disabled={!isEditing}
value={profile.mah_unit ? "Yes" : "No"}
onChange={(e)=>
setProfile({
...profile,
mah_unit:e.target.value==="Yes",
})
}
style={{
width:"100%",
padding:"10px",
}}
>

<option>No</option>

<option>Yes</option>

</select>

</div>

</div>

</td>

</tr>

)}

{/* ============================
   Hazardous Chemicals
============================ */}

{profile.msihc && (

<tr>

<td
style={{
padding:"12px",
fontWeight:"bold",
verticalAlign:"top",
}}
>

Hazardous Chemicals

</td>

<td style={{padding:"12px"}}>

<h3
style={{
marginTop:0,
marginBottom:"15px",
color:"#166534",
}}
>
Hazardous Chemical Details
</h3>

<div
style={{
display:"grid",
gridTemplateColumns:"220px 180px 160px 160px 180px auto",
gap:"12px",
alignItems:"end",
}}
>

<div>

<label
style={{
display:"block",
marginBottom:"5px",
fontWeight:"bold",
}}
>
Chemical Name
</label>

<input
type="text"
value={chemicalForm.chemical_name}
disabled={!isEditing}
onChange={(e)=>
setChemicalForm({
...chemicalForm,
chemical_name:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label
style={{
display:"block",
marginBottom:"5px",
fontWeight:"bold",
}}
>
CAS No.
</label>

<input
type="text"
value={chemicalForm.cas_no}
disabled={!isEditing}
onChange={(e)=>
setChemicalForm({
...chemicalForm,
cas_no:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label
style={{
display:"block",
marginBottom:"5px",
fontWeight:"bold",
}}
>
Storage Qty
</label>

<input
type="number"
value={chemicalForm.storage_qty}
disabled={!isEditing}
onChange={(e)=>
setChemicalForm({
...chemicalForm,
storage_qty:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label
style={{
display:"block",
marginBottom:"5px",
fontWeight:"bold",
}}
>
Unit
</label>

<select
value={chemicalForm.unit}
disabled={!isEditing}
onChange={(e)=>
setChemicalForm({
...chemicalForm,
unit:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
>
<option value="">Select</option>
<option>Kg</option>
<option>MT</option>
<option>Litre</option>
<option>KL</option>
<option>Cylinder</option>
</select>

</div>

<div>

<label
style={{
display:"block",
marginBottom:"5px",
fontWeight:"bold",
}}
>
Threshold Qty
</label>

<input
type="number"
value={chemicalForm.threshold_qty}
disabled={!isEditing}
onChange={(e)=>
setChemicalForm({
...chemicalForm,
threshold_qty:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<button
type="button"
disabled={!isEditing}
onClick={addChemical}
style={{
padding:"10px 20px",
background:"#166534",
color:"#fff",
border:"none",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold",
}}
>

{editingChemicalId ? "Update Chemical" : "+ Add Chemical"}
</button>

<table
  style={{
    width: "100%",
    marginTop: "25px",
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
      <th style={{ padding: "10px" }}>Chemical</th>
      <th style={{ padding: "10px" }}>CAS No</th>
      <th style={{ padding: "10px" }}>Storage Qty</th>
      <th style={{ padding: "10px" }}>Unit</th>
      <th style={{ padding: "10px" }}>Threshold Qty</th>
      <th style={{ padding: "10px" }}>Edit</th>
      <th style={{ padding: "10px" }}>Delete</th>
    </tr>
  </thead>

  <tbody>

    {(profile.hazardous_chemicals || []).map((item: any) => (

      <tr
        key={item.id}
        style={{
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <td style={{ padding: "10px" }}>{item.chemical_name}</td>
        <td style={{ padding: "10px" }}>{item.cas_no}</td>
        <td style={{ padding: "10px" }}>{item.storage_qty}</td>
        <td style={{ padding: "10px" }}>{item.unit}</td>
        <td style={{ padding: "10px" }}>{item.threshold_qty}</td>

        <td style={{ padding: "10px" }}>
          <button
type="button"
disabled={!isEditing}
onClick={() => editChemical(item)}
style={{
padding:"6px 14px",
background:"#2563eb",
color:"#fff",
border:"none",
borderRadius:"6px",
cursor:"pointer",
}}
>
Edit
</button>
        </td>

        <td style={{ padding: "10px" }}>
          <button
type="button"
disabled={!isEditing}
onClick={() => deleteChemical(item.id)}
style={{
padding:"6px 14px",
background:"#dc2626",
color:"#fff",
border:"none",
borderRadius:"6px",
cursor:"pointer",
}}
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

</td>

</tr>

)}
<tr>

<td
style={{
padding:"12px",
fontWeight:"bold",
verticalAlign:"top",
}}
>

Compliance Dashboard

</td>

<td style={{padding:"12px"}}>

<table
style={{
width:"100%",
borderCollapse:"collapse",
}}
>

<thead
style={{
background:"#166534",
color:"#fff",
}}
>

<tr>

<th style={{padding:"10px"}}>Approval</th>

<th style={{padding:"10px"}}>Valid Upto</th>

<th style={{padding:"10px"}}>Status</th>

</tr>

</thead>

<tbody>

{[
["CTE",profile.cte_valid_upto],
["CCA",profile.cca_valid_upto],
["EC",profile.ec_valid_upto],
["CGWA",profile.cgwa_valid_upto],
["Factory",profile.factory_license_valid_upto],
["Fire NOC",profile.fire_noc_valid_upto],
["PESO",profile.peso_valid_upto],
].map(([name,date])=>{

let status="Not Available";

if(date){

const diff=Math.ceil(

(new Date(date as string).getTime()-Date.now())

/(1000*60*60*24)

);

if(diff<0){

status="❌ Expired";

}else if(diff<=60){

status="🟠 Renewal Due";

}else{

status="🟢 Active";

}

}

return(

<tr key={String(name)}>

<td style={{padding:"10px"}}>{name}</td>

<td style={{padding:"10px"}}>{String(date||"-")}</td>

<td style={{padding:"10px",fontWeight:"bold"}}>{status}</td>

</tr>

);

})}

</tbody>

</table>

</td>

</tr>

        </tbody>
      </table>

    </div>
  );
}