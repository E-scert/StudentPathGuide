import express from "express";
import pool from "../db/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        u.name AS university,
        u.abbreviation,
        u.province,
        a.year,
        a.opening_date,
        a.closing_date,
        a.apply_url,
        a.notes
      FROM application_dates a
      JOIN universities u ON a.university_id = u.id
      ORDER BY u.name ASC`
    );
    res.json({ applications: result.rows });
  } catch (error) {
    console.error("Application dates error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;