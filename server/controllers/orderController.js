import { readDB, writeDB } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// POST /api/orders
export const createOrder = (req, res) => {
  try {
    const { items, date, method, status } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Order must have at least one item." });
    }
    const db = readDB();
    const order = {
      id: uuidv4(),
      items,
      date: date || new Date().toLocaleDateString("en-IN"),
      method: method || "upi",
      status: status || "Confirmed",
      createdAt: new Date().toISOString(),
    };
    db.orders.unshift(order); // newest first
    writeDB(db);
    return res.status(201).json(order);
  } catch (err) {
    console.error("createOrder error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// GET /api/orders
export const getOrders = (req, res) => {
  try {
    const db = readDB();
    return res.json(db.orders);
  } catch (err) {
    console.error("getOrders error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// DELETE /api/orders/:id
export const deleteOrder = (req, res) => {
  try {
    const db = readDB();
    const before = db.orders.length;
    db.orders = db.orders.filter((o) => o.id !== req.params.id);
    if (db.orders.length === before) {
      return res.status(404).json({ error: "Order not found." });
    }
    writeDB(db);
    return res.json({ message: "Order deleted." });
  } catch (err) {
    console.error("deleteOrder error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};
