const express = require("express");
const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.send("OK"));
app.get("/api/users", (req, res) => res.json([{ name: "Demo User" }]));

app.listen(5000, () => console.log("Backend running on 5000"));

