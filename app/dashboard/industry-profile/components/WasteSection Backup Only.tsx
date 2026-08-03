export default function WasteSection({
  profile,
  setProfile,
  isEditing,

  hazardousWasteForm,
  setHazardousWasteForm,

  editingHazardousWasteId,
  addHazardousWaste,

  editHazardousWaste,
  deleteHazardousWaste,

  nonHazardousWasteForm,
  setNonHazardousWasteForm,

  editingNonHazardousWasteId,

  addNonHazardousWaste,
  editNonHazardousWaste,
  deleteNonHazardousWaste,

  plasticWasteForm,
setPlasticWasteForm,

editingPlasticWasteId,

addPlasticWaste,
editPlasticWaste,
deletePlasticWaste,

}: any) {

return (

<div
style={{
background:"#fff",
padding:"25px",
borderRadius:"12px",
boxShadow:"0 2px 8px rgba(0,0,0,0.08)",
}}
>

<h2
style={{
marginTop:0,
marginBottom:"25px",
color:"#166534",
}}
>

♻ Waste Management

</h2>

<h3
style={{
marginBottom:"20px",
}}
>

Hazardous Waste Details

</h3>

<div
style={{
display:"grid",
gridTemplateColumns:"180px 120px 220px 120px 140px 180px 220px auto",
gap:"12px",
alignItems:"end",
}}
>

<div>

<label>Category</label>

<select
disabled={!isEditing}
value={hazardousWasteForm.category}
onChange={(e)=>
setHazardousWasteForm({
...hazardousWasteForm,
category:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
>

<option value="">Select</option>

<option>5.1</option>
<option>5.2</option>
<option>5.3</option>
<option>20.1</option>
<option>21.1</option>
<option>28.1</option>
<option>33.1</option>

<option value="Other">Other</option>

</select>

{hazardousWasteForm.category==="Other" && (

<input
type="text"
placeholder="Enter Category"
disabled={!isEditing}
value={hazardousWasteForm.customCategory || ""}
onChange={(e)=>
setHazardousWasteForm({
...hazardousWasteForm,
customCategory:e.target.value,
})
}
style={{
marginTop:"8px",
width:"100%",
padding:"10px",
}}
/>

)}

</div>

<div>

<label>Schedule</label>

<select
disabled={!isEditing}
value={hazardousWasteForm.schedule}
onChange={(e)=>
setHazardousWasteForm({
...hazardousWasteForm,
schedule:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
>

<option value="">Select</option>

<option>Schedule-I</option>

<option>Schedule-II</option>

<option>Schedule-III</option>

<option value="Other">Other</option>

</select>

{hazardousWasteForm.schedule==="Other" && (

<input
type="text"
placeholder="Enter Schedule"
disabled={!isEditing}
value={hazardousWasteForm.customSchedule || ""}
onChange={(e)=>
setHazardousWasteForm({
...hazardousWasteForm,
customSchedule:e.target.value,
})
}
style={{
marginTop:"8px",
width:"100%",
padding:"10px",
}}
/>

)}

</div>

<div>

<label>Waste Name</label>

<select
disabled={!isEditing}
value={hazardousWasteForm.waste_name}
onChange={(e)=>
setHazardousWasteForm({
...hazardousWasteForm,
waste_name:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
>

<option value="">Select</option>

<option>Used Oil</option>

<option>Waste Oil</option>

<option>ETP Sludge</option>

<option>Paint Sludge</option>

<option>Process Residue</option>

<option>Discarded Container</option>

<option>Chemical Sludge</option>

<option>Spent Solvent</option>

<option value="Other">Other</option>

</select>

{hazardousWasteForm.waste_name==="Other" && (

<input
type="text"
placeholder="Enter Waste Name"
disabled={!isEditing}
value={hazardousWasteForm.customWasteName || ""}
onChange={(e)=>
setHazardousWasteForm({
...hazardousWasteForm,
customWasteName:e.target.value,
})
}
style={{
marginTop:"8px",
width:"100%",
padding:"10px",
}}
/>

)}

</div>

<div>

<label>Quantity</label>

<input
type="number"
disabled={!isEditing}
value={hazardousWasteForm.quantity}
onChange={(e)=>
setHazardousWasteForm({
...hazardousWasteForm,
quantity:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label>Unit</label>

<select
disabled={!isEditing}
value={hazardousWasteForm.unit}
onChange={(e)=>
setHazardousWasteForm({
...hazardousWasteForm,
unit:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
>

<option value="">Select</option>
<option>Kg/Day</option>
<option>Kg/Month</option>
<option>Kg/Year</option>
<option>MT/Month</option>
<option>MT/Year</option>

</select>

</div>

<div>

<label>Disposal</label>

<select
disabled={!isEditing}
value={hazardousWasteForm.disposal_method}
onChange={(e)=>
setHazardousWasteForm({
...hazardousWasteForm,
disposal_method:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
>

<option value="">Select</option>

<option>TSDF</option>

<option>Recycler</option>

<option>Co-processing</option>

<option>Incineration</option>

</select>

</div>

<div>

<label>Recycler / TSDF</label>

<input
type="text"
disabled={!isEditing}
value={hazardousWasteForm.recycler}
onChange={(e)=>
setHazardousWasteForm({
...hazardousWasteForm,
recycler:e.target.value,
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
onClick={addHazardousWaste}
style={{
padding:"10px 20px",
background:"#166534",
color:"#fff",
border:"none",
borderRadius:"8px",
fontWeight:"bold",
cursor:"pointer",
}}
>

{editingHazardousWasteId
? "Update"
: "+ Add"}

</button>

</div>
<table
  style={{
    width: "100%",
    marginTop: "30px",
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
      <th style={{ padding: "10px" }}>Category</th>
      <th style={{ padding: "10px" }}>Schedule</th>
      <th style={{ padding: "10px" }}>Waste Name</th>
      <th style={{ padding: "10px" }}>Qty</th>
      <th style={{ padding: "10px" }}>Unit</th>
      <th style={{ padding: "10px" }}>Disposal</th>
      <th style={{ padding: "10px" }}>Recycler / TSDF</th>
      <th style={{ padding: "10px" }}>Edit</th>
      <th style={{ padding: "10px" }}>Delete</th>
    </tr>
  </thead>

  <tbody>
    {(profile.hazardous_waste_data || []).map((item: any) => (
      <tr key={item.id} style={{ borderBottom: "1px solid #ddd" }}>
        <td style={{ padding: "10px" }}>{item.category}</td>
        <td style={{ padding: "10px" }}>{item.schedule}</td>
        <td style={{ padding: "10px" }}>{item.waste_name}</td>
        <td style={{ padding: "10px" }}>{item.quantity}</td>
        <td style={{ padding: "10px" }}>{item.unit}</td>
        <td style={{ padding: "10px" }}>{item.disposal_method}</td>
        <td style={{ padding: "10px" }}>{item.recycler}</td>

        <td style={{ padding: "10px" }}>
          <button
            type="button"
            disabled={!isEditing}
            onClick={() => editHazardousWaste(item)}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "6px 14px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
        </td>

        <td style={{ padding: "10px" }}>
          <button
            type="button"
            disabled={!isEditing}
            onClick={() => deleteHazardousWaste(item.id)}
            style={{
              background: "#dc2626",
              color: "#fff",
              border: "none",
              padding: "6px 14px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
<hr style={{margin:"40px 0"}} />

<h3>Non-Hazardous Waste</h3>

<div
style={{
display:"grid",
gridTemplateColumns:"220px 120px 150px 220px auto",
gap:"12px",
alignItems:"end",
}}
>

<input
placeholder="Waste Name"
disabled={!isEditing}
value={nonHazardousWasteForm.waste_name}
onChange={(e)=>
setNonHazardousWasteForm({
...nonHazardousWasteForm,
waste_name:e.target.value,
})
}
/>

<input
type="number"
placeholder="Qty"
disabled={!isEditing}
value={nonHazardousWasteForm.quantity}
onChange={(e)=>
setNonHazardousWasteForm({
...nonHazardousWasteForm,
quantity:e.target.value,
})
}
/>

<select
disabled={!isEditing}
value={nonHazardousWasteForm.unit}
onChange={(e)=>
setNonHazardousWasteForm({
...nonHazardousWasteForm,
unit:e.target.value,
})
}
>

<option value="">Unit</option>
<option>Kg/Month</option>
<option>MT/Year</option>

</select>

<input
placeholder="Disposal"
disabled={!isEditing}
value={nonHazardousWasteForm.disposal}
onChange={(e)=>
setNonHazardousWasteForm({
...nonHazardousWasteForm,
disposal:e.target.value,
})
}
/>

<button
type="button"
disabled={!isEditing}
onClick={addNonHazardousWaste}
>

{editingNonHazardousWasteId
? "Update"
: "+ Add"}

</button>

</div>

<table
style={{
width:"100%",
marginTop:"20px",
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

<th>Waste</th>

<th>Qty</th>

<th>Unit</th>

<th>Disposal</th>

<th>Edit</th>

<th>Delete</th>

</tr>

</thead>

<tbody>

{(profile.non_hazardous_waste_data||[]).map((item:any)=>(

<tr key={item.id}>

<td>{item.waste_name}</td>

<td>{item.quantity}</td>

<td>{item.unit}</td>

<td>{item.disposal}</td>

<td>

<button
type="button"
disabled={!isEditing}
onClick={()=>editNonHazardousWaste(item)}
>

Edit

</button>

</td>

<td>

<button
type="button"
disabled={!isEditing}
onClick={()=>deleteNonHazardousWaste(item.id)}
>

Delete

</button>

</td>

</tr>

))}

</tbody>

</table>
<hr style={{ margin: "40px 0" }} />

<h3>Plastic Waste</h3>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "220px 120px 140px 220px auto",
    gap: "12px",
    alignItems: "end",
  }}
>
  <div>
    <label>Plastic Type</label>
    <input
      value={plasticWasteForm.plastic_type}
      disabled={!isEditing}
      onChange={(e) =>
        setPlasticWasteForm({
          ...plasticWasteForm,
          plastic_type: e.target.value,
        })
      }
    />
  </div>

  <div>
    <label>Quantity</label>
    <input
      value={plasticWasteForm.quantity}
      disabled={!isEditing}
      onChange={(e) =>
        setPlasticWasteForm({
          ...plasticWasteForm,
          quantity: e.target.value,
        })
      }
    />
  </div>

  <div>
    <label>Unit</label>
    <select
      value={plasticWasteForm.unit}
      disabled={!isEditing}
      onChange={(e) =>
        setPlasticWasteForm({
          ...plasticWasteForm,
          unit: e.target.value,
        })
      }
    >
      <option value="">Select</option>
      <option>Kg/Month</option>
      <option>Kg/Year</option>
      <option>MT/Year</option>
    </select>
  </div>

  <div>
    <label>Recycler</label>
    <input
      value={plasticWasteForm.recycler}
      disabled={!isEditing}
      onChange={(e) =>
        setPlasticWasteForm({
          ...plasticWasteForm,
          recycler: e.target.value,
        })
      }
    />
  </div>

  <div>
    <button
      type="button"
      disabled={!isEditing}
      onClick={addPlasticWaste}
    >
      {editingPlasticWasteId ? "Update" : "+ Add Plastic"}
    </button>
  </div>
</div>

<table
  style={{
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
  }}
>
  <thead style={{ background: "#166534", color: "#fff" }}>
    <tr>
      <th>Plastic Type</th>
      <th>Qty</th>
      <th>Unit</th>
      <th>Recycler</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>

  <tbody>
    {(profile.plastic_waste_data || []).map((item: any) => (
      <tr key={item.id}>
        <td>{item.plastic_type}</td>
        <td>{item.quantity}</td>
        <td>{item.unit}</td>
        <td>{item.recycler}</td>

        <td>
          <button
            type="button"
            disabled={!isEditing}
            onClick={() => editPlasticWaste(item)}
          >
            Edit
          </button>
        </td>

        <td>
          <button
            type="button"
            disabled={!isEditing}
            onClick={() => deletePlasticWaste(item.id)}
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

);

}