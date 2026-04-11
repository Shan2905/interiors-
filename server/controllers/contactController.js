import { readDB, writeDB } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// POST /api/contact
export const createContact = (req, res) => {
  try {
    const { name, phone, email, service, message } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone are required." });
    }
    const db = readDB();
    const contact = {
      id: uuidv4(),
      name,
      phone,
      email: email || "",
      service: service || "",
      message: message || "",
      date: new Date().toLocaleDateString("en-IN"),
      createdAt: new Date().toISOString(),
    };
    db.contacts.unshift(contact);
    writeDB(db);
    return res.status(201).json(contact);
  } catch (err) {
    console.error("createContact error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// GET /api/contacts
export const getContacts = (req, res) => {
  try {
    const db = readDB();
    return res.json(db.contacts);
  } catch (err) {
    console.error("getContacts error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// DELETE /api/contacts/:id
export const deleteContact = (req, res) => {
  try {
    const db = readDB();
    const before = db.contacts.length;
    db.contacts = db.contacts.filter((c) => c.id !== req.params.id);
    if (db.contacts.length === before) {
      return res.status(404).json({ error: "Contact not found." });
    }
    writeDB(db);
    return res.json({ message: "Contact deleted." });
  } catch (err) {
    console.error("deleteContact error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};
