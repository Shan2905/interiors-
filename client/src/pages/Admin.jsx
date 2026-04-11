import { useState, useEffect } from "react";
import { GOLD, MID, SERVICES, API_URL } from "../constants/data.js";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "yedukondalu123";

export default function Admin({ toast$ }) {
  const [adminIn, setAdminIn] = useState(false);
  const [adminPw, setAdminPw] = useState("");
  const [orders, setOrders] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, contactsRes] = await Promise.all([
        fetch(`${API_URL}/api/orders`),
        fetch(`${API_URL}/api/contacts`),
      ]);
      setOrders(await ordersRes.json());
      setContacts(await contactsRes.json());
    } catch {
      toast$("Could not fetch data from server.", "error");
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    if (adminPw === ADMIN_PASSWORD) {
      setAdminIn(true);
      toast$("Welcome back!");
      fetchData();
    } else {
      toast$("Wrong password", "error");
    }
  };

  const deleteOrder = async (id) => {
    await fetch(`${API_URL}/api/orders/${id}`, { method: "DELETE" });
    setOrders(p => p.filter(o => o.id !== id));
    toast$("Order removed.");
  };

  const deleteContact = async (id) => {
    await fetch(`${API_URL}/api/contacts/${id}`, { method: "DELETE" });
    setContacts(p => p.filter(c => c.id !== id));
    toast$("Enquiry removed.");
  };

  return (
    <div style={{ padding: "60px 80px", animation: "fadeUp .5s ease" }}>
      {!adminIn ? (
        <div style={{ maxWidth: 380, margin: "40px auto", background: "#fff", borderRadius: 24, padding: 44, boxShadow: "0 8px 40px rgba(0,0,0,.08)" }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: GOLD, textTransform: "uppercase", marginBottom: 10 }}>Restricted</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: MID, marginBottom: 6 }}>Admin Access</h2>
          <p style={{ fontSize: 12, color: "#aaa", marginBottom: 24 }}>Enter admin password to continue.</p>
          <input id="admin-pw-input" type="password" placeholder="Enter password" value={adminPw}
            onChange={e => setAdminPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            style={{ width: "100%", border: "1.5px solid #E5E0D8", borderRadius: 12, padding: "13px 14px", fontSize: 14, marginBottom: 14, background: "#FAFAF8" }} />
          <button id="admin-login-btn" onClick={login} className="btn" style={{ width: "100%", padding: "13px", background: MID, color: "#fff", borderRadius: 12, fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>LOGIN</button>
        </div>
      ) : (
        <div>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 40 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 4, color: GOLD, textTransform: "uppercase", marginBottom: 8 }}>Dashboard</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 38, color: MID, fontWeight: 700 }}>Admin Panel</h2>
            </div>
            <div style={{ display: "flex", gap: 10, alignSelf: "flex-end" }}>
              <button onClick={fetchData} className="btn" style={{ padding: "10px 22px", background: GOLD, color: "#fff", borderRadius: 50, fontSize: 12, fontWeight: 600 }}>↻ Refresh</button>
              <button onClick={() => setAdminIn(false)} className="btn" style={{ padding: "10px 22px", background: "transparent", color: MID, border: "1.5px solid #DDD8D0", borderRadius: 50, fontSize: 12, fontWeight: 600 }}>LOGOUT</button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 40 }}>
            {[
              ["Total Services", SERVICES.length, "#D4522A"],
              ["Total Orders", orders.length, "#2A7DD4"],
              ["Confirmed Orders", orders.filter(o => o.status === "Confirmed").length, "#2A9D8F"],
              ["Enquiries", contacts.length, "#8B7355"],
            ].map(([l, v, c]) => (
              <div key={l} style={{ background: "#fff", borderRadius: 20, padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,.06)", borderTop: `4px solid ${c}` }}>
                <div style={{ fontSize: 10, color: "#aaa", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>{l}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, fontWeight: 700, color: MID }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, background: "#F5F0EA", borderRadius: 12, padding: 4, marginBottom: 28, width: "fit-content" }}>
            {[["orders", "Orders"], ["contacts", "Enquiries"]].map(([t, l]) => (
              <button key={t} onClick={() => setActiveTab(t)} className="btn" style={{
                padding: "10px 24px", background: activeTab === t ? "#fff" : "transparent",
                color: activeTab === t ? MID : "#999", borderRadius: 10, fontSize: 13, fontWeight: 600,
                boxShadow: activeTab === t ? "0 2px 8px rgba(0,0,0,.08)" : "none",
              }}>{l}</button>
            ))}
          </div>

          {loading && <div style={{ color: "#aaa", padding: 20 }}>Loading...</div>}

          {/* Orders tab */}
          {activeTab === "orders" && !loading && (
            orders.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: 16, padding: "48px", textAlign: "center", color: "#bbb" }}>No orders yet.</div>
            ) : orders.map(o => (
              <div key={o.id} style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 10px rgba(0,0,0,.05)" }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: MID }}>Order #{o.id.toString().slice(-5)}</div>
                  <div style={{ fontSize: 12, color: "#aaa", marginTop: 3 }}>{o.date} · {o.items?.length} service(s) · {o.method?.toUpperCase()}</div>
                  <div style={{ fontSize: 11, color: "#bbb", marginTop: 2 }}>{o.items?.map(i => i.title).join(", ")}</div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ background: "#E8FFF2", color: "#27AE60", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 50, letterSpacing: .5 }}>{o.status}</span>
                  <button onClick={() => deleteOrder(o.id)} className="btn" style={{ background: "#FFF0F0", color: "#C0392B", padding: "6px 14px", borderRadius: 50, fontSize: 11, fontWeight: 600 }}>Remove</button>
                </div>
              </div>
            ))
          )}

          {/* Contacts tab */}
          {activeTab === "contacts" && !loading && (
            contacts.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: 16, padding: "48px", textAlign: "center", color: "#bbb" }}>No enquiries yet.</div>
            ) : contacts.map(c => (
              <div key={c.id} style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "flex-start", boxShadow: "0 2px 10px rgba(0,0,0,.05)" }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: MID }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "#555", marginTop: 3 }}>{c.phone} {c.email && `· ${c.email}`}</div>
                  <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{c.service && `${c.service} · `}{c.date}</div>
                  {c.message && <div style={{ fontSize: 12, color: "#888", marginTop: 6, fontStyle: "italic" }}>{c.message}</div>}
                </div>
                <button onClick={() => deleteContact(c.id)} className="btn" style={{ background: "#FFF0F0", color: "#C0392B", padding: "6px 14px", borderRadius: 50, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>Remove</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
