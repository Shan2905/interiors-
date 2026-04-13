import Contact from "../models/Contact.js";

// POST /api/contact
export const createContact = async (req, res) => {
  try {
    const { name, phone, email, service, message } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone are required." });
    }
    const contact = await Contact.create({ name, phone, email, service, message });
    return res.status(201).json(contact);
  } catch (err) {
    console.error("createContact error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// GET /api/contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.json(contacts);
  } catch (err) {
    console.error("getContacts error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// DELETE /api/contacts/:id
export const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Contact not found." });
    }
    return res.json({ message: "Contact deleted." });
  } catch (err) {
    console.error("deleteContact error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};
