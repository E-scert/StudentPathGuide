import express from "express";
import pool from "../db/db.js";

const router = express.Router();

router.get("/", (req, res) => {
  pool
    .query(`SELECT * FROM bursaries ORDER BY closing_date ASC`)
    .then((result) => {
      res.json({ bursaries: result.rows });
    })
    .catch((error) => {
      console.error("Bursary error:", error);
      res.status(500).json({ error: "Something went wrong" });
    });
});

export default router;
