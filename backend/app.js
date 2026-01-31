const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || "REPLACE_AT_RUNTIME",
  user: process.env.DB_USER || "demouser",
  password: process.env.DB_PASS || "DemoPass123!",
  database: process.env.DB_NAME || "demoapp",
  waitForConnections: true,
  connectionLimit: 10,
  ssl: { rejectUnauthorized: false }
});

app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" });
  }

  try {
    await pool.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );
    res.status(201).json({ message: "User added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Insert failed" });
  }
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});

