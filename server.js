// Import Statements
const express = require("express");
const http = require("http");

// Creating Express App
const app = express();

// Middlewares
app.use(express.json());

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

// Creating Server
const SERVER = http.createServer(app);

// Listening to Server
app.listen(PORT, () => {
  console.log(`Server is up and running at PORT : ${PORT}`);
});

// Exporting Server for index.js
module.exports = SERVER;
