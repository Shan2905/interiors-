import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    id: Number,
    category: String,
    title: String,
    desc: String,
    features: [String],
    accent: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    items: { type: [orderItemSchema], required: true },
    date: { type: String, default: () => new Date().toLocaleDateString("en-IN") },
    method: { type: String, enum: ["upi", "card", "netbanking"], default: "upi" },
    status: { type: String, default: "Confirmed" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
