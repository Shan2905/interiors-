import { GOLD, MID } from "../constants/data.js";

export default function Navbar({ page, setPage, cart, setCartOpen }) {
  return (
    <nav style={{
      background: "rgba(15,15,15,.95)", backdropFilter: "blur(20px)",
      position: "sticky", top: 0, zIndex: 100,
      padding: "0 48px", height: 68,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: "1px solid rgba(196,168,130,.15)",
    }}>
      <div onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: "#F5EEE6", letterSpacing: 2 }}>YEDUKONDALU</div>
        <div style={{ fontSize: 8, letterSpacing: 5, color: GOLD, textTransform: "uppercase", marginTop: 1 }}>Interiors & Paints</div>
      </div>

      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        {[["home","Home"],["services","Services"],["projects","Projects"],["payment","Payment"],["contact","Contact"]].map(([key, label]) => (
          <span key={key} className="navlink" onClick={() => setPage(key)} style={{
            fontSize: 12, fontWeight: 500, letterSpacing: .5,
            color: page === key ? GOLD : "rgba(255,255,255,.55)",
            borderBottom: page === key ? `1.5px solid ${GOLD}` : "none",
            paddingBottom: page === key ? 2 : 0,
            transition: "all .2s",
          }}>
            {label}
          </span>
        ))}
        <span className="navlink" onClick={() => setPage("admin")} style={{ fontSize: 11, color: "rgba(255,255,255,.2)" }}>Admin</span>

        <button id="cart-btn" onClick={() => setCartOpen(true)} className="btn" style={{
          display: "flex", alignItems: "center", gap: 8,
          background: `linear-gradient(135deg,${GOLD},#A8885E)`,
          color: "#fff", padding: "9px 20px", borderRadius: 50,
          fontSize: 12, fontWeight: 600, letterSpacing: .5,
          boxShadow: "0 4px 20px rgba(196,168,130,.4)",
        }}>
          Enquiry{cart.length > 0 && (
            <span style={{
              background: "#fff", color: MID, borderRadius: "50%",
              width: 18, height: 18, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 10, fontWeight: 700,
            }}>{cart.length}</span>
          )}
        </button>
      </div>
    </nav>
  );
}
