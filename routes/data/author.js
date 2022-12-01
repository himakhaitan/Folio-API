const express = require("express");
const mongoose = require("mongoose");

// Instanciating Router
const router = express.Router();

// Importing Models
const Author = require("../../models/Author");

/*
  @route  GET /api/data/author/id/:id
  @desc   Fetch Author by ID
  @access Public
  @params { id }
  @return { author messsage success }
*/

router.get("/id/:id", async (req, res) => {
  // Getting the Author ID
  let id = req.params.id;

  // Checking the Object ID
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "Invalid Object ID",
    });
  }

  // Fetching the Author
  try {
    const author = await Author.findById(id);

    if (!author) {
      // If Author not found
      return res.status(404).json({
        message: "Author not found",
      });
    }
    // Sending Response
    return res.status(200).json({
      author,
      success: true,
      message: "Author found",
    });
  } catch (err) {
    // Dealing with Errors
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
