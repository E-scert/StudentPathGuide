import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./db/db.js";
import apsRoutes from "./routes/apsRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

app.use("/api/aps", apsRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.json({ message: "StudentPathGuide API is running" });
});
//test route
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
