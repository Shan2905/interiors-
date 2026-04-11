import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config({ path: "../.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Health check
app.get("/", (req, res) => res.json({ status: "✅ Yedukondalu API running", version: "1.0.0" }));

// Routes
app.use("/api", orderRoutes);
app.use("/api", contactRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: "Route not found." }));

// Start
app.listen(PORT, () => {
  console.log(`\n🚀 Server running → http://localhost:${PORT}`);
  console.log(`📂 Database  → server/data/db.json`);
  console.log(`📋 Orders    → GET  http://localhost:${PORT}/api/orders`);
  console.log(`📋 Contacts  → GET  http://localhost:${PORT}/api/contacts\n`);
});
