const express = require("express");
const app = express();

app.use(express.json());

let users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  users.push(req.body);
  res.status(201).send("User added");
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
