let express = require("express");

let app = express();

app.get("/", (req, res) => {
  console.log("Hello Express");
  res.send("Hello Express");
});

module.exports = app;
