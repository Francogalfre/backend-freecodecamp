var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
  const paramsDate = req.params.date;
  const date = new Date(Number(paramsDate));

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  if (!paramsDate) {
    res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
