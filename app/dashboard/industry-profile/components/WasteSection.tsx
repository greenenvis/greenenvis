"use client";

type Props = {
  profile: any;
  setProfile: any;
  isEditing: boolean;

  hazardousWasteForm: any;
  setHazardousWasteForm: any;

  editingHazardousWasteId: any;

  addHazardousWaste: any;
  editHazardousWaste: any;
  deleteHazardousWaste: any;

  nonHazardousWasteForm: any;
  setNonHazardousWasteForm: any;

  editingNonHazardousWasteId: any;

  addNonHazardousWaste: any;
  editNonHazardousWaste: any;
  deleteNonHazardousWaste: any;

  plasticWasteForm: any;
  setPlasticWasteForm: any;

  editingPlasticWasteId: any;

  addPlasticWaste: any;
  editPlasticWaste: any;
  deletePlasticWaste: any;

  usedOilForm: any;
  setUsedOilForm: any;

  editingUsedOilId: any;

  addUsedOil: any;
  editUsedOil: any;
  deleteUsedOil: any;

  batteryWasteForm: any;
  setBatteryWasteForm: any;

  editingBatteryWasteId: any;

  addBatteryWaste: any;
  editBatteryWaste: any;
  deleteBatteryWaste: any;

  biomedicalWasteForm: any;
setBiomedicalWasteForm: any;

editingBiomedicalWasteId: any;

addBiomedicalWaste: any;
editBiomedicalWaste: any;
deleteBiomedicalWaste: any;

eWasteForm: any;
setEWasteForm: any;

editingEWasteId: any;

addEWaste: any;
editEWaste: any;
deleteEWaste: any;

disposalFacilityForm: any;
setDisposalFacilityForm: any;

editingDisposalFacilityId: any;

addDisposalFacility: any;
editDisposalFacility: any;
deleteDisposalFacility: any;

};

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

  usedOilForm,
  setUsedOilForm,

  editingUsedOilId,

  addUsedOil,
  editUsedOil,
  deleteUsedOil,

  batteryWasteForm,
  setBatteryWasteForm,

  editingBatteryWasteId,

  addBatteryWaste,
  editBatteryWaste,
  deleteBatteryWaste,

  biomedicalWasteForm,
  setBiomedicalWasteForm,

  editingBiomedicalWasteId,

  addBiomedicalWaste,
  editBiomedicalWaste,
  deleteBiomedicalWaste,

  eWasteForm,
  setEWasteForm,

  editingEWasteId,

  addEWaste,
  editEWaste,
  deleteEWaste,

  disposalFacilityForm,
setDisposalFacilityForm,

editingDisposalFacilityId,

