const express = require("express");

// Creating Router
const router = express.Router();

/*
  @route  POST /api/add/book
  @desc   Add a Book in the Database
  @access Public
  @params { title, genre, author}
  @return { book }
*/
router.get("/book", (req, res) => {
  // Validating Data
  

  // Sending Response
});

// Exporting Router
module.exports = router;
