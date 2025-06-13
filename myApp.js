let express = require("express");
require("dotenv").config();

let app = express();

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  console.log("Hello Express");
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  // *** Trying to find the error ***
  console.log("Valor de MESSAGE_STYLE en Render:", process.env.MESSAGE_STYLE);

  const textStyle = process.env.MESSAGE_STYLE;

  if (textStyle == "uppercase") {
    res.json({ message: "Hello Json".toUpperCase() });
  } else {
    res.json({ message: "Hello Json" });
  }
});

module.exports = app;
