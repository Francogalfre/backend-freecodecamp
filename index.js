import express from "express";
import cors from "cors";
import dns from "node:dns";

import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (_req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

const urls = [];

app.post("/api/shorturl", function (req, res) {
  const originalUrl = req.body.url;

  if (!originalUrl) {
    res.json({ error: "Invalid URL" });
  }

  let urlObject;

  try {
    urlObject = new URL(originalUrl);
  } catch {
    return res.json({ error: "Invalid URL" });
  }

  dns.lookup(urlObject.hostname, (err) => {
    if (err) {
      res.json({ error: "Invalid URL" });
    } else {
      const shortUrl = urls.length + 1;
      urls.push({ originalUrl, shortUrl });

      res.json({
        original_url: originalUrl,
        short_url: shortUrl,
      });
    }
  });
});

app.get("/api/shorturl/:shortUrl", (req, res) => {
  const shortUrl = req.params.shortUrl;
  const url = urls.find((url) => url.shortUrl == shortUrl);

  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.json({ error: "No short URL found for the given input" });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
