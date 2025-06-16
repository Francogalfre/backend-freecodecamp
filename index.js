import express from "express";
import cors from "cors";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
  const dateParams = req.params.date;

  if (dateParams == undefined) {
    res.json({
      unix: Date.now(),
      utc: new Date().toUTCString(),
    });
  } else {
    let date;

    if (!isNaN(dateParams)) {
      date = new Date(parseInt(dateParams));
    } else {
      date = new Date(dateParams);
    }

    if (date.toString() == "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      const unixDate = date.getTime();
      const utcDate = date.toUTCString();

      res.json({
        unix: unixDate,
        utc: utcDate,
      });
    }
  }
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
