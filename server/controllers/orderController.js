import Order from "../models/Order.js";

// POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { items, date, method, status } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Order must have at least one item." });
    }
    const order = await Order.create({ items, date, method, status });
    return res.status(201).json(order);
  } catch (err) {
    console.error("createOrder error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// GET /api/orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    console.error("getOrders error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// DELETE /api/orders/:id
export const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Order not found." });
    }
    return res.json({ message: "Order deleted." });
  } catch (err) {
    console.error("deleteOrder error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};
