import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config({ path: "../.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed origins (local dev + production Vercel URL)
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,          // set this on Render to your Vercel URL
].filter(Boolean);

// Middleware
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
app.use(express.json());

// Health check
app.get("/", (req, res) => res.json({ status: "✅ Yedukondalu API running", version: "2.0.0", db: "MongoDB" }));

// Routes
app.use("/api", orderRoutes);
app.use("/api", contactRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: "Route not found." }));

// Connect DB then start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running → http://localhost:${PORT}`);
    console.log(`🌿 Database  → MongoDB Atlas`);
    console.log(`📋 Orders    → GET  http://localhost:${PORT}/api/orders`);
    console.log(`📋 Contacts  → GET  http://localhost:${PORT}/api/contacts\n`);
  });
});
