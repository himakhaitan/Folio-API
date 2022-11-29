// Import Statements
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const logging = require("./middlewares/logging");

// Creating Express App
const app = express();

// Middlewares
app.use(express.json());
app.use(logging);

// PARSE application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// PARSE application/json
app.use(bodyParser.json());

// Routes
app.use("/api/add", require("./routes/add/Index"));

// Basic or Home Route
app.get("/", (req, res) => {
  // Sending Response
  return res.send({
    server: "Folio",
    status: "Online",
    host: req.headers.host,
  });
});

// Defining Server Port
const PORT = process.env.PORT || 3000;

// Establishing Database Connection
require("./config/db.js");

// Creating Server
const SERVER = http.createServer(app);

// Listening to Server
app.listen(PORT, () => {
  console.log(`Server is up and running at PORT : ${PORT}`);
});

// Exporting Server for index.js
module.exports = SERVER;
