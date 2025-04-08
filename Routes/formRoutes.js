import express from "express";
import FormData from "../models/FormData.js"; // Make sure to import

const router = express.Router();

router.post("/submit", async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    // Check if email or phone already exists
    const existing = await FormData.findOne({
      $or: [{ email }, { phone }],
    });

    if (existing) {
      return res
        .status(400)
        .json({ error: "Email or phone number already exists" });
    }

    // Create new entry
    const newEntry = new FormData({ name, email, phone });
    await newEntry.save();

    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error while submitting form:", error.message);
    res.status(500).json({ error: "Failed to submit form" });
  }
});

router.get("/data", async (req, res) => {
  try {
    const allData = await FormData.find();
    res.status(200).json(allData);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
export default router;
