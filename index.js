import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

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
    const id = Date.now().toString();

    users.push({ _id: id, username: username });
    res.json({ _id: id, username });
  }
});

app.get("/api/users", (_req, res) => {
  res.json(users);
});

app.post("/api/users/:_id/exercises", (req, res) => {
  const userId = req.params._id;
  const description = req.body.description;
  const duration = parseInt(req.body.duration);
  const date = new Date(req.body.date || Date.now()).toDateString();

  const user = users.find((user) => user._id === userId);

  if (!user) {
    return res.json({ error: "User not found" });
  }

  const exercise = {
    id: user._id,
    date: date,
    duration: duration,
    description: description,
  };

  exercises.push(exercise);

  res.json({
    _id: user._id,
    username: user.username,
    date: date,
    duration: duration,
    description: description,
  });
});

app.get("/api/users/:_id/logs", (req, res) => {
  const userId = req.params._id;
  const { from, to, limit } = req.query;

  const user = users.find((user) => user._id === userId);

  let userExercises;

  if (!user) {
    res.json({ error: "User not found" });
  } else {
    userExercises = exercises.filter((exercise) => exercise.id == user._id);
  }

  if (from) {
    const fromDate = new Date(from);
    userExercises = userExercises.filter((exercise) => new Date(exercise.date) >= fromDate);
  }

  if (to) {
    const toDate = new Date(to);
    userExercises = userExercises.filter((exercise) => new Date(exercise.date) <= toDate);
  }

  if (limit) {
    userExercises = userExercises.slice(0, parseInt(limit));
  }

  res.json({
    _id: user._id,
    username: user.username,
    count: userExercises.length,
    log: userExercises,
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
