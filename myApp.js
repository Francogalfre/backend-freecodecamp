let express = require("express");
require("dotenv").config();

let app = express();

app.use("/public", express.static(__dirname + "/public"));

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

app.get("/json", (_req, res) => {
  const textStyle = process.env.MESSAGE_STYLE;

  if (textStyle == "uppercase") {
    res.json({ message: "Hello Json".toUpperCase() });
  } else {
    res.json({ message: "Hello Json" });
  }
});

module.exports = app;
