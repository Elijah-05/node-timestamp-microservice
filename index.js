// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  const date = req.params.date;

  // If no date is provided, end the response with a 400 status code
  if (!date) {
    return res
      .status(200)
      .json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
  }

  let newDate;

  // Check if the date is a number (Unix timestamp)or a date string
  if (!isNaN(date)) {
    // If it's a Unix timestamp
    newDate = new Date(Number(date));
  } else {
    // If it's a date string
    newDate = new Date(date);
  }

  // If the date is invalid, return a 400 status code
  if (isNaN(newDate.getTime())) {
    return res.status(400).json({ error: "Invalid Date" });
  }

  // Format the output
  const output = {
    unix: newDate.getTime(),
    utc: newDate.toUTCString(),
  };

  res.status(200).json(output);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