addDisposalFacility,
editDisposalFacility,
deleteDisposalFacility,
  
}: Props) {

return (

<div
style={{
background:"#ffffff",
padding:"25px",
borderRadius:"12px",
boxShadow:"0 2px 8px rgba(0,0,0,0.08)",
}}

>

<h2
style={{
marginTop:0,
marginBottom:"30px",
color:"#166534",
}}

>


♻ Waste Management

</h2>

{/* =========================
    Hazardous Waste
========================= */}

<div
style={{
border:"1px solid #d1d5db",
borderRadius:"12px",
padding:"20px",
marginBottom:"30px",
}}
>

<h3
style={{
marginTop:0,
marginBottom:"20px",
color:"#166534",
}}
>
Hazardous Waste Details
</h3>

<div
style={{
display:"grid",
gridTemplateColumns:
"180px 120px 220px 120px 140px 180px 220px auto",
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

<option value="Other">
Other
</option>

</select>

{hazardousWasteForm.category==="Other" && (

<input
type="text"
disabled={!isEditing}
placeholder="Enter Category"
value={hazardousWasteForm.customCategory}
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

<option value="">
Select
</option>

<option>Schedule-I</option>
<option>Schedule-II</option>
<option>Schedule-III</option>

<option value="Other">
Other
</option>

</select>

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

<option value="Other">
Other
</option>

</select>

{hazardousWasteForm.waste_name==="Other" && (

<input
type="text"
disabled={!isEditing}
placeholder="Enter Waste Name"
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
<option>MT/Day</option>
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
cursor:"pointer",
fontWeight:"bold",
marginTop:"22px",
}}
>

{editingHazardousWasteId
? "Update"
: "+ Add"}

</button>

</div>

</div>
<table
style={{
width:"100%",
marginTop:"25px",
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

<th style={{padding:"10px"}}>Category</th>

<th style={{padding:"10px"}}>Schedule</th>

<th style={{padding:"10px"}}>Waste Name</th>

<th style={{padding:"10px"}}>Qty</th>

<th style={{padding:"10px"}}>Unit</th>

<th style={{padding:"10px"}}>Disposal</th>

<th style={{padding:"10px"}}>Recycler / TSDF</th>

<th style={{padding:"10px"}}>Edit</th>

<th style={{padding:"10px"}}>Delete</th>

</tr>

</thead>

<tbody>

{(profile.hazardous_waste_data || []).map((item:any)=>(

<tr
key={item.id}
style={{
borderBottom:"1px solid #ddd",
}}
>

<td style={{padding:"10px"}}>{item.category}</td>

<td style={{padding:"10px"}}>{item.schedule}</td>

<td style={{padding:"10px"}}>{item.waste_name}</td>

<td style={{padding:"10px"}}>{item.quantity}</td>

<td style={{padding:"10px"}}>{item.unit}</td>

<td style={{padding:"10px"}}>{item.disposal_method}</td>

<td style={{padding:"10px"}}>{item.recycler}</td>

<td style={{padding:"10px"}}>

<button
type="button"
disabled={!isEditing}
onClick={()=>editHazardousWaste(item)}
style={{
background:"#2563eb",
color:"#fff",
border:"none",
padding:"6px 14px",
borderRadius:"6px",
cursor:"pointer",
}}
>

Edit

</button>

</td>

<td style={{padding:"10px"}}>

<button
type="button"
disabled={!isEditing}
onClick={()=>deleteHazardousWaste(item.id)}
style={{
background:"#dc2626",
color:"#fff",
border:"none",
padding:"6px 14px",
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

<hr style={{margin:"40px 0"}} />

{/* =========================
    Non-Hazardous Waste
========================= */}

<div
style={{
border:"1px solid #d1d5db",
borderRadius:"12px",
padding:"20px",
marginBottom:"30px",
}}
>

<h3
style={{
marginTop:0,
marginBottom:"20px",
color:"#166534",
}}
>

Non-Hazardous Waste

</h3>

<div
style={{
display:"grid",
gridTemplateColumns:"220px 120px 150px 220px auto",
gap:"12px",
alignItems:"end",
}}
>

<div>

<label>Waste Name</label>

<select
disabled={!isEditing}
value={nonHazardousWasteForm.waste_name}
onChange={(e)=>
setNonHazardousWasteForm({
...nonHazardousWasteForm,
waste_name:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
>

<option value="">Select</option>

<option>Paper Waste</option>
<option>Cardboard</option>
<option>Plastic Scrap</option>
<option>Metal Scrap</option>
<option>Wood Scrap</option>
<option>Glass Scrap</option>
<option>Rubber Scrap</option>
<option>Fabric Waste</option>
<option>Ash</option>
<option>Municipal Solid Waste</option>
<option>Food Waste</option>
<option>Packaging Waste</option>
<option>Rejected Material</option>
<option>Construction Debris</option>

<option value="Other">
Other
</option>

</select>
{nonHazardousWasteForm.waste_name==="Other" && (

<input
type="text"
placeholder="Enter Waste Name"
disabled={!isEditing}
value={nonHazardousWasteForm.customWasteName || ""}
onChange={(e)=>
setNonHazardousWasteForm({
...nonHazardousWasteForm,
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
value={nonHazardousWasteForm.quantity}
onChange={(e)=>
setNonHazardousWasteForm({
...nonHazardousWasteForm,
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
value={nonHazardousWasteForm.unit}
onChange={(e)=>
setNonHazardousWasteForm({
...nonHazardousWasteForm,
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
<option>MT/Day</option>
<option>MT/Month</option>
<option>MT/Year</option>

</select>

</div>
<div>

<label>Disposal</label>

<input
disabled={!isEditing}
value={nonHazardousWasteForm.disposal}
onChange={(e)=>
setNonHazardousWasteForm({
...nonHazardousWasteForm,
disposal:e.target.value,
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
onClick={addNonHazardousWaste}
style={{
padding:"10px 20px",
background:"#166534",
color:"#fff",
border:"none",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold",
marginTop:"22px",
}}
>

{editingNonHazardousWasteId
? "Update"
: "+ Add"}

</button>

</div>

</div>

<table
style={{
width:"100%",
marginTop:"25px",
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

<th style={{padding:"10px"}}>Waste Name</th>
<th style={{padding:"10px"}}>Quantity</th>
<th style={{padding:"10px"}}>Unit</th>
<th style={{padding:"10px"}}>Disposal</th>
<th style={{padding:"10px"}}>Edit</th>
<th style={{padding:"10px"}}>Delete</th>

</tr>

</thead>

<tbody>

{(profile.non_hazardous_waste_data || []).map((item:any)=>(

<tr key={item.id}>

<td style={{padding:"10px"}}>{item.waste_name}</td>
<td style={{padding:"10px"}}>{item.quantity}</td>
<td style={{padding:"10px"}}>{item.unit}</td>
<td style={{padding:"10px"}}>{item.disposal}</td>

<td style={{padding:"10px"}}>

<button
type="button"
disabled={!isEditing}
onClick={()=>editNonHazardousWaste(item)}
>

Edit

</button>

</td>

<td style={{padding:"10px"}}>

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

<hr style={{margin:"40px 0"}} />

{/* =========================
      Plastic Waste
========================= */}

<div
style={{
border:"1px solid #d1d5db",
borderRadius:"12px",
padding:"20px",
marginBottom:"30px",
}}
>

<h3
style={{
marginTop:0,
marginBottom:"20px",
color:"#166534",
}}
>

Plastic Waste

</h3>

<div
style={{
display:"grid",
gridTemplateColumns:"220px 120px 150px 220px auto",
gap:"12px",
alignItems:"end",
}}
>

<div>

<label>Plastic Type</label>

<select
disabled={!isEditing}
value={plasticWasteForm.plastic_type}
onChange={(e)=>
setPlasticWasteForm({
...plasticWasteForm,
plastic_type:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
>

<option value="">Select</option>

<option>HDPE</option>
<option>LDPE</option>
<option>LLDPE</option>
<option>PP</option>
<option>PET</option>
<option>PVC</option>
<option>ABS</option>
<option>HIPS</option>
<option>Nylon</option>
<option>Polycarbonate</option>
<option>Acrylic</option>
<option>Plastic Film</option>
<option>Plastic Scrap</option>
<option>Mixed Plastic</option>
<option>Plastic Granules</option>

<option value="Other">
Other
</option>

</select>

{plasticWasteForm.plastic_type==="Other" && (

<input
type="text"
placeholder="Enter Plastic Type"
disabled={!isEditing}
value={plasticWasteForm.customPlasticType || ""}
onChange={(e)=>
setPlasticWasteForm({
...plasticWasteForm,
customPlasticType:e.target.value,
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
value={plasticWasteForm.quantity}
onChange={(e)=>
setPlasticWasteForm({
...plasticWasteForm,
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
value={plasticWasteForm.unit}
onChange={(e)=>
setPlasticWasteForm({
...plasticWasteForm,
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
<option>MT/Day</option>
<option>MT/Month</option>
<option>MT/Year</option>

</select>

</div>

<div>

<label>Recycler</label>

<input
disabled={!isEditing}
value={plasticWasteForm.recycler}
onChange={(e)=>
setPlasticWasteForm({
...plasticWasteForm,
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
onClick={addPlasticWaste}
style={{
padding:"10px 20px",
background:"#166534",
color:"#fff",
border:"none",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold",
marginTop:"22px",
}}
>

{editingPlasticWasteId
? "Update"
: "+ Add"}

</button>

</div>

</div>
<table
style={{
width:"100%",
marginTop:"25px",
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

<th style={{padding:"10px"}}>Plastic Type</th>
<th style={{padding:"10px"}}>Quantity</th>
<th style={{padding:"10px"}}>Unit</th>
<th style={{padding:"10px"}}>Recycler</th>
<th style={{padding:"10px"}}>Edit</th>
<th style={{padding:"10px"}}>Delete</th>

</tr>

</thead>

<tbody>

{(profile.plastic_waste_data || []).map((item:any)=>(

<tr
key={item.id}
style={{
borderBottom:"1px solid #ddd",
}}
>

<td style={{padding:"10px"}}>{item.plastic_type}</td>

<td style={{padding:"10px"}}>{item.quantity}</td>

<td style={{padding:"10px"}}>{item.unit}</td>

<td style={{padding:"10px"}}>{item.recycler}</td>

<td style={{padding:"10px"}}>

<button
type="button"
disabled={!isEditing}
onClick={()=>editPlasticWaste(item)}
style={{
background:"#2563eb",
color:"#fff",
border:"none",
padding:"6px 14px",
borderRadius:"6px",
cursor:"pointer",
}}
>

Edit

</button>

</td>

<td style={{padding:"10px"}}>

<button
type="button"
disabled={!isEditing}
onClick={()=>deletePlasticWaste(item.id)}
style={{
background:"#dc2626",
color:"#fff",
border:"none",
padding:"6px 14px",
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

<hr style={{ margin: "40px 0" }} />

{/* Used Oil Start */}

<div
style={{
border:"1px solid #d1d5db",
borderRadius:"12px",
padding:"20px",
marginBottom:"30px",
}}
>

<h3
style={{
marginTop:0,
marginBottom:"20px",
color:"#166534",
}}
>

Used Oil

</h3>

<div
style={{
display:"grid",
gridTemplateColumns:"220px 120px 150px 220px auto",
gap:"50px",
alignItems:"end",
}}
>

<div>

<label>Oil Type</label>


<select

disabled={!isEditing}
value={usedOilForm.oil_type}
onChange={(e)=>
setUsedOilForm({
...usedOilForm,
oil_type:e.target.value,
})
}
>

<option value="">Select</option>

<option>Used Lubricating Oil</option>
<option>Hydraulic Oil</option>
<option>Gear Oil</option>
<option>Transformer Oil</option>

<option value="Other">Other</option>

</select>

{usedOilForm.oil_type==="Other" && (

<input
type="text"
placeholder="Enter Oil Type"
disabled={!isEditing}
value={usedOilForm.customOilType || ""}
onChange={(e)=>
setUsedOilForm({
...usedOilForm,
customOilType:e.target.value,
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
value={usedOilForm.quantity}
onChange={(e)=>
setUsedOilForm({
...usedOilForm,
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
value={usedOilForm.unit}
onChange={(e)=>
setUsedOilForm({
...usedOilForm,
unit:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
>

<option value="">Select</option>

<option>Liter/Day</option>
<option>Liter/Month</option>
<option>Liter/Year</option>
<option>KL/Day</option>
<option>KL/Month</option>
<option>KL/Year</option>
<option>MT/Day</option>
<option>MT/Month</option>
<option>MT/Year</option>

</select>

</div>
<div>

<label>Recycler</label>

<input
type="text"
disabled={!isEditing}
value={usedOilForm.recycler}
onChange={(e)=>
setUsedOilForm({
...usedOilForm,
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
onClick={addUsedOil}
style={{
padding:"10px 20px",
background:"#166534",
color:"#fff",
border:"none",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold",
marginTop:"22px",
}}
>

{editingUsedOilId
? "Update"
: "+ Add"}

</button>
</div>
<table
style={{
width:"300%",
marginTop:"1px",
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

<th style={{padding:"10px"}}>Oil Type</th>
<th style={{padding:"10px"}}>Quantity</th>
<th style={{padding:"10px"}}>Unit</th>
<th style={{padding:"10px"}}>Recycler</th>
<th style={{padding:"10px"}}>Edit</th>
<th style={{padding:"10px"}}>Delete</th>

</tr>

</thead>

<tbody>

{(profile.used_oil_data || []).map((item:any)=>(

<tr
key={item.id}
style={{
borderBottom:"1px solid #ddd",
}}
>

<td style={{padding:"10px"}}>{item.oil_type}</td>

<td style={{padding:"10px"}}>{item.quantity}</td>

<td style={{padding:"10px"}}>{item.unit}</td>

<td style={{padding:"10px"}}>{item.recycler}</td>

<td style={{padding:"10px"}}>

<button
type="button"
disabled={!isEditing}
onClick={()=>editUsedOil(item)}
style={{
background:"#2563eb",
color:"#fff",
border:"none",
padding:"6px 14px",
borderRadius:"6px",
cursor:"pointer",
}}
>

Edit

</button>

</td>

<td style={{padding:"10px"}}>

<button
type="button"
disabled={!isEditing}
onClick={()=>deleteUsedOil(item.id)}
style={{
background:"#dc2626",
color:"#fff",
border:"none",
padding:"6px 14px",
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
</div>
</div>
</div>

<hr style={{ margin: "40px 0" }} />

<div
style={{
border:"1px solid #d1d5db",
borderRadius:"12px",
padding:"20px",
marginBottom:"30px",
}}
>

<h3
style={{
marginTop:0,
marginBottom:"20px",
color:"#166534",
}}
>

Battery Waste

</h3>

<div
style={{
display:"grid",
gridTemplateColumns:"220px 120px 150px 220px auto",
gap:"12px",
alignItems:"end",
}}
>

<div>

<label>Battery Type</label>

<select
disabled={!isEditing}
value={batteryWasteForm.battery_type}
onChange={(e)=>
setBatteryWasteForm({
...batteryWasteForm,
battery_type:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
>

<option value="">Select</option>

<option>Lead Acid Battery</option>
<option>Lithium Ion Battery</option>
<option>Nickel Cadmium Battery</option>
<option>UPS Battery</option>
<option>Dry Cell</option>

<option value="Other">Other</option>

</select>

{batteryWasteForm.battery_type==="Other" && (

<input
type="text"
placeholder="Enter Battery Type"
disabled={!isEditing}
value={batteryWasteForm.customBatteryType || ""}
onChange={(e)=>
setBatteryWasteForm({
...batteryWasteForm,
customBatteryType:e.target.value,
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
value={batteryWasteForm.quantity}
onChange={(e)=>
setBatteryWasteForm({
...batteryWasteForm,
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
value={batteryWasteForm.unit}
onChange={(e)=>
setBatteryWasteForm({
...batteryWasteForm,
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
<option>MT/Day</option>
<option>MT/Month</option>
<option>MT/Year</option>

</select>

</div>
<div>

<label>Recycler</label>

<input
type="text"
disabled={!isEditing}
value={batteryWasteForm.recycler}
onChange={(e)=>
setBatteryWasteForm({
...batteryWasteForm,
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
onClick={addBatteryWaste}
style={{
padding:"10px 20px",
background:"#166534",
color:"#fff",
border:"none",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold",
marginTop:"22px",
}}
>

{editingBatteryWasteId
? "Update"
: "+ Add"}

</button>

</div>
<table
style={{
width:"300%",
marginTop:"25px",
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

<th style={{padding:"10px"}}>Battery Type</th>
<th style={{padding:"10px"}}>Quantity</th>
<th style={{padding:"10px"}}>Unit</th>
<th style={{padding:"10px"}}>Recycler</th>
<th style={{padding:"10px"}}>Edit</th>
<th style={{padding:"10px"}}>Delete</th>

</tr>

</thead>

<tbody>

{(profile.battery_waste_data || []).map((item:any)=>(

<tr
key={item.id}
style={{
borderBottom:"1px solid #ddd",
}}
>

<td style={{padding:"10px"}}>{item.battery_type}</td>

<td style={{padding:"10px"}}>{item.quantity}</td>

<td style={{padding:"10px"}}>{item.unit}</td>

<td style={{padding:"10px"}}>{item.recycler}</td>

<td style={{padding:"10px"}}>

<button
type="button"
disabled={!isEditing}
onClick={()=>editBatteryWaste(item)}
style={{
background:"#2563eb",
color:"#fff",
border:"none",
padding:"6px 14px",
borderRadius:"6px",
cursor:"pointer",
}}
>

Edit

</button>

</td>

<td style={{padding:"10px"}}>

<button
type="button"
disabled={!isEditing}
onClick={()=>deleteBatteryWaste(item.id)}
style={{
background:"#dc2626",
color:"#fff",
border:"none",
padding:"6px 14px",
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

<hr style={{ margin: "40px 0" }} />

<div
style={{
border:"1px solid #d1d5db",
borderRadius:"12px",
padding:"20px",
marginBottom:"30px",
}}
>

<h3
style={{
marginTop:0,
marginBottom:"20px",
color:"#166534",
}}
>

Biomedical Waste

</h3>

<div
style={{
display:"grid",
gridTemplateColumns:"170px 220px 120px 150px 220px auto",
gap:"12px",
alignItems:"end",
}}
>

<div>

<label>Category</label>

<select
disabled={!isEditing}
value={biomedicalWasteForm.category}
onChange={(e)=>
setBiomedicalWasteForm({
...biomedicalWasteForm,
category:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
>

<option value="">Select</option>

<option>Yellow</option>
<option>Red</option>
<option>White</option>
<option>Blue</option>

<option value="Other">Other</option>

</select>

{biomedicalWasteForm.category==="Other" && (

<input
type="text"
placeholder="Enter Category"
disabled={!isEditing}
value={biomedicalWasteForm.customCategory || ""}
onChange={(e)=>
setBiomedicalWasteForm({
...biomedicalWasteForm,
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

<label>Waste Name</label>

<select
disabled={!isEditing}
value={biomedicalWasteForm.waste_name}
onChange={(e)=>
setBiomedicalWasteForm({
...biomedicalWasteForm,
waste_name:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
>

<option value="">Select</option>

<option>Human Anatomical Waste</option>
<option>Soiled Waste</option>
<option>Expired Medicines</option>
<option>Contaminated Plastic Waste</option>
<option>Waste Sharps</option>
<option>Glassware</option>
<option>Animal Anatomical Waste</option>
<option>Microbiology and Biotechnology Waste</option>
<option>Chemical Waste</option>
<option>Chemical Liquid Waste</option>
<option>Discarded Linen and Beddings</option>
<option>Metallic Body Implants</option>

<option value="Other">Other</option>

</select>

{biomedicalWasteForm.waste_name==="Other" && (

<input
type="text"
placeholder="Enter Waste Name"
disabled={!isEditing}
value={biomedicalWasteForm.customWasteName || ""}
onChange={(e)=>
setBiomedicalWasteForm({
...biomedicalWasteForm,
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
value={biomedicalWasteForm.quantity}
onChange={(e)=>
setBiomedicalWasteForm({
...biomedicalWasteForm,
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
value={biomedicalWasteForm.unit}
onChange={(e)=>
setBiomedicalWasteForm({
...biomedicalWasteForm,
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
<option>MT/Day</option>
<option>MT/Month</option>
<option>MT/Year</option>

</select>

</div>

<div>

<label>CBWTF Name</label>

<input
type="text"
disabled={!isEditing}
value={biomedicalWasteForm.cbwtf_name}
onChange={(e)=>
setBiomedicalWasteForm({
...biomedicalWasteForm,
cbwtf_name:e.target.value,
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
onClick={addBiomedicalWaste}
style={{
padding:"10px 20px",
background:"#166534",
color:"#fff",
border:"none",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold",
marginTop:"22px",
}}
>

{editingBiomedicalWasteId
? "Update"
: "+ Add"}

</button>

</div>
<table
style={{
width:"100%",
marginTop:"25px",
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

<th style={{padding:"10px"}}>Category</th>
<th style={{padding:"10px"}}>Waste Name</th>
<th style={{padding:"10px"}}>Quantity</th>
<th style={{padding:"10px"}}>Unit</th>
<th style={{padding:"10px"}}>CBWTF</th>
<th style={{padding:"10px"}}>Edit</th>
<th style={{padding:"10px"}}>Delete</th>

</tr>

</thead>

<tbody>

{(profile.biomedical_waste_data || []).map((item:any)=>(

<tr
key={item.id}
style={{
borderBottom:"1px solid #ddd",
}}
>

<td style={{padding:"10px"}}>{item.category}</td>

<td style={{padding:"10px"}}>{item.waste_name}</td>

<td style={{padding:"10px"}}>{item.quantity}</td>

<td style={{padding:"10px"}}>{item.unit}</td>

<td style={{padding:"10px"}}>{item.cbwtf_name}</td>

<td style={{padding:"10px"}}>

<button
type="button"
disabled={!isEditing}
onClick={()=>editBiomedicalWaste(item)}
style={{
background:"#2563eb",
color:"#fff",
border:"none",
padding:"6px 14px",
borderRadius:"6px",
cursor:"pointer",
}}
>

Edit

</button>

</td>

<td style={{padding:"10px"}}>

<button
type="button"
disabled={!isEditing}
onClick={()=>deleteBiomedicalWaste(item.id)}
style={{
background:"#dc2626",
color:"#fff",
border:"none",
padding:"6px 14px",
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

<hr style={{ margin: "40px 0" }} />

<div
style={{
border:"1px solid #d1d5db",
borderRadius:"12px",
padding:"20px",
marginBottom:"30px",
}}
>

<h3
style={{
marginTop:0,
marginBottom:"20px",
color:"#166534",
}}
>

E-Waste

</h3>

<div
style={{
display:"grid",
gridTemplateColumns:"170px 220px 120px 150px 220px auto",
gap:"12px",
alignItems:"end",
}}
>

<div>

<label>Category</label>

<select
disabled={!isEditing}
value={eWasteForm.category}
onChange={(e)=>
setEWasteForm({
...eWasteForm,
category:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
>

<option value="">Select</option>

<option>ITEW1</option>
<option>ITEW2</option>
<option>ITEW3</option>
<option>ITEW4</option>
<option>ITEW5</option>
<option>ITEW6</option>
<option>ITEW7</option>
<option>ITEW8</option>
<option>ITEW9</option>
<option>ITEW10</option>
<option>ITEW11</option>
<option>ITEW12</option>
<option>ITEW13</option>
<option>ITEW14</option>
<option>ITEW15</option>
<option>ITEW16</option>
<option>ITEW17</option>
<option>ITEW18</option>
<option>ITEW19</option>
<option>ITEW20</option>
<option>ITEW21</option>
<option>ITEW22</option>
<option>ITEW23</option>
<option>ITEW24</option>
<option>ITEW25</option>
<option>CEEW1</option>
<option>CEEW2</option>
<option>CEEW3</option>
<option>CEEW4</option>
<option>CEEW5</option>
<option>CEEW6</option>
<option>LLEW1</option>
<option>LLEW2</option>
<option>EEMW1</option>
<option>EEMW2</option>
<option>EEMW3</option>
<option>EEMW4</option>
<option>EEMW5</option>
<option>ITW1</option>
<option>ITW2</option>
<option>CFL</option>
<option>PCB</option>
<option>Consumer Electronics</option>
<option>Solar Panels</option>
<option>Lithium-ion Batteries</option>
<option>Lead-Acid Batteries</option>
<option>Electrical Cables & Wires</option>

<option value="Other">Other</option>

</select>

{eWasteForm.category==="Other" && (

<input
type="text"
placeholder="Enter Category"
disabled={!isEditing}
value={eWasteForm.customCategory || ""}
onChange={(e)=>
setEWasteForm({
...eWasteForm,
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

<label>Item Name</label>

<select
disabled={!isEditing}
value={eWasteForm.item_name}
onChange={(e)=>
setEWasteForm({
...eWasteForm,
item_name:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
>

<option value="">Select</option>

<option>Desktop Computer</option>
<option>Laptop</option>
<option>Printer</option>
<option>Monitor</option>
<option>Keyboard</option>
<option>Mouse</option>
<option>UPS</option>
<option>Server</option>
<option>Mobile Phone</option>
<option>Router / Switch</option>

<option value="Other">Other</option>

</select>

{eWasteForm.item_name==="Other" && (

<input
type="text"
placeholder="Enter Item Name"
disabled={!isEditing}
value={eWasteForm.customItemName || ""}
onChange={(e)=>
setEWasteForm({
...eWasteForm,
customItemName:e.target.value,
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
value={eWasteForm.quantity}
onChange={(e)=>
setEWasteForm({
...eWasteForm,
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
value={eWasteForm.unit}
onChange={(e)=>
setEWasteForm({
...eWasteForm,
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
<option>MT/Day</option>
<option>MT/Month</option>
<option>MT/Year</option>

</select>

</div>

<div>

<label>Recycler</label>

<input
type="text"
disabled={!isEditing}
value={eWasteForm.recycler}
onChange={(e)=>
setEWasteForm({
...eWasteForm,
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
onClick={addEWaste}
style={{
padding:"10px 20px",
background:"#166534",
color:"#fff",
border:"none",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold",
marginTop:"22px",
}}
>

{editingEWasteId
? "Update"
: "+ Add"}

</button>

</div>
<table
style={{
width:"100%",
marginTop:"25px",
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

<th style={{padding:"10px"}}>Category</th>
<th style={{padding:"10px"}}>Item Name</th>
<th style={{padding:"10px"}}>Quantity</th>
<th style={{padding:"10px"}}>Unit</th>
<th style={{padding:"10px"}}>Recycler</th>
<th style={{padding:"10px"}}>Edit</th>
<th style={{padding:"10px"}}>Delete</th>

</tr>

</thead>

<tbody>

{(profile.ewaste_data || []).map((item:any)=>(

<tr key={item.id} style={{borderBottom:"1px solid #ddd"}}>

<td style={{padding:"10px"}}>{item.category}</td>
<td style={{padding:"10px"}}>{item.item_name}</td>
<td style={{padding:"10px"}}>{item.quantity}</td>
<td style={{padding:"10px"}}>{item.unit}</td>
<td style={{padding:"10px"}}>{item.recycler}</td>

<td style={{padding:"10px"}}>

<button
type="button"
disabled={!isEditing}
onClick={()=>editEWaste(item)}
style={{
background:"#2563eb",
color:"#fff",
border:"none",
padding:"6px 14px",
borderRadius:"6px",
cursor:"pointer",
}}
>
Edit
</button>

</td>

<td style={{padding:"10px"}}>

<button
type="button"
disabled={!isEditing}
onClick={()=>deleteEWaste(item.id)}
style={{
background:"#dc2626",
color:"#fff",
border:"none",
padding:"6px 14px",
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

<hr style={{ margin: "40px 0" }} />

<div
style={{
border:"1px solid #d1d5db",
borderRadius:"12px",
padding:"20px",
marginBottom:"30px",
}}
>

<h3
style={{
marginTop:0,
marginBottom:"20px",
color:"#166534",
}}
>
Disposal Facilities
</h3>

<div
style={{
display:"grid",
gridTemplateColumns:"180px 220px 220px 180px auto",
gap:"12px",
alignItems:"end",
}}
>

<div>

<label>Facility Type</label>

<select
disabled={!isEditing}
value={disposalFacilityForm.facility_type}
onChange={(e)=>
setDisposalFacilityForm({
...disposalFacilityForm,
facility_type:e.target.value,
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
<option>CBWTF</option>
<option>Co-processing</option>
<option>Incinerator</option>
<option>Cement Plant</option>

<option value="Other">Other</option>

</select>

{disposalFacilityForm.facility_type==="Other" && (

<input
type="text"
placeholder="Enter Facility Type"
disabled={!isEditing}
value={disposalFacilityForm.customFacilityType || ""}
onChange={(e)=>
setDisposalFacilityForm({
...disposalFacilityForm,
customFacilityType:e.target.value,
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

<label>Facility Name</label>

<input
type="text"
disabled={!isEditing}
value={disposalFacilityForm.facility_name}
onChange={(e)=>
setDisposalFacilityForm({
...disposalFacilityForm,
facility_name:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label>Address</label>

<input
type="text"
disabled={!isEditing}
value={disposalFacilityForm.address}
onChange={(e)=>
setDisposalFacilityForm({
...disposalFacilityForm,
address:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label>Authorization No.</label>

<input
type="text"
disabled={!isEditing}
value={disposalFacilityForm.authorization_no}
onChange={(e)=>
setDisposalFacilityForm({
...disposalFacilityForm,
authorization_no:e.target.value,
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
onClick={addDisposalFacility}
style={{
padding:"10px 20px",
background:"#166534",
color:"#fff",
border:"none",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold",
marginTop:"22px",
}}
>

{editingDisposalFacilityId
? "Update"
: "+ Add"}

</button>

</div>
<table
style={{
width:"100%",
marginTop:"25px",
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

<th style={{padding:"10px"}}>Facility Type</th>
<th style={{padding:"10px"}}>Facility Name</th>
<th style={{padding:"10px"}}>Address</th>
<th style={{padding:"10px"}}>Authorization No.</th>
<th style={{padding:"10px"}}>Edit</th>
<th style={{padding:"10px"}}>Delete</th>

</tr>

</thead>

<tbody>

{(profile.disposal_facilities || []).map((item:any)=>(

<tr
key={item.id}
style={{
borderBottom:"1px solid #ddd",
}}
>

<td style={{padding:"10px"}}>{item.facility_type}</td>

<td style={{padding:"10px"}}>{item.facility_name}</td>

<td style={{padding:"10px"}}>{item.address}</td>

<td style={{padding:"10px"}}>{item.authorization_no}</td>

<td style={{padding:"10px"}}>

<button
type="button"
disabled={!isEditing}
onClick={()=>editDisposalFacility(item)}
style={{
background:"#2563eb",
color:"#fff",
border:"none",
padding:"6px 14px",
borderRadius:"6px",
cursor:"pointer",
}}
>

Edit

</button>

</td>

<td style={{padding:"10px"}}>

<button
type="button"
disabled={!isEditing}
onClick={()=>deleteDisposalFacility(item.id)}
style={{
background:"#dc2626",
color:"#fff",
border:"none",
padding:"6px 14px",
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
</div>
);
}
