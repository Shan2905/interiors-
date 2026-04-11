import { useState } from "react";
import { GOLD, MID, SERVICES, CATEGORIES } from "../constants/data.js";

export default function Services({ addToCart }) {
  const [selCat, setSelCat] = useState("All");
  const filtered = SERVICES.filter(s => selCat === "All" || s.category === selCat);

  return (
    <div style={{ padding: "60px 80px", animation: "fadeUp .5s ease" }}>
      <div style={{ marginBottom: 50 }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: GOLD, textTransform: "uppercase", marginBottom: 12 }}>Catalogue</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, fontWeight: 700, color: MID }}>All Services</h2>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 40, flexWrap: "wrap" }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setSelCat(c)} className="btn" style={{
            padding: "9px 20px",
            background: selCat === c ? MID : "#fff",
            color: selCat === c ? "#fff" : "#555",
            border: `1.5px solid ${selCat === c ? MID : "#DDD8D0"}`,
            borderRadius: 50, fontSize: 12, fontWeight: 500,
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
        {filtered.map(s => (
          <div key={s.id} className="scard" style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
            <div style={{ height: 6, background: `linear-gradient(90deg,${s.accent},${s.accent}66)` }} />
            <div style={{ padding: "24px 22px" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: s.accent + "15", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <div style={{ width: 20, height: 20, borderRadius: 5, background: s.accent }} />
              </div>
              <div style={{ fontSize: 9, color: s.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{s.category}</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: MID, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 12, color: "#777", lineHeight: 1.75, marginBottom: 14 }}>{s.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 16 }}>
                {s.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: s.accent, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: "#666" }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ paddingTop: 14, borderTop: "1px solid #F0EBE3", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "#bbb", fontStyle: "italic" }}>Price on request</span>
                <button onClick={() => addToCart(s)} className="btn" style={{ padding: "8px 16px", background: s.accent, color: "#fff", borderRadius: 50, fontSize: 11, fontWeight: 600 }}>Enquire</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
