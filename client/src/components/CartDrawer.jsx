import { GOLD, MID } from "../constants/data.js";

export default function CartDrawer({ cart, setCart, cartOpen, setCartOpen, setPage, toast$ }) {
  if (!cartOpen) return null;

  const removeFromCart = (id) => setCart(p => p.filter(i => i.id !== id));

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 700, display: "flex" }}>
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        style={{ flex: 1, background: "rgba(0,0,0,.6)", backdropFilter: "blur(6px)" }}
      />
      {/* Drawer */}
      <div style={{
        width: 420, background: "#fff", height: "100%", overflowY: "auto",
        boxShadow: "-20px 0 80px rgba(0,0,0,.3)", animation: "fadeIn .3s ease",
      }}>
        <div style={{ padding: "32px 32px 0", borderBottom: "1px solid #F0EBE3", paddingBottom: 24, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: MID }}>Your Enquiry</h2>
              <p style={{ fontSize: 12, color: "#999", marginTop: 3 }}>{cart.length} service{cart.length !== 1 ? "s" : ""} selected</p>
            </div>
            <button id="close-cart-btn" onClick={() => setCartOpen(false)} className="btn" style={{
              width: 36, height: 36, borderRadius: "50%", background: "#F5F0EA",
              color: "#666", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
          </div>
        </div>

        <div style={{ padding: "0 32px 32px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#ccc" }}>
              <div style={{ fontSize: 56, marginBottom: 12, opacity: .3 }}>◻</div>
              <p style={{ fontSize: 14 }}>Nothing added yet</p>
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} style={{
                  background: "#F9F7F4", borderRadius: 12, padding: 16,
                  marginBottom: 12, display: "flex", gap: 14, alignItems: "flex-start",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: item.accent + "22", display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, background: item.accent }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: item.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>{item.category}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: MID, marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: "#999", fontStyle: "italic" }}>Price on request</div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="btn" style={{ color: "#ccc", fontSize: 16, background: "none", padding: 4 }}>✕</button>
                </div>
              ))}

              <div style={{
                background: "linear-gradient(135deg,#FFF8F0,#FFF3E8)",
                borderRadius: 12, padding: 16, marginBottom: 20,
                border: "1px solid #F0E8DC",
              }}>
                <p style={{ fontSize: 13, color: "#8B7355", lineHeight: 1.7 }}>
                  Our team will reach out within 4 hours with a personalised quote for your project.
                </p>
              </div>

              <button id="proceed-payment-btn" onClick={() => { setCartOpen(false); setPage("payment"); }} className="btn glow-btn" style={{
                width: "100%", padding: "15px",
                background: `linear-gradient(135deg,${MID},#333)`,
                color: "#fff", borderRadius: 12, fontSize: 13,
                fontWeight: 600, letterSpacing: 1, marginBottom: 10,
              }}>
                PROCEED TO PAYMENT →
              </button>

              <button onClick={() => { setCartOpen(false); setPage("contact"); }} className="btn" style={{
                width: "100%", padding: "14px", background: "transparent",
                color: MID, border: `1.5px solid ${MID}`,
                borderRadius: 12, fontSize: 13, fontWeight: 600, letterSpacing: 1,
              }}>
                REQUEST QUOTE ONLY
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
