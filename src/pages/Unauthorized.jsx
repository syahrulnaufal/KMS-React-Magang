import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 50, textAlign: "center" }}>
      <h2 style={{ color: "#0b6b68", fontSize: "32px" }}>Akses Ditolak</h2>
      <p style={{ fontSize: "16px", color: "#444" }}>
        Kamu tidak punya hak akses ke halaman ini.
      </p>

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          border: "none",
          background: "#0b6b68",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Kembali ke Dashboard
      </button>

      <button
        onClick={() => navigate("/login")}
        style={{
          marginTop: 20,
          marginLeft: 10,
          padding: "10px 20px",
          border: "1px solid #0b6b68",
          background: "white",
          color: "#0b6b68",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Login Ulang
      </button>
    </div>
  );
}
