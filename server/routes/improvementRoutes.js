import express from "express";
import pool from "../db/db.js";
import { calculateAPS } from "../services/apsCalculator.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { subjects, targetCourse } = req.body;

  if (!subjects || !targetCourse) {
    return res
      .status(400)
      .json({ error: "Subjects and target course are required" });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM courses WHERE LOWER(name) LIKE LOWER($1) LIMIT 1`,
      [`%${targetCourse}%`],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    const course = result.rows[0];
    const currentAPS = calculateAPS(subjects);
    const requiredAPS = course.min_aps;
    const apsGap = requiredAPS - currentAPS;

    const improvements = subjects
      .filter(
        (s) =>
          s.name.toLowerCase() !== "life orientation" &&
          s.name.toLowerCase() !== "lo",
      )
      .map((subject) => {
        const currentPoints = getAPSPoints(subject.percentage);
        const potentialPoints = 7;
        const possibleGain = potentialPoints - currentPoints;
        return {
          subject: subject.name,
          currentPercentage: subject.percentage,
          currentPoints,
          possibleGain,
        };
      })
      .sort((a, b) => b.possibleGain - a.possibleGain);

    res.json({
      course: course.name,
      currentAPS,
      requiredAPS,
      apsGap,
      qualifies: currentAPS >= requiredAPS,
      improvements,
    });
  } catch (error) {
    console.error("Improvement advisor error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const getAPSPoints = (percentage) => {
  if (percentage >= 80) return 7;
  if (percentage >= 70) return 6;
  if (percentage >= 60) return 5;
  if (percentage >= 50) return 4;
  if (percentage >= 40) return 3;
  if (percentage >= 30) return 2;
  return 1;
};
export default router;
