"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function IndustryProfilePage() {
  const [isEditing, setIsEditing] = useState(true);
  const [profile, setProfile] = useState({
    industry_name: "",
    industry_address: "",
    gst_number: "",
    industry_category: "",
    manufacturing_activity: "",
    hazardous_waste: false,
    biomedical_waste: false,
    plastic_epr: false,
    ewaste_epr: false,
    used_oil_epr: false,
    battery_epr: false,
    tyre_epr: false,
    cgwa_noc: false,
    factory_license: false,
    fire_noc: false,
  });

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("industry_profile")
      .select("*")
      .limit(1)
      .single();

    if (data) {
  setProfile(data);
  setIsEditing(false);
} else {
  setIsEditing(true);
}
  };

  useEffect(() => {
    fetchProfile();
  }, []);

 const saveProfile = async () => {
  const { data: existing } = await supabase
    .from("industry_profile")
    .select("id")
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("industry_profile")
      .update(profile)
      .eq("id", existing.id);

    if (error) {
      alert(error.message);
      return;
    }
  } else {
    const { error } = await supabase
      .from("industry_profile")
      .insert([profile]);

    if (error) {
      alert(error.message);
      return;
    }
  }

  setIsEditing(false);
  alert("Profile Saved Successfully");
};

  return (
    <div
      style={{
        background: "#f4f7fb",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "25px",
          marginBottom: "25px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#166534",
          }}
        >
          Industry Profile
        </h1>

        <p
          style={{
            color: "#666",
            marginTop: "8px",
          }}
        >
          Complete your profile once. GreenEnvis will automatically determine
          all applicable compliances, reminders and renewals.
        </p>
      </div>

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
            color: "#166534",
          }}
        >
          Basic Industry Information
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
  <tr>
    <td style={{ padding: "14px", width: "260px", fontWeight: "bold" }}>
      Industry Name *
    </td>
    <td>
      <input
        type="text"
        disabled={!isEditing}
        value={profile.industry_name}
        onChange={(e) =>
          setProfile({
            ...profile,
            industry_name: e.target.value,
          })
        }
        placeholder="ABC Industries Pvt. Ltd."
        style={{ width: "100%", padding: "10px" }}
      />
    </td>
  </tr>

  <tr>
    <td style={{ padding: "14px", fontWeight: "bold" }}>
      Industry Address *
    </td>
    <td>
      <textarea
      disabled={!isEditing}
        rows={3}
        value={profile.industry_address}
        onChange={(e) =>
          setProfile({
            ...profile,
            industry_address: e.target.value,
          })
        }
        placeholder="Enter complete industry address..."
        style={{
          width: "100%",
          padding: "10px",
          resize: "vertical",
        }}
      />
    </td>
  </tr>

  <tr>
    <td style={{ padding: "14px", fontWeight: "bold" }}> 
      GST Number
    </td>
    <td>
      <input
        type="text"
        disabled={!isEditing}
        value={profile.gst_number}
        onChange={(e) =>
          setProfile({
            ...profile,
            gst_number: e.target.value,
          })
        }
        placeholder="24ABCDE1234F1Z5"
        style={{ width: "300px", padding: "10px" }}
      />
    </td>
  </tr>

  <tr>
    <td style={{ padding: "14px", fontWeight: "bold" }}>
      Industry Category *
    </td>
    <td>
      <select
        disabled={!isEditing}
        value={profile.industry_category}
        onChange={(e) =>
          setProfile({
            ...profile,
            industry_category: e.target.value,
          })
        }
        style={{
          width: "220px",
          padding: "10px",
        }}
      >
        <option value="">Select Category</option>
        <option>Green</option>
        <option>Orange</option>
        <option>Red</option>
      </select>
    </td>
  </tr>

  <tr>
    <td style={{ padding: "14px", fontWeight: "bold" }}>
      Manufacturing Activity *
    </td>
    <td>
      <input
        type="text"
        disabled={!isEditing}
        value={profile.manufacturing_activity}
        onChange={(e) =>
          setProfile({
            ...profile,
            manufacturing_activity: e.target.value,
          })
        }
        placeholder="Chemical / Pharma / Engineering / Plastic..."
        style={{ width: "100%", padding: "10px" }}
      />
    </td>
  </tr>

  <tr>
    <td style={{ padding: "14px", fontWeight: "bold" }}>
      Water Source
    </td>
    <td>
      <label><input type="checkbox" disabled={!isEditing} /> GIDC&nbsp;&nbsp;</label>
      <label><input type="checkbox" disabled={!isEditing} /> Borewell&nbsp;&nbsp;</label>
      <label><input type="checkbox" disabled={!isEditing} /> Tanker&nbsp;&nbsp;</label>
      <label><input type="checkbox" disabled={!isEditing} /> River</label>
    </td>
  </tr>
    <tr>
    <td style={{ padding: "14px", fontWeight: "bold" }}>
      Hazardous Waste Generated
    </td>
    <td>
      <input
        type="checkbox"
        disabled={!isEditing}
        checked={profile.hazardous_waste}
        onChange={(e) =>
          setProfile({
            ...profile,
            hazardous_waste: e.target.checked,
          })
        }
      />{" "}
      Yes
    </td>
  </tr>

  <tr>
    <td style={{ padding: "14px", fontWeight: "bold" }}>
      Biomedical Waste
    </td>
    <td>
      <input
        type="checkbox"
        disabled={!isEditing}
        checked={profile.biomedical_waste}
        onChange={(e) =>
          setProfile({
            ...profile,
            biomedical_waste: e.target.checked,
          })
        }
      />{" "}
      Yes
    </td>
  </tr>

  <tr>
    <td style={{ padding: "14px", fontWeight: "bold" }}>
      Plastic EPR Applicable
    </td>
    <td>
      <input
        type="checkbox"
        disabled={!isEditing}
        checked={profile.plastic_epr}
        onChange={(e) =>
          setProfile({
            ...profile,
            plastic_epr: e.target.checked,
          })
        }
      />{" "}
      Yes
    </td>
  </tr>

  <tr>
    <td style={{ padding: "14px", fontWeight: "bold" }}>
      E-Waste EPR Applicable
    </td>
    <td>
      <input
        type="checkbox"
        disabled={!isEditing}
        checked={profile.ewaste_epr}
        onChange={(e) =>
          setProfile({
            ...profile,
            ewaste_epr: e.target.checked,
          })
        }
      />{" "}
      Yes
    </td>
  </tr>

  <tr>
    <td style={{ padding: "14px", fontWeight: "bold" }}>
      Used Oil EPR Applicable
    </td>
    <td>
      <input
        type="checkbox"
        disabled={!isEditing}
        checked={profile.used_oil_epr}
        onChange={(e) =>
          setProfile({
            ...profile,
            used_oil_epr: e.target.checked,
          })
        }
      />{" "}
      Yes
    </td>
  </tr>

  <tr>
    <td style={{ padding: "14px", fontWeight: "bold" }}>
      Battery EPR Applicable
    </td>
    <td>
      <input
        type="checkbox"
        disabled={!isEditing}
        checked={profile.battery_epr}
        onChange={(e) =>
          setProfile({
            ...profile,
            battery_epr: e.target.checked,
          })
        }
      />{" "}
      Yes
    </td>
  </tr>

  <tr>
    <td style={{ padding: "14px", fontWeight: "bold" }}>
      Tyre EPR Applicable
    </td>
    <td>
      <input
        type="checkbox"
        disabled={!isEditing}
        checked={profile.tyre_epr}
        onChange={(e) =>
          setProfile({
            ...profile,
            tyre_epr: e.target.checked,
          })
        }
      />{" "}
      Yes
    </td>
  </tr>

  <tr>
    <td style={{ padding: "14px", fontWeight: "bold" }}>
      CGWA NOC Required
    </td>
    <td>
      <input
        type="checkbox"
        disabled={!isEditing}
        checked={profile.cgwa_noc}
        onChange={(e) =>
          setProfile({
            ...profile,
            cgwa_noc: e.target.checked,
          })
        }
      />{" "}
      Yes
    </td>
  </tr>

  <tr>
    <td style={{ padding: "14px", fontWeight: "bold" }}>
      Factory License Required
    </td>
    <td>
      <input
        type="checkbox"
        disabled={!isEditing}
        checked={profile.factory_license}
        onChange={(e) =>
          setProfile({
            ...profile,
            factory_license: e.target.checked,
          })
        }
      />{" "}
      Yes
    </td>
  </tr>

  <tr>
    <td style={{ padding: "14px", fontWeight: "bold" }}>
      Fire NOC Required
    </td>
    <td>
      <input
        type="checkbox"
        disabled={!isEditing}
        checked={profile.fire_noc}
        onChange={(e) =>
          setProfile({
            ...profile,
            fire_noc: e.target.checked,
          })
        }
      />{" "}
      Yes
    </td>
  </tr>
</tbody>
        </table>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
{isEditing ? (
  <button
    onClick={saveProfile}
    style={{
      background: "#166534",
      color: "#fff",
      border: "none",
      padding: "12px 30px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "bold",
    }}
  >
    Save Industry Profile
  </button>
) : (
  <button
    onClick={() => setIsEditing(true)}
    style={{
      background: "#2563eb",
      color: "#fff",
      border: "none",
      padding: "12px 30px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "bold",
    }}
  >
    Edit Profile
  </button>
)}
        </div>
      </div>
    </div>
  );
}