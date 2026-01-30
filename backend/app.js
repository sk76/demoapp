const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: "demouser",
  password: "DemoPass123!",
  database: "demoapp",
  ssl: { rejectUnauthorized: false }
});
app.get("/users", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM users");
  res.json(rows);
});

app.post("/users", async (req, res) => {
  await pool.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [req.body.name, req.body.email]
  );
  res.json({ status: "User Added" });
});

app.get("/health", (req, res) => res.send("OK"));
app.listen(5000, () => console.log("Backend running on 5000"));
