import { useState } from "react";
import { GOLD, MID, CATEGORIES, API_URL } from "../constants/data.js";

export default function Contact({ toast$ }) {
  const [contact, setContact] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [sending, setSending] = useState(false);

  const sendContact = async () => {
    if (!contact.name || !contact.phone) { toast$("Fill name & phone", "error"); return; }
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (!res.ok) throw new Error("Failed");
      toast$("Enquiry received! We'll call you back.");
      setContact({ name: "", phone: "", email: "", service: "", message: "" });
    } catch {
      toast$("Something went wrong. Please try again.", "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ padding: "60px 80px", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 80, maxWidth: 1100, animation: "fadeUp .5s ease" }}>
      {/* Left info */}
      <div>
        <div style={{ fontSize: 10, letterSpacing: 4, color: GOLD, textTransform: "uppercase", marginBottom: 12 }}>Get In Touch</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 44, fontWeight: 700, color: MID, marginBottom: 18, lineHeight: 1.1 }}>Request a<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Free Quote</span></h2>
        <p style={{ color: "#777", fontSize: 14, lineHeight: 1.9, marginBottom: 44, fontWeight: 300 }}>Tell us about your space and we'll get back with a personalised quote. Free consultation, no obligation.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            ["Address", "Amaravathi Road, Guntur, Andhra Pradesh"],
            ["Phone", "+91 96526 24160"],
            ["Email", "pavanncherukuri@gmail.com"],
            ["Service Area", "All of Andhra Pradesh & Telangana"],
            ["Hours", "Monday – Saturday · 9AM to 7PM"],
          ].map(([t, v]) => (
            <div key={t} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ width: 3, height: 3, borderRadius: "50%", background: GOLD, marginTop: 8, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 10, color: "#aaa", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>{t}</div>
                <div style={{ fontSize: 14, color: MID, fontWeight: 500 }}>{v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div style={{ background: "#fff", borderRadius: 24, padding: 40, boxShadow: "0 8px 40px rgba(0,0,0,.08)" }}>
        {[["Full Name *", "name", "text", "Your full name"], ["Phone Number *", "phone", "tel", "+91 98765 43210"], ["Email Address", "email", "email", "you@example.com"]].map(([l, f, t, ph]) => (
          <div key={f} style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 10, fontWeight: 600, color: "#888", letterSpacing: .5, display: "block", marginBottom: 6, textTransform: "uppercase" }}>{l}</label>
            <input id={`contact-${f}`} type={t} placeholder={ph} value={contact[f]} onChange={e => setContact(p => ({ ...p, [f]: e.target.value }))}
              style={{ width: "100%", border: "1.5px solid #E5E0D8", borderRadius: 12, padding: "12px 14px", fontSize: 14, background: "#FAFAF8" }} />
          </div>
        ))}

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 10, fontWeight: 600, color: "#888", letterSpacing: .5, display: "block", marginBottom: 6, textTransform: "uppercase" }}>Service Required</label>
          <select id="contact-service" value={contact.service} onChange={e => setContact(p => ({ ...p, service: e.target.value }))}
            style={{ width: "100%", border: "1.5px solid #E5E0D8", borderRadius: 12, padding: "12px 14px", fontSize: 14, background: "#FAFAF8", color: contact.service ? "#1A1A1A" : "#999" }}>
            <option value="">Select a service...</option>
            {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 10, fontWeight: 600, color: "#888", letterSpacing: .5, display: "block", marginBottom: 6, textTransform: "uppercase" }}>Project Details</label>
          <textarea id="contact-message" value={contact.message} onChange={e => setContact(p => ({ ...p, message: e.target.value }))}
            placeholder="Area size, type of work, timeline..." rows={4}
            style={{ width: "100%", border: "1.5px solid #E5E0D8", borderRadius: 12, padding: "12px 14px", fontSize: 14, resize: "none", background: "#FAFAF8" }} />
        </div>

        <button id="submit-contact-btn" onClick={sendContact} disabled={sending} className="btn" style={{
          width: "100%", padding: "15px",
          background: `linear-gradient(135deg,${MID},#333)`,
          color: "#fff", borderRadius: 14, fontSize: 13, fontWeight: 700,
          letterSpacing: 1, boxShadow: "0 8px 24px rgba(0,0,0,.15)",
          opacity: sending ? .7 : 1,
        }}>
          {sending ? "SENDING..." : "SEND ENQUIRY →"}
        </button>
      </div>
    </div>
  );
}
