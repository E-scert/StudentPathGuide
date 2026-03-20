import express from "express";
import pool from "../db/db.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "TVET route is working" });
});

router.get("/", (req, res) => {
  pool
    .query(
      `SELECT 
      p.id,
      p.name AS programme,
      p.field,
      p.level,
      p.min_aps,
      p.duration,
      p.description,
      p.career_paths,
      ARRAY_AGG(c.name) AS colleges,
      ARRAY_AGG(c.province) AS provinces,
      ARRAY_AGG(c.website) AS websites
    FROM tvet_programmes p
    JOIN tvet_college_programmes tcp ON p.id = tcp.programme_id
    JOIN tvet_colleges c ON tcp.college_id = c.id
    GROUP BY p.id
    ORDER BY p.field ASC`,
    )
    .then((result) => {
      res.json({ programmes: result.rows });
    })
    .catch((error) => {
      console.error("TVET error:", error);
      res.status(500).json({ error: "Something went wrong" });
    });
});

export default router;
