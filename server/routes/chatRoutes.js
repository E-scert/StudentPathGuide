import express from "express";
import { chat } from "../services/aiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message, context } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await chat(message, context || {});
    res.json({ response });
  } catch (error) {
    console.error("AI chat error:", error);
    res.status(500).json({ error: "Something went wrong with the AI" });
  }
});

export default router;
