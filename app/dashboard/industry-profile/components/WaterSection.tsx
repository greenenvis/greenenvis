export default function WaterSection({
  profile,
  setProfile,
  isEditing,
}: any) {
  const waterSources = [
    "GIDC",
    "Borewell",
    "Tanker",
    "River",
    "Canal",
    "Surface Water",
    "Recycled Water",
    "Other",
  ];

  const handleWaterSource = (source: string) => {
    const list = profile.water_source || [];

    if (list.includes(source)) {
      setProfile({
        ...profile,
        water_source: list.filter((x: string) => x !== source),
      });
    } else {
      setProfile({
        ...profile,
        water_source: [...list, source],
      });
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "25px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          color: "#166534",
          marginBottom: "25px",
        }}
      >
        💧 Water Requirement & Water Balance
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
                width: "250px",
                padding: "12px",
                fontWeight: "bold",
                verticalAlign: "top",
              }}
            >
              Water Source
            </td>

            <td style={{ padding: "12px" }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                {waterSources.map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      disabled={!isEditing}
                      checked={(profile.water_source || []).includes(item)}
                      onChange={() => handleWaterSource(item)}
                    />{" "}
                    {item}
                  </label>
                ))}
              </div>
            </td>
          </tr>

          {(profile.water_source || []).includes("Other") && (
            <tr>
              <td
                style={{
                  padding: "12px",
                  fontWeight: "bold",
                }}
              >
                Other Source
              </td>

              <td style={{ padding: "12px" }}>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profile.other_water_source || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      other_water_source: e.target.value,
                    })
                  }
                  placeholder="Enter Water Source"
                  style={{
                    width: "320px",
                    padding: "10px",
                  }}
                />
              </td>
            </tr>
          )}

          <tr>
            <td
              style={{
                padding: "12px",
                fontWeight: "bold",
              }}
            >
              Fresh Water Requirement (KLD)
            </td>

            <td style={{ padding: "12px" }}>
              <input
                type="number"
                disabled={!isEditing}
                value={profile.fresh_water_requirement}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    fresh_water_requirement: e.target.value,
                  })
                }
                placeholder="0.00"
                style={{
                  width: "180px",
                  padding: "10px",
                }}
              />
            </td>
          </tr>
<tr>
  <td
    style={{
      padding: "12px",
      fontWeight: "bold",
      verticalAlign: "top",
    }}
  >
    Water Consumption (KLD)
  </td>

  <td style={{ padding: "12px" }}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 250px)",
        gap: "12px",
      }}
    >

      {[
        ["Domestic", "domestic_consumption"],
        ["Industrial", "industrial_consumption"],
        ["Boiler", "boiler_consumption"],
        ["Cooling", "cooling_consumption"],
        ["Gardening", "gardening_consumption"],
        ["Construction", "construction_consumption"],
        ["Other", "other_consumption"],
      ].map(([label, key]) => (
        <div key={key}>
          <label
            style={{
              display: "block",
              marginBottom: "4px",
              fontWeight: 500,
            }}
          >
            {label}
          </label>

          <input
            type="number"
            disabled={!isEditing}
            value={profile[key] || ""}
            onChange={(e) => {
              const updated = {
                ...profile,
                [key]: e.target.value,
              };

  updated.total_consumption = (

  Number(updated.domestic_consumption || 0) +
  Number(updated.industrial_consumption || 0) +
  Number(updated.boiler_consumption || 0) +
  Number(updated.cooling_consumption || 0) +
  Number(updated.gardening_consumption || 0) +
  Number(updated.construction_consumption || 0) +
  Number(updated.other_consumption || 0)
)
.toFixed(3);

              setProfile(updated);
            }}
            style={{
              width: "180px",
              padding: "10px",
            }}
          />
        </div>
      ))}

    </div>
  </td>
</tr>

<tr>
  <td
    style={{
      padding: "12px",
      fontWeight: "bold",
    }}
  >
    Total Water Consumption (KLD)
  </td>

  <td style={{ padding: "12px" }}>
    <input
      type="number"
      readOnly
      value={profile.total_consumption}
      style={{
        width: "180px",
        padding: "10px",
        background: "#f3f4f6",
        fontWeight: "bold",
      }}
    />
  </td>
