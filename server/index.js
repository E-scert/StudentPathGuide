import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "StudentPathGuide API is running" });
});
//test route
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
