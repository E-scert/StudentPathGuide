import express from "express";
import pool from "../db/db.js";

const router = express.Router();

// Login
router.post("/login", (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
});

// Get all courses
router.get("/courses", (req, res) => {
  pool
    .query(`SELECT * FROM courses ORDER BY name ASC`)
    .then((result) => res.json({ courses: result.rows }))
    .catch((error) => res.status(500).json({ error: "Something went wrong" }));
});

// Add new course
router.post("/courses", (req, res) => {
  const { name, field, min_aps, description, career_paths } = req.body;
  pool
    .query(
      `INSERT INTO courses (name, field, min_aps, description, career_paths) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, field, min_aps, description, career_paths],
    )
    .then((result) => res.json({ course: result.rows[0] }))
    .catch((error) => res.status(500).json({ error: "Something went wrong" }));
});

// Get all universities
router.get("/universities", (req, res) => {
  pool
    .query(`SELECT * FROM universities ORDER BY name ASC`)
    .then((result) => res.json({ universities: result.rows }))
    .catch((error) => res.status(500).json({ error: "Something went wrong" }));
});

// Add new university
router.post("/universities", (req, res) => {
  const { name, abbreviation, province, website } = req.body;
  pool
    .query(
      `INSERT INTO universities (name, abbreviation, province, website) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, abbreviation, province, website],
    )
    .then((result) => res.json({ university: result.rows[0] }))
    .catch((error) => res.status(500).json({ error: "Something went wrong" }));
});

// Get all bursaries
router.get("/bursaries", (req, res) => {
  pool
    .query(`SELECT * FROM bursaries ORDER BY name ASC`)
    .then((result) => res.json({ bursaries: result.rows }))
    .catch((error) => res.status(500).json({ error: "Something went wrong" }));
});

// Add new bursary
router.post("/bursaries", (req, res) => {
  const {
    name,
    provider,
    field,
    min_aps,
    value,
    opening_date,
    closing_date,
    apply_url,
    requirements,
    description,
  } = req.body;
  pool
    .query(
      `INSERT INTO bursaries (name, provider, field, min_aps, value, opening_date, closing_date, apply_url, requirements, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        name,
        provider,
        field,
        min_aps,
        value,
        opening_date,
        closing_date,
        apply_url,
        requirements,
        description,
      ],
    )
    .then((result) => res.json({ bursary: result.rows[0] }))
    .catch((error) => res.status(500).json({ error: "Something went wrong" }));
});

export default router;