</tr>

<tr>
  <td
    style={{
      padding: "12px",
      fontWeight: "bold",
      verticalAlign: "top",
    }}
  >
    Wastewater Generation (KLD)
  </td>

  <td style={{ padding: "12px" }}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2,250px)",
        gap: "12px",
      }}
    >
      {[
        ["Domestic", "domestic_wastewater"],
        ["Industrial", "industrial_wastewater"],
        ["Cooling Blowdown", "cooling_blowdown"],
        ["Boiler Blowdown", "boiler_blowdown"],
        ["RO Reject", "ro_reject"],
        ["Other", "other_wastewater"],
      ].map(([label, key]) => (
        <div key={key}>
          <label
            style={{
              display: "block",
              marginBottom: "4px",
              fontWeight: 500,
            }}
          >
            {label}
          </label>

          <input
            type="number"
            disabled={!isEditing}
            value={profile[key] || ""}
            onChange={(e) => {
              const updated = {
                ...profile,
                [key]: e.target.value,
              };

              updated.total_wastewater =
                (
                  Number(updated.domestic_wastewater || 0) +
                  Number(updated.industrial_wastewater || 0) +
                  Number(updated.cooling_blowdown || 0) +
                  Number(updated.boiler_blowdown || 0) +
                  Number(updated.ro_reject || 0) +
                  Number(updated.other_wastewater || 0)
                ).toString();

              setProfile(updated);
            }}
            style={{
              width: "180px",
              padding: "10px",
            }}
          />
        </div>
      ))}
    </div>
  </td>
</tr>

<tr>
  <td
    style={{
      padding: "12px",
      fontWeight: "bold",
    }}
  >
    Total Wastewater (KLD)
  </td>

  <td style={{ padding: "12px" }}>
    <input
      type="number"
      readOnly
      value={profile.total_wastewater}
      style={{
        width: "180px",
        padding: "10px",
        background: "#f3f4f6",
        fontWeight: "bold",
      }}
    />
  </td>
</tr>
{/* ============================
   Treatment System
============================ */}

<tr>
  <td
    style={{
      padding: "12px",
      fontWeight: "bold",
      verticalAlign: "top",
    }}
  >
    Treatment System
  </td>

  <td style={{ padding: "12px" }}>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "18px",
      }}
    >
      {[
        ["ETP","etp"],
        ["STP","stp"],
        ["RO","ro"],
        ["MEE","mee"],
        ["ATFD","atfd"],
        ["ZLD","zld"],
      ].map(([label,key])=>(
        <label key={key}>
          <input
            type="checkbox"
            disabled={!isEditing}
            checked={profile[key]}
            onChange={(e)=>
              setProfile({
                ...profile,
                [key]:e.target.checked,
              })
            }
          />{" "}
          {label}
        </label>
      ))}
    </div>
  </td>
</tr>
<tr>

<td
style={{
padding:"12px",
fontWeight:"bold",
verticalAlign:"top",
}}
>

Final Wastewater Discharge Point

</td>

<td style={{padding:"12px"}}>

<select
disabled={!isEditing}
value={profile.final_discharge_point || ""}
onChange={(e)=>
setProfile({
...profile,
final_discharge_point:e.target.value,
})
}
style={{
width:"320px",
padding:"10px",
}}
>

<option value="">Select</option>

<option>CETP</option>
<option>ETP Outlet</option>
<option>STP Outlet</option>
<option>ZLD</option>
<option>Sent to Other Industry</option>
<option>Municipal Sewer</option>
<option>Natural Drain</option>
<option>Evaporation Pond</option>
<option>Reuse in Process</option>
<option>Reuse in Gardening</option>
<option>Other</option>

</select>

