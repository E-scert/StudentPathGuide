import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import "./db/db.js";
import apsRoutes from "./routes/apsRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import improvementRoutes from "./routes/improvementRoutes.js";
import tvetRoutes from "./routes/tvetRoutes.js";
import bursaryRoutes from "./routes/bursaryRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

app.use("/api/aps", apsRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/improvement", improvementRoutes);
app.use("/api/tvet", tvetRoutes);
app.use("/api/bursaries", bursaryRoutes);

app.get("/", (req, res) => {
  res.json({ message: "StudentPathGuide API is running" });
});
//test route
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
