let express = require("express");

let app = express();

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  console.log("Hello Express");

  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
