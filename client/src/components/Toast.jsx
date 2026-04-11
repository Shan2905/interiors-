import { GOLD, MID } from "../constants/data.js";

export default function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div style={{
      position: "fixed", top: 24, right: 24, zIndex: 9999,
      background: toast.type === "error" ? "#C0392B" : MID,
      color: "#fff", padding: "14px 24px", borderRadius: 8,
      fontSize: 13, fontWeight: 500,
      boxShadow: "0 16px 48px rgba(0,0,0,.3)",
      animation: "fadeUp .3s ease forwards",
      display: "flex", alignItems: "center", gap: 10,
    }}>
      <span style={{ fontSize: 16 }}>{toast.type === "error" ? "⚠" : "✓"}</span>
      {toast.msg}
    </div>
  );
}
