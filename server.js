// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const axios = require("axios");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Reservations (DATA)
// =============================================================
let tables = [];
let waitinglist = [];


// Routes
// =============================================================

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.json(tables);
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all reservations
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays a single table, or returns false
app.get("/tables/:table", function(req, res) {
  let chosen = req.params.table;

  console.log(chosen);

  for (var i = 0; i < tables.length; i++) {
    if (chosen === tables[i].unique) {
      return res.json(tables[i]);
    }
  }

  return res.json(false);
});

app.post("/api/tables", (req, res) => {
  let newReservation = req.body;
  console.log("newReservation", newReservation);

    // Using a RegEx Pattern to remove spaces from newReservation
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);
//   tables.push(newReservation);
//   res.json(newReservation);
// });

  
  if (tables.length < 5){
      tables.push(newReservation);
      res.json(true);
  } else {
      waitinglist.push(newReservation);
      res.json(false);
  }
});

app.get('/api/waitinglist', function(req, res) {
	return res.json(waitinglist);
});

app.post('/api/clear', function(req, res) {
	tables = [];
	waitinglist = [];
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
