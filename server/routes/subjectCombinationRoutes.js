import express from "express";
import pool from "../db/db.js";

const router = express.Router();

router.get("/", (req, res) => {
  pool
    .query(`SELECT * FROM subject_combinations ORDER BY career_field ASC`)
    .then((result) => {
      res.json({ combinations: result.rows });
    })
    .catch((error) => {
      console.error("Subject combinations error:", error);
      res.status(500).json({ error: "Something went wrong" });
    });
});
export default router;
