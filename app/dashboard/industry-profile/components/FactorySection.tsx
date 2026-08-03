export default function FactorySection({
  profile,
  setProfile,
  isEditing,
}: any) {
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
          color: "#166534",
          marginBottom: "20px",
        }}
      >
        🏭 Factory Details
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
                padding: "14px",
                width: "300px",
                fontWeight: "bold",
              }}
            >
              Open Area (Sq. meter)
            </td>

            <td>
              <input
                type="number"
                disabled={!isEditing}
                value={profile.open_area || ""}
               onChange={(e) => {
  const updated = {
    ...profile,
    open_area: e.target.value,
  };

  updated.total_area =
    Number(updated.open_area || 0) +
    Number(updated.built_up_area || 0) +
    Number(updated.greenbelt_area || 0);

  setProfile(updated);
}}
                style={{
                  width: "250px",
                  padding: "10px",
                }}
              />
            </td>
          </tr>

          <tr>
            <td
              style={{
                padding: "14px",
                fontWeight: "bold",
              }}
            >
              Built-up Area (Sq. meter)
            </td>

            <td>
              <input
                type="number"
                disabled={!isEditing}
                value={profile.built_up_area || ""}
                onChange={(e) => {
  const updated = {
    ...profile,
    built_up_area: e.target.value,
  };

  updated.total_area =
    Number(updated.open_area || 0) +
    Number(updated.built_up_area || 0) +
    Number(updated.greenbelt_area || 0);

  setProfile(updated);
}}
                style={{
                  width: "250px",
                  padding: "10px",
                }}
              />
            </td>
          </tr>

          <tr>
            <td
              style={{
                padding: "14px",
                fontWeight: "bold",
              }}
            >
              Greenbelt Area (Sq. meter)
            </td>

            <td>
              <input
                type="number"
                disabled={!isEditing}
                value={profile.greenbelt_area || ""}
                onChange={(e) => {
  const updated = {
    ...profile,
    greenbelt_area: e.target.value,
  };

  updated.total_area =
    Number(updated.open_area || 0) +
    Number(updated.built_up_area || 0) +
    Number(updated.greenbelt_area || 0);

  setProfile(updated);
}}
                style={{
                  width: "250px",
                  padding: "10px",
                }}
              />
            </td>
          </tr>

          <tr>
            <td
              style={{
                padding: "14px",
                fontWeight: "bold",
              }}
            >
              Total Area (Sq. meter)
            </td>

            <td>
              <input
                type="number"
                readOnly
                value={profile.total_area || 0}
                
                style={{
                  width: "250px",
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
      padding: "14px",
      fontWeight: "bold",
    }}
  >
    Total Employees
  </td>

  <td>
    <input
  type="number"
  disabled={!isEditing}
  value={profile.total_employees || ""}
  onChange={(e) =>
    setProfile({
      ...profile,
      total_employees: e.target.value,
    })
  }
  style={{
    width: "250px",
    padding: "10px",
  }}
   />
  </td>
</tr>

<tr>
  <td
    style={{
      padding: "14px",
      fontWeight: "bold",
    }}
  >
    Working Shift
  </td>

  <td>
    <select
      disabled={!isEditing}
      value={profile.working_shift || ""}
      onChange={(e) =>
        setProfile({
          ...profile,
          working_shift: e.target.value,
        })
      }
      style={{
        width: "250px",
        padding: "10px",
      }}
    >
      <option value="">Select Shift</option>
      <option value="1">1 Shift</option>
      <option value="2">2 Shift</option>
      <option value="3">3 Shift</option>
    </select>
  </td>
</tr>

<tr>
  <td
    style={{
      padding: "14px",
      fontWeight: "bold",
    }}
  >
    Working Days in Year
  </td>

  <td>
    <input
      type="number"
      disabled={!isEditing}
      value={profile.working_days || ""}
      onChange={(e) =>
        setProfile({
          ...profile,
          working_days: e.target.value,
        })
      }
      style={{
        width: "250px",
        padding: "10px",
      }}
    />
  </td>
</tr>
        </tbody>
      </table>

    </div>
  );
}