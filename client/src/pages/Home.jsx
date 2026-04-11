import { useEffect, useRef, useState } from "react";
import { GOLD, DARK, MID, SERVICES, PROJECTS } from "../constants/data.js";

export default function Home({ setPage, addToCart, loaded }) {
  const canvasRef = useRef(null);
  const [hovCard, setHovCard] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      o: Math.random() * 0.5 + 0.1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,168,130,${p.o})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div>
      {/* HERO */}
      <div style={{ background: DARK, minHeight: "92vh", display: "flex", alignItems: "center", padding: "0 80px", position: "relative", overflow: "hidden" }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .6 }} />
        <div style={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%) rotate(90deg)", fontFamily: "'Playfair Display',serif", fontSize: 180, fontWeight: 900, color: "rgba(196,168,130,.04)", whiteSpace: "nowrap", userSelect: "none", letterSpacing: 10 }}>INTERIORS</div>
        <div style={{ position: "absolute", right: "42%", top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom,transparent,rgba(196,168,130,.2),transparent)", transform: "rotate(15deg)", transformOrigin: "center" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 640 }}>
          <div className={loaded ? "fadeUp" : ""} style={{ opacity: loaded ? 1 : 0 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(196,168,130,.12)", border: "1px solid rgba(196,168,130,.25)", borderRadius: 50, padding: "6px 16px", marginBottom: 28 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, animation: "glow 2s infinite" }} />
              <span style={{ fontSize: 10, color: GOLD, letterSpacing: 3, textTransform: "uppercase" }}>Guntur · Andhra Pradesh</span>
            </div>
          </div>
          <h1 className={loaded ? "fadeUp s1" : ""} style={{ fontFamily: "'Playfair Display',serif", fontSize: 68, color: "#F5EEE6", lineHeight: 1.08, fontWeight: 900, marginBottom: 8, opacity: loaded ? 1 : 0 }}>We Paint</h1>
          <h1 className={loaded ? "fadeUp s2" : ""} style={{ fontFamily: "'Playfair Display',serif", fontSize: 68, color: GOLD, lineHeight: 1.08, fontWeight: 900, fontStyle: "italic", marginBottom: 8, opacity: loaded ? 1 : 0 }}>Your Dreams</h1>
          <h1 className={loaded ? "fadeUp s3" : ""} style={{ fontFamily: "'Playfair Display',serif", fontSize: 68, color: "rgba(245,238,230,.25)", lineHeight: 1.08, fontWeight: 900, marginBottom: 32, opacity: loaded ? 1 : 0 }}>Into Reality</h1>
          <p className={loaded ? "fadeUp s4" : ""} style={{ color: "rgba(245,238,230,.5)", fontSize: 16, lineHeight: 1.9, marginBottom: 44, maxWidth: 460, fontWeight: 300, opacity: loaded ? 1 : 0 }}>
            Premium paints, wall putty & designer textures for homes and businesses across Andhra Pradesh & Telangana.
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <button id="hero-explore-btn" onClick={() => setPage("services")} className="btn glow-btn" style={{ padding: "15px 36px", background: `linear-gradient(135deg,${GOLD},#A8885E)`, color: "#fff", borderRadius: 50, fontSize: 13, fontWeight: 600, letterSpacing: 1, boxShadow: "0 8px 32px rgba(196,168,130,.4)" }}>Explore Services</button>
            <button onClick={() => setPage("contact")} className="btn" style={{ padding: "15px 36px", background: "transparent", color: "rgba(245,238,230,.7)", border: "1px solid rgba(245,238,230,.2)", borderRadius: 50, fontSize: 13 }}>Get Free Quote</button>
          </div>
        </div>

        {/* Floating stat cards */}
        <div style={{ position: "absolute", right: 80, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 16 }}>
          {[{ label: "Projects Done", val: "500+", sub: "Since 2009" }, { label: "Client Satisfaction", val: "100%", sub: "Guaranteed" }, { label: "Brands Available", val: "50+", sub: "Top brands" }].map((item, i) => (
            <div key={item.label} className="float" style={{ background: "rgba(255,255,255,.06)", backdropFilter: "blur(10px)", border: "1px solid rgba(196,168,130,.2)", borderRadius: 16, padding: "18px 24px", animationDelay: `${i * 0.8}s` }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "#F5EEE6", fontWeight: 700 }}>{item.val}</div>
              <div style={{ fontSize: 11, color: GOLD, letterSpacing: 1, marginTop: 2 }}>{item.label}</div>
              <div style={{ fontSize: 10, color: "rgba(245,238,230,.3)", marginTop: 1 }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MARQUEE */}
      <div style={{ background: GOLD, padding: "16px 0", overflow: "hidden" }}>
        <div className="marquee-inner">
          {[...Array(2)].map((_, ri) => (
            <div key={ri} style={{ display: "flex", gap: 0 }}>
              {["Premium Paints", "WallCare Putty", "Designer Textures", "Interior Solutions", "Exterior Coatings", "Enamel & Gloss", "Professional Finish", "Andhra Pradesh", "Telangana"].map(t => (
                <span key={t} style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "rgba(15,15,15,.7)", padding: "0 32px", borderRight: "1px solid rgba(15,15,15,.15)" }}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES PREVIEW */}
      <div style={{ padding: "100px 80px", background: "#F9F7F4" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 4, color: GOLD, textTransform: "uppercase", marginBottom: 12 }}>What We Offer</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, color: MID, fontWeight: 700, lineHeight: 1.1 }}>Our Signature<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Services</span></h2>
          </div>
          <button onClick={() => setPage("services")} className="btn" style={{ padding: "12px 28px", background: "transparent", color: MID, border: `1.5px solid ${MID}`, borderRadius: 50, fontSize: 12, fontWeight: 600, letterSpacing: .5 }}>View All →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {SERVICES.slice(0, 4).map(s => (
            <div key={s.id} className="scard" onMouseEnter={() => setHovCard(s.id)} onMouseLeave={() => setHovCard(null)}
              style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: hovCard === s.id ? "0 24px 64px rgba(0,0,0,.12)" : "0 4px 24px rgba(0,0,0,.06)", cursor: "pointer" }}>
              <div style={{ height: 8, background: `linear-gradient(90deg,${s.accent},${s.accent}88)` }} />
              <div style={{ padding: "28px 24px" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: s.accent + "15", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: s.accent }} />
                </div>
                <div style={{ fontSize: 9, color: s.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{s.category}</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: MID, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: "#777", lineHeight: 1.8, marginBottom: 18 }}>{s.desc}</p>
                <div style={{ paddingTop: 16, borderTop: "1px solid #F0EBE3", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "#bbb", fontStyle: "italic" }}>Price on request</span>
                  <button onClick={() => addToCart(s)} className="btn" style={{ padding: "7px 14px", background: s.accent, color: "#fff", borderRadius: 50, fontSize: 11, fontWeight: 600 }}>+ Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT STRIP */}
      <div style={{ padding: "80px", background: MID, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 4, color: GOLD, textTransform: "uppercase", marginBottom: 14 }}>About Us</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 44, color: "#F5EEE6", fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}>15+ Years of<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Crafting Excellence</span></h2>
          <p style={{ color: "rgba(245,238,230,.5)", fontSize: 14, lineHeight: 2, marginBottom: 32, fontWeight: 300 }}>
            Based in Guntur on Amaravathi Road, Yedukondalu Interiors has been transforming homes and commercial spaces across Andhra Pradesh and Telangana with premium quality paints, putty, and designer textures.
          </p>
          <button onClick={() => setPage("contact")} className="btn" style={{ padding: "13px 30px", background: `linear-gradient(135deg,${GOLD},#A8885E)`, color: "#fff", borderRadius: 50, fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>Work With Us</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[["Quality First", "Only ISI & BIS certified products from trusted manufacturers."], ["Expert Guidance", "Free color & design consultation for every single project."], ["Pan AP & TS", "We serve all major cities across both states."], ["After Support", "Dedicated support for any performance issues."]].map(([t, d]) => (
            <div key={t} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(196,168,130,.15)", borderRadius: 16, padding: "22px 18px" }}>
              <div style={{ width: 28, height: 3, background: GOLD, borderRadius: 2, marginBottom: 14 }} />
              <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, color: "#F5EEE6", marginBottom: 8, fontWeight: 600 }}>{t}</h4>
              <p style={{ fontSize: 11, color: "rgba(245,238,230,.4)", lineHeight: 1.75 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECTS PREVIEW */}
      <div style={{ padding: "100px 80px", background: "#F9F7F4" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: GOLD, textTransform: "uppercase", marginBottom: 12 }}>Portfolio</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, fontWeight: 700, color: MID }}>Recent <span style={{ color: GOLD, fontStyle: "italic" }}>Projects</span></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3 }}>
          {PROJECTS.slice(0, 6).map((p, i) => (
            <div key={p.title} className="scard" style={{ background: i % 3 === 0 ? MID : i % 3 === 1 ? "#EDE8E0" : "#F5F0EA", padding: "44px 36px", boxShadow: "none", borderRadius: 0 }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: GOLD, textTransform: "uppercase", marginBottom: 12 }}>{p.year} · {p.type}</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: i % 3 === 0 ? "#F5EEE6" : MID, fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>{p.title}</h3>
              <div style={{ display: "flex", gap: 20 }}>
                {[["Location", p.location], ["Area", p.area]].map(([l, v]) => (
                  <div key={l}>
                    <div style={{ fontSize: 9, color: i % 3 === 0 ? "rgba(245,238,230,.3)" : "#aaa", letterSpacing: 1, textTransform: "uppercase" }}>{l}</div>
                    <div style={{ fontSize: 12, color: i % 3 === 0 ? "rgba(245,238,230,.7)" : MID, marginTop: 3, fontWeight: 500 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: `linear-gradient(135deg,${GOLD},#8B6A40)`, padding: "80px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 52, color: "#fff", fontWeight: 900, marginBottom: 16 }}>Ready to Transform<br /><span style={{ fontStyle: "italic" }}>Your Space?</span></h2>
        <p style={{ color: "rgba(255,255,255,.7)", fontSize: 15, marginBottom: 36 }}>Get a free consultation today. No obligation.</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          <button onClick={() => setPage("contact")} className="btn" style={{ padding: "16px 40px", background: MID, color: "#fff", borderRadius: 50, fontSize: 13, fontWeight: 700, letterSpacing: 1, boxShadow: "0 8px 32px rgba(0,0,0,.3)" }}>GET FREE QUOTE</button>
          <button onClick={() => setPage("services")} className="btn" style={{ padding: "16px 40px", background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,.4)", borderRadius: 50, fontSize: 13 }}>VIEW SERVICES</button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#080808", padding: "48px 80px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(196,168,130,.1)" }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", color: "#F5EEE6", fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>YEDUKONDALU INTERIORS</div>
          <div style={{ color: "#555", fontSize: 12, marginTop: 6 }}>Amaravathi Road, Guntur · Andhra Pradesh & Telangana</div>
        </div>
        <div style={{ color: "#444", fontSize: 12, textAlign: "right", lineHeight: 2 }}>
          <div style={{ color: "#888" }}>+91 96526 24160</div>
          <div style={{ color: "#888" }}>pavanncherukuri@gmail.com</div>
        </div>
      </div>
    </div>
  );
}
