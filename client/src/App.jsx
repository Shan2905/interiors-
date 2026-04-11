import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Toast from "./components/Toast.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Projects from "./pages/Projects.jsx";
import Payment from "./pages/Payment.jsx";
import Contact from "./pages/Contact.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const toast$ = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (s) => {
    setCart(p => p.find(i => i.id === s.id) ? p : [...p, { ...s }]);
    toast$(`${s.title} added`);
  };

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: "#F9F7F4", minHeight: "100vh", color: "#1A1A1A" }}>
      <Toast toast={toast} />
      <CartDrawer cart={cart} setCart={setCart} cartOpen={cartOpen} setCartOpen={setCartOpen} setPage={setPage} toast$={toast$} />
      <Navbar page={page} setPage={setPage} cart={cart} setCartOpen={setCartOpen} />

      {page === "home"     && <Home     setPage={setPage} addToCart={addToCart} loaded={loaded} />}
      {page === "services" && <Services addToCart={addToCart} />}
      {page === "projects" && <Projects setPage={setPage} />}
      {page === "payment"  && <Payment  cart={cart} setCart={setCart} setPage={setPage} toast$={toast$} />}
      {page === "contact"  && <Contact  toast$={toast$} />}
      {page === "admin"    && <Admin    toast$={toast$} />}
    </div>
  );
}
