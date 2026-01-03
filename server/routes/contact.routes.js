const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// Create contact
router.post("/", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch {
    res.status(400).json({ message: "Failed to create contact" });
  }
});

// Get contacts (sorting supported)
router.get("/", async (req, res) => {
  const sortOrder = req.query.sort === "oldest" ? 1 : -1;
  const contacts = await Contact.find().sort({ createdAt: sortOrder });
  res.json(contacts);
});

// Delete contact
router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Contact deleted" });
});

module.exports = router;
