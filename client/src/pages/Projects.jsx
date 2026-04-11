import { GOLD, MID, PROJECTS } from "../constants/data.js";

export default function Projects({ setPage }) {
  return (
    <div style={{ padding: "60px 80px", animation: "fadeUp .5s ease" }}>
      <div style={{ marginBottom: 56 }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: GOLD, textTransform: "uppercase", marginBottom: 12 }}>Our Work</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, fontWeight: 700, color: MID }}>Completed Projects</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3 }}>
        {PROJECTS.map((p, i) => (
          <div key={p.title} className="scard" style={{ background: i % 2 === 0 ? MID : "#EDE8E0", padding: "44px 36px", boxShadow: "none", borderRadius: 0 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: GOLD, textTransform: "uppercase", marginBottom: 12 }}>{p.year} · {p.type}</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 21, color: i % 2 === 0 ? "#F5EEE6" : MID, fontWeight: 700, marginBottom: 18, lineHeight: 1.3 }}>{p.title}</h3>
            <div style={{ display: "flex", gap: 24 }}>
              {[["Location", p.location], ["Area", p.area]].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: 9, color: i % 2 === 0 ? "rgba(245,238,230,.3)" : "#aaa", letterSpacing: 1, textTransform: "uppercase" }}>{l}</div>
                  <div style={{ fontSize: 13, color: i % 2 === 0 ? "rgba(245,238,230,.75)" : MID, marginTop: 3, fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 60, background: `linear-gradient(135deg,${GOLD},#8B6A40)`, borderRadius: 20, padding: "48px 56px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, color: "#fff", fontWeight: 700, marginBottom: 6 }}>Have a project in mind?</h3>
          <p style={{ color: "rgba(255,255,255,.65)", fontSize: 14 }}>Free consultation. No obligation.</p>
        </div>
        <button onClick={() => setPage("contact")} className="btn" style={{ background: "#fff", color: "#8B6A40", padding: "14px 32px", borderRadius: 50, fontSize: 13, fontWeight: 700, letterSpacing: 1, boxShadow: "0 8px 24px rgba(0,0,0,.2)" }}>CONTACT US</button>
      </div>
    </div>
  );
}
