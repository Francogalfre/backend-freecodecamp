let express = require("express");
let bodyParser = require("body-parser");

require("dotenv").config();

let app = express();

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", (req, _res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get(
  "/now",
  (req, _res, next) => {
    const time = new Date().toString();
    req.time = time;
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

app.get("/", (_req, res) => {
  console.log("Hello Express");
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/name", (req, res) => {
  console.log(req.query);

  const name = req.query.first;
  const lastname = req.query.last;

  if (!name || !lastname) {
    res.json({ error: "Please provide both firstname and lastname" });
  } else {
    res.json({ name: `${name} ${lastname}` });
  }
});

app.post("/name", (req, res) => {
  if (!req.body) {
    res.json({ error: "Please provide both firstname and lastname" });
  } else {
    console.log(req.body.first, req.body.last);

    const name = req.body.first;
    const lastname = req.body.last;

    res.json({ name: `${name} ${lastname}` });
  }
});

app.get("/json", (_req, res) => {
  const textStyle = process.env.MESSAGE_STYLE;

  if (textStyle == "uppercase") {
    res.json({ message: "Hello Json".toUpperCase() });
  } else {
    res.json({ message: "Hello Json" });
  }
});

app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

module.exports = app;
