type Props = {
  profile: any;
  setProfile: any;
  isEditing: boolean;
};

export default function ContactSection({
  profile,
  setProfile,
  isEditing,
}: Props) {

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
      👤 Contact Information
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
          Contact Person
        </td>

        <td>
          <input
            type="text"
            disabled={!isEditing}
            value={profile.contact_person || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                contact_person: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
            }}
          />
        </td>
      </tr>

      <tr>
        <td style={{ padding: "14px", fontWeight: "bold" }}>
          Designation
        </td>

        <td>
          <input
            type="text"
            disabled={!isEditing}
            value={profile.designation || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                designation: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
            }}
          />
        </td>
      </tr>

      <tr>
        <td style={{ padding: "14px", fontWeight: "bold" }}>
          Mobile Number
        </td>

        <td>
          <input
            type="text"
            disabled={!isEditing}
            value={profile.mobile_no || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                mobile_no: e.target.value,
              })
            }
            style={{
              width: "300px",
              padding: "10px",
            }}
          />
        </td>
      </tr>

      <tr>
        <td style={{ padding: "14px", fontWeight: "bold" }}>
          Email Address
        </td>

        <td>
          <input
            type="email"
            disabled={!isEditing}
            value={profile.email || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                email: e.target.value,
              })
            }
            style={{
              width: "400px",
              padding: "10px",
            }}
          />
        </td>
      </tr>

      <tr>
        <td style={{ padding: "14px", fontWeight: "bold" }}>
          Alternate Mobile
        </td>

        <td>
          <input
            type="text"
            disabled={!isEditing}
            value={profile.alternate_mobile || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                alternate_mobile: e.target.value,
              })
            }
            style={{
              width: "300px",
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