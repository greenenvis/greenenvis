export default function LoginPage() {
  return (
    <div
      style={{
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
            color: "#166534",
            textAlign: "center",
          }}
        >
          Client Login
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Welcome to GreenEnvis Client Portal
        </p>

        <div style={{ display: "grid", gap: "20px" }}>
          <input
            type="email"
            placeholder="Enter Email Address"
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Enter Password"
            style={inputStyle}
          />

          <button
            style={{
              background: "#16a34a",
              color: "#ffffff",
              border: "none",
              padding: "16px",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Need support? Contact GreenEnvis Team
          </p>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "16px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "16px",
  outline: "none",
};