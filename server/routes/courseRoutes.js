import express from "express";
import pool from "../db/db.js";

const router = express.Router();

router.get("/match", async (req, res) => {
  const { aps } = req.query;

  if (!aps) {
    return res.status(400).json({ error: "APS score is required" });
  }

  try {
    const result = await pool.query(
      "SELECT c.id,c.name,c.field,c.min_aps,c.description,c.career_paths,ARRAY_AGG(u.name) AS universities,ARRAY_AGG(u.website) AS university_websites from courses c JOIN university_courses uc on c.id = uc.course_id JOIN universities u ON uc.university_id = u.id WHERE c.min_aps <= $1 group by c.id order by c.min_aps DESC ",
      [aps],
    );
    res.json({ courses: result.rows });
  } catch (error) {
    console.error("Course matching error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
export default router;
