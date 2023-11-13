// index.js
// where your node app starts

// init project
import express from "express";
const app = express();

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
import cors from "cors";
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:time", (req, res) => {
  const { time } = req.params;
  let unix, utc;
  if(/^[0-9]+$/.test(time)){
    unix = time;
    utc = new Date(Number(time)).toUTCString()
  } else {
    let date = new Date(time);
    unix = date.getTime();
    utc = date.toUTCString();
  }
  res.json({
    "unix": unix,
    "utc": utc
  });
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const PORT = process.env.PORT ?? 3000;

// listen for requests :)
const listener = app.listen(PORT, () => {
  console.log(`Your app is listening on http://127.0.0.1:${PORT}`);
});