{profile.final_discharge_point==="Other" && (

<input
type="text"
disabled={!isEditing}
placeholder="Enter Final Discharge Point"
value={profile.custom_final_discharge_point || ""}
onChange={(e)=>
setProfile({
...profile,
custom_final_discharge_point:e.target.value,
})
}
style={{
marginTop:"10px",
width:"320px",
padding:"10px",
}}
/>

)}
{profile.final_discharge_point==="Sent to Other Industry" && (

<div
style={{
marginTop:"12px",
display:"grid",
gridTemplateColumns:"repeat(2,320px)",
gap:"12px",
}}
>

<input
type="text"
disabled={!isEditing}
placeholder="Industry Name"
value={profile.other_industry_name || ""}
onChange={(e)=>
setProfile({
...profile,
other_industry_name:e.target.value,
})
}
style={{
padding:"10px",
}}
/>

<input
type="text"
disabled={!isEditing}
placeholder="Industry Address"
value={profile.other_industry_address || ""}
onChange={(e)=>
setProfile({
...profile,
other_industry_address:e.target.value,
})
}
style={{
padding:"10px",
}}
/>

</div>

)}
{profile.final_discharge_point==="CETP" && (

<div
style={{
marginTop:"12px",
}}
>

<input
type="text"
disabled={!isEditing}
placeholder="Enter CETP Name"
value={profile.cetp_name || ""}
onChange={(e)=>
setProfile({
...profile,
cetp_name:e.target.value,
})
}
style={{
width:"320px",
padding:"10px",
}}
/>

</div>

)}

</td>

</tr>

{/* ============================
   Water Reuse
============================ */}

<tr>
  <td
    style={{
      padding:"12px",
      fontWeight:"bold",
      verticalAlign:"top",
    }}
  >
    Water Reuse (KLD)
  </td>

  <td style={{padding:"12px"}}>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(2,250px)",
gap:"12px",
}}
>

{[
["Garden","reuse_garden"],
["Cooling","reuse_cooling"],
["Boiler","reuse_boiler"],
["Process","reuse_process"],
["Flushing","reuse_flushing"],
["Other","reuse_other"],
].map(([label,key])=>(

<div key={key}>

<label
style={{
display:"block",
marginBottom:"4px",
fontWeight:500,
}}
>
{label}
</label>

<input
type="number"
disabled={!isEditing}
value={profile[key] || ""}
onChange={(e)=>{

const updated={
...profile,
[key]:e.target.value,
};

updated.total_reuse = (
  Number(updated.reuse_garden || 0) +
  Number(updated.reuse_cooling || 0) +
  Number(updated.reuse_boiler || 0) +
  Number(updated.reuse_process || 0) +
  Number(updated.reuse_flushing || 0) +
  Number(updated.reuse_other || 0)
)
.toFixed(3);

updated.final_discharge = Math.max(
  0,
  Number(updated.total_wastewater || 0) -
  Number(updated.total_reuse || 0)
).toFixed(3);

setProfile(updated);

}}
style={{
width:"180px",
padding:"10px",
}}
/>

</div>

))}

</div>

  </td>
</tr>

<tr>
<td
style={{
padding:"12px",
fontWeight:"bold",
}}
>
Total Reuse (KLD)
</td>

<td style={{padding:"12px"}}>

<input
readOnly
value={profile.total_reuse}
style={{
width:"180px",
padding:"10px",
background:"#f3f4f6",
fontWeight:"bold",
}}
/>

</td>
</tr>

{/* ============================
   Water Balance Summary
============================ */}

<tr>
<td
style={{
padding:"12px",
fontWeight:"bold",
verticalAlign:"top",
}}
>
Final Water Balance
</td>

<td style={{padding:"12px"}}>

<div
style={{
background:"#f8fafc",
border:"1px solid #d1d5db",
borderRadius:"10px",
padding:"20px",
width:"420px",
lineHeight:"2",
}}
>

<div>
Fresh Water :
<b> {profile.fresh_water_requirement || 0} KLD</b>
</div>

<div>
Consumption :
<b> {profile.total_consumption || 0} KLD</b>
</div>

<div>
Wastewater :
<b> {profile.total_wastewater || 0} KLD</b>
</div>

<div>
Reuse :
<b> {profile.total_reuse || 0} KLD</b>
</div>

<hr />

<div
style={{
fontSize:"18px",
color:"#166534",
fontWeight:"bold",
}}
>
Final Discharge :
{profile.final_discharge || 0} KLD
</div>

</div>

</td>
</tr>
        </tbody>
      </table>
    </div>
  );
}