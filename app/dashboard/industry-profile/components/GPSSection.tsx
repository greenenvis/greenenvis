type Props = {
  profile: any;
  setProfile: any;
  isEditing: boolean;
};

export default function GPSSection({
  profile,
  setProfile,
  isEditing,
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

📍 GPS & Location

</h2>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(2,1fr)",
gap:"20px",
alignItems:"start",
}}
>
<div>

<label>Latitude</label>

<input
type="text"
disabled={!isEditing}
value={profile.latitude}
onChange={(e)=>
setProfile({
...profile,
latitude:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label>Longitude</label>

<input
type="text"
disabled={!isEditing}
value={profile.longitude}
onChange={(e)=>
setProfile({
...profile,
longitude:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label>Survey No.</label>

<input
type="text"
disabled={!isEditing}
value={profile.survey_no}
onChange={(e)=>
setProfile({
...profile,
survey_no:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label>Village</label>

<input
type="text"
disabled={!isEditing}
value={profile.village}
onChange={(e)=>
setProfile({
...profile,
village:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>
<div>

<label>Taluka</label>

<input
type="text"
disabled={!isEditing}
value={profile.taluka}
onChange={(e)=>
setProfile({
...profile,
taluka:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label>District</label>

<input
type="text"
disabled={!isEditing}
value={profile.district}
onChange={(e)=>
setProfile({
...profile,
district:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label>State</label>

<input
type="text"
disabled={!isEditing}
value={profile.state}
onChange={(e)=>
setProfile({
...profile,
state:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>

<div>

<label>Pincode</label>

<input
type="text"
disabled={!isEditing}
value={profile.pincode}
onChange={(e)=>
setProfile({
...profile,
pincode:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>

</div>
<div
style={{
padding:"16px",
border:"1px solid #e5e7eb",
borderRadius:"12px",
background:"#f9fafb",
}}
>
<label style={{display:"block", fontWeight:600, marginBottom:"8px"}}>Company Logo Upload</label>
<input
type="file"
accept="image/*"
disabled={!isEditing}
onChange={(e)=>{
const file=e.target.files?.[0];
if(!file)return;

const reader=new FileReader();

reader.onload=()=>{
setProfile({
...profile,
company_logo_upload:reader.result,
});
};

reader.readAsDataURL(file);
}}
style={{width:"100%", marginBottom:"10px"}}
/>

<label style={{display:"block", fontWeight:600, marginBottom:"8px"}}>Company Logo URL</label>
<input
type="text"
placeholder="https://example.com/logo.png"
disabled={!isEditing}
value={profile.company_logo || ""}
onChange={(e)=>
setProfile({
...profile,
company_logo:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
marginBottom:"10px",
}}
/>

{(profile.company_logo_upload || profile.company_logo) && (
  <div
    style={{
      marginTop: "10px",
      padding: "10px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      background: "#ffffff",
      textAlign: "center",
    }}
  >
    <img
      src={profile.company_logo_upload || profile.company_logo}
      alt="Company Logo"
      style={{
        maxWidth: "100%",
        maxHeight: "90px",
        objectFit: "contain",
      }}
    />

    {isEditing && (
      <button
        type="button"
        onClick={() =>
          setProfile({
            ...profile,
            company_logo_upload: "",
            company_logo: "",
          })
        }
        style={{
          marginTop: "12px",
          background: "#dc2626",
          color: "#fff",
          border: "none",
          padding: "8px 18px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Delete Logo
      </button>
    )}
  </div>
)}

</div>

<div
style={{
padding:"16px",
border:"1px solid #e5e7eb",
borderRadius:"12px",
background:"#f9fafb",
}}
>
</div>
<div
style={{
gridColumn:"1 / span 2",
}}
>

<label>Google Map Link</label>

<input
type="text"
placeholder="https://maps.google.com/..."
disabled={!isEditing}
value={profile.google_map_link}
onChange={(e)=>
setProfile({
...profile,
google_map_link:e.target.value,
})
}
style={{
width:"100%",
padding:"10px",
}}
/>
{profile.google_map_link && (

<div
style={{
gridColumn:"1 / span 2",
marginTop:"10px",
}}
>

<a
href={profile.google_map_link}
target="_blank"
rel="noreferrer"
style={{
color:"#2563eb",
fontWeight:"bold",
textDecoration:"none",
}}
>

📍 Open Location in Google Maps

</a>

</div>

)}
</div>

  </div>

</div>

);
}