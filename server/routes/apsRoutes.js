import express from "express";
import { calculateAPS } from "../services/apsCalculator.js";

const router = express.Router();

router.post("/calculate", (req, res) => {
  const { subjects } = req.body;

  if (!subjects || subjects.length === 0) {
    return res.status(400).json({ error: "No subjects provided" });
  }

  const aps = calculateAPS(subjects);
  res.json({ aps });
});
export default router;
