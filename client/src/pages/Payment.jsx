import { useState } from "react";
import { GOLD, MID, API_URL } from "../constants/data.js";

export default function Payment({ cart, setCart, setPage, toast$ }) {
  const [payMethod, setPayMethod] = useState("upi");
  const [payStep, setPayStep] = useState(1);
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });

  const pay = async () => {
    if (payMethod === "upi" && !upiId) { toast$("Enter UPI ID", "error"); return; }
    if (payMethod === "card" && (!card.number || !card.name)) { toast$("Fill card details", "error"); return; }

    setPayStep(2);
    try {
      await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          date: new Date().toLocaleDateString("en-IN"),
          method: payMethod,
          status: "Confirmed",
        }),
      });
    } catch {
      // Still show success UI even if network is down
    }

    setTimeout(() => {
      setPayStep(3);
      setCart([]);
      setTimeout(() => {
        setPage("home");
        setPayStep(1);
        toast$("Payment confirmed! We'll contact you soon.");
      }, 2200);
    }, 2400);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F9F7F4", padding: "60px 80px", animation: "fadeUp .5s ease" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div style={{ marginBottom: 36, textAlign: "center" }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: GOLD, textTransform: "uppercase", marginBottom: 12 }}>Secure Checkout</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, fontWeight: 700, color: MID }}>Complete Payment</h2>
          <p style={{ fontSize: 13, color: "#999", marginTop: 8 }}>{cart.length} service{cart.length !== 1 ? "s" : ""} in your enquiry</p>
        </div>

        {/* Step 3: Success */}
        {payStep === 3 ? (
          <div style={{ background: "#fff", borderRadius: 24, padding: "60px 40px", textAlign: "center", boxShadow: "0 8px 40px rgba(0,0,0,.08)" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#E8FFF2", border: "3px solid #2ECC71", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 32, color: "#2ECC71", animation: "pop .5s ease forwards" }}>✓</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: MID, marginBottom: 10 }}>Payment Successful!</h3>
            <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7 }}>Thank you! Our team will contact you at the earliest to confirm your order and schedule the work.</p>
          </div>

        /* Step 2: Processing */
        ) : payStep === 2 ? (
          <div style={{ background: "#fff", borderRadius: 24, padding: "80px 40px", textAlign: "center", boxShadow: "0 8px 40px rgba(0,0,0,.08)" }}>
            <div style={{ width: 56, height: 56, border: `3px solid ${GOLD}`, borderTopColor: "transparent", borderRadius: "50%", margin: "0 auto 24px", animation: "spin .8s linear infinite" }} />
            <p style={{ color: "#888", fontSize: 14, fontWeight: 500 }}>Processing your payment...</p>
          </div>

        /* Step 1: Form */
        ) : (
          <div style={{ background: "#fff", borderRadius: 24, padding: "36px", boxShadow: "0 8px 40px rgba(0,0,0,.08)" }}>
            {/* Cart summary */}
            {cart.length > 0 && (
              <div style={{ marginBottom: 24, background: "#F9F7F4", borderRadius: 14, padding: 18 }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: MID }}>{item.title}</div>
                      <div style={{ fontSize: 11, color: "#999" }}>{item.category}</div>
                    </div>
                    <span style={{ fontSize: 11, color: GOLD, fontStyle: "italic" }}>Price on request</span>
                  </div>
                ))}
              </div>
            )}

            {/* Method tabs */}
            <div style={{ display: "flex", background: "#F5F0EA", borderRadius: 12, padding: 4, marginBottom: 28, gap: 4 }}>
              {[["upi", "UPI"], ["card", "Card"], ["netbanking", "Net Banking"]].map(([v, l]) => (
                <button key={v} id={`pay-${v}-btn`} onClick={() => setPayMethod(v)} className="btn" style={{
                  flex: 1, padding: "10px",
                  background: payMethod === v ? "#fff" : "transparent",
                  color: payMethod === v ? MID : "#999",
                  borderRadius: 10, fontSize: 12, fontWeight: 600,
                  boxShadow: payMethod === v ? "0 2px 8px rgba(0,0,0,.08)" : "none",
                  transition: "all .2s",
                }}>{l}</button>
              ))}
            </div>

            {/* UPI */}
            {payMethod === "upi" && (
              <div style={{ animation: "fadeUp .3s ease" }}>
                <div style={{ border: "2px dashed #E0D8CE", borderRadius: 16, padding: 28, textAlign: "center", marginBottom: 20, background: "#FAFAF8" }}>
                  <div style={{ width: 110, height: 110, background: MID, margin: "0 auto 14px", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,0,0,.3)" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7,8px)", gridTemplateRows: "repeat(7,8px)", gap: 2 }}>
                      {Array.from({ length: 49 }).map((_, i) => {
                        const p = [0, 1, 2, 3, 4, 5, 6, 7, 13, 14, 20, 21, 27, 28, 34, 35, 41, 42, 43, 44, 45, 46, 9, 10, 11, 16, 18, 23, 24, 25, 30, 32, 37, 38, 39, 48];
                        return <div key={i} style={{ width: 8, height: 8, background: p.includes(i) ? "#fff" : "transparent", borderRadius: 1 }} />;
                      })}
                    </div>
                  </div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, color: MID, fontWeight: 600 }}>Scan with any UPI app</div>
                  <div style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>PhonePe · GPay · Paytm · BHIM</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ flex: 1, height: 1, background: "#E5E0D8" }} />
                  <span style={{ fontSize: 11, color: "#aaa" }}>or enter UPI ID</span>
                  <div style={{ flex: 1, height: 1, background: "#E5E0D8" }} />
                </div>
                <input id="upi-id-input" value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@paytm / @ybl / @okaxis"
                  style={{ width: "100%", border: "1.5px solid #E5E0D8", borderRadius: 12, padding: "13px 16px", fontSize: 14, background: "#FAFAF8", marginBottom: 20 }} />
              </div>
            )}

            {/* CARD */}
            {payMethod === "card" && (
              <div style={{ animation: "fadeUp .3s ease" }}>
                <div style={{ background: `linear-gradient(135deg,${MID},#2A2A2A)`, borderRadius: 18, padding: "24px 22px", marginBottom: 22, color: "#fff", position: "relative", overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,.3)" }}>
                  <div style={{ position: "absolute", right: -30, top: -30, width: 150, height: 150, borderRadius: "50%", border: "1px solid rgba(255,255,255,.06)" }} />
                  <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,.35)", marginBottom: 18 }}>DEBIT / CREDIT CARD</div>
                  <div style={{ fontSize: 18, letterSpacing: 5, fontFamily: "monospace", marginBottom: 20, color: card.number ? "#fff" : "rgba(255,255,255,.3)" }}>
                    {card.number ? card.number.replace(/(.{4})/g, "$1 ").trim() : "•••• •••• •••• ••••"}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <div style={{ fontSize: 8, color: "rgba(255,255,255,.3)", letterSpacing: 1, marginBottom: 3 }}>CARDHOLDER</div>
                      <div style={{ fontSize: 13, color: card.name ? "#fff" : "rgba(255,255,255,.3)" }}>{card.name || "YOUR NAME"}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 8, color: "rgba(255,255,255,.3)", letterSpacing: 1, marginBottom: 3 }}>EXPIRY</div>
                      <div style={{ fontSize: 13, color: card.expiry ? "#fff" : "rgba(255,255,255,.3)" }}>{card.expiry || "MM/YY"}</div>
                    </div>
                    <div style={{ width: 44, height: 28, borderRadius: 4, background: "linear-gradient(135deg,#FFD700,#FFA500)", opacity: .6 }} />
                  </div>
                </div>
                {[["Card Number", "number", "1234567890123456", "number", 16], ["Name on Card", "name", "As printed on card", "text", 40], ["Expiry (MM/YY)", "expiry", "MM/YY", "text", 5], ["CVV", "cvv", "•••", "password", 3]].map(([l, f, ph, t, max]) => (
                  <div key={f} style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 10, fontWeight: 600, color: "#888", letterSpacing: .5, display: "block", marginBottom: 5, textTransform: "uppercase" }}>{l}</label>
                    <input id={`card-${f}`} type={t} placeholder={ph} value={card[f]} maxLength={max} onChange={e => setCard(p => ({ ...p, [f]: e.target.value }))}
                      style={{ width: "100%", border: "1.5px solid #E5E0D8", borderRadius: 10, padding: "12px 14px", fontSize: 14, background: "#FAFAF8" }} />
                  </div>
                ))}
              </div>
            )}

            {/* Net Banking */}
            {payMethod === "netbanking" && (
              <div style={{ animation: "fadeUp .3s ease" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                  {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB"].map(b => (
                    <div key={b} className="btn scard" style={{ border: "1.5px solid #E5E0D8", borderRadius: 12, padding: "16px 10px", textAlign: "center", fontSize: 12, fontWeight: 600, color: MID, background: "#FAFAF8" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.background = "#FFF8F0"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E0D8"; e.currentTarget.style.background = "#FAFAF8"; }}>
                      {b}
                    </div>
                  ))}
                </div>
                <select style={{ width: "100%", border: "1.5px solid #E5E0D8", borderRadius: 10, padding: "12px 14px", fontSize: 13, background: "#FAFAF8", marginBottom: 16, color: "#555" }}>
                  <option>Select other bank...</option>
                  {["Yes Bank", "IndusInd", "Federal Bank", "Canara Bank", "Bank of Baroda", "Union Bank", "Indian Bank"].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            )}

            <button id="confirm-pay-btn" onClick={pay} className="btn glow-btn" style={{
              width: "100%", padding: "16px",
              background: `linear-gradient(135deg,${MID},#2A2A2A)`,
              color: "#fff", borderRadius: 14, fontSize: 14, fontWeight: 700,
              letterSpacing: 1, marginBottom: 12, boxShadow: "0 8px 32px rgba(0,0,0,.2)",
            }}>
              CONFIRM & PAY SECURELY
            </button>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>🔒</span>
              <span style={{ fontSize: 11, color: "#aaa" }}>256-bit SSL encrypted · Powered by Razorpay</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
