type Props = {
  profile: any;
  setProfile: any;
  isEditing: boolean;
};

export default function BasicSection({
  profile,
  setProfile,
  isEditing,
}: Props) {

return (
  <>
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
        value={profile.industry_name ?? ""}
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
        value={profile.industry_address ?? ""}
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
        value={profile.gst_number ?? ""}
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
    PAN Number
  </td>

  <td>
    <input
      type="text"
      disabled={!isEditing}
      value={profile.pan_number ?? ""}
      onChange={(e) =>
        setProfile({
          ...profile,
          pan_number: e.target.value,
        })
      }
      placeholder="ABCDE1234F"
      style={{
        width: "300px",
        padding: "10px",
      }}
    />
  </td>
</tr>

<tr>
  <td style={{ padding: "14px", fontWeight: "bold" }}>
    CIN Number (Optional)
  </td>

  <td>
    <input
      type="text"
      disabled={!isEditing}
      value={profile.cin_number ?? ""}
      onChange={(e) =>
        setProfile({
          ...profile,
          cin_number: e.target.value,
        })
      }
      placeholder="L12345GJ2025PTC000001"
      style={{
        width: "420px",
        padding: "10px",
      }}
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
        value={profile.industry_category ?? ""}
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
        value={profile.manufacturing_activity ?? ""}
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
    Factory Establishment Year
  </td>

  <td>
    <input
      type="number"
      disabled={!isEditing}
     value={profile.factory_establishment_year ?? ""}
      onChange={(e) =>
        setProfile({
          ...profile,
          factory_establishment_year: e.target.value,
        })
      }
      placeholder="2023"
      style={{
        width: "180px",
        padding: "10px",
      }}
    />
  </td>
</tr>
</tbody>
</table>
</div>
 </>
 );
 }