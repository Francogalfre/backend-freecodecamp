import express from "express";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const users = [];
const exercises = [];

app.post("/api/users", (req, res) => {
  const username = req.body.username;

  if (!username) {
    res.json({ error: "Username is required" });
  } else {
    const id = users.length + 1;

    users.push({ id, username });
    res.json({ username, _id: id });
  }
});

app.get("/api/users", (_req, res) => {
  if (users.length > 0) {
    res.json(users);
  } else {
    res.json({ error: "No users created yet" });
  }
});

app.post("/api/users/:_id/exercises", (req, res) => {
  const userId = req.params._id;
  const description = req.body.description;
  const duration = parseInt(req.body.duration);
  const date = new Date(req.body.date || Date.now()).toDateString();

  const user = users.find((user) => user.id === parseInt(userId));

  if (!user) {
    return res.json({ error: "User not found" });
  }

  const exercise = {
    id: user.id,
    date: date,
    duration: duration,
    description: description,
  };

  exercises.push(exercise);

  res.json({
    _id: user.id,
    username: user.username,
    date: date,
    duration: duration,
    description: description,
  });
});

app.get("/api/users/:_id/logs", (req, res) => {
  const userId = req.params._id;

  const userExercises = [];

  const user = users.find((user) => user.id == userId);

  if (!user) {
    res.json({ error: "User not found" });
  } else {
    userExercises.push(exercises.find((exercise) => exercise.id == user.id));
  }

  res.json({
    _id: user.id,
    username: user.username,
    count: userExercises.length,
    log: userExercises,
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
