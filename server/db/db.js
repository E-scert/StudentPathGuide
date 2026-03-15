import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "studentpathguide",
  password: "prince",
  port: 5432,
});

pool
  .connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error,", err));

export default pool;
