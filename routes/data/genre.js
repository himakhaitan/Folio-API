const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Genre = require("../../models/Genre");

/*
  @route  GET /api/data/genre/id/:id
  @desc   Fetching Books of a Genre with Object ID
  @access Public
  @params { id }
  @return { genre messsage success }
*/

router.get("/id/:id", async (req, res) => {
  // Getting the User ID
  let id = req.params.id;

  // Checking the Object ID
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "Invalid Object ID",
    });
  }

  // Fetching the Genre
  try {
    const genre = await Genre.findById(id);
    if (!genre) {
      // If Genre not found
      return res.status(404).json({
        message: "Genre not found",
      });
    }
    // Sending Response
    return res.status(200).json({
      genre: {
        id: genre._id,
        name: genre.name,
        slug: genre.slug,
        books: genre.books,
      },
      success: true,
      message: "Genre found",
    });
  } catch (err) {
    // Dealing with Errors
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

/*
  @route  GET /api/data/genre/:slug
  @desc   Fetching Books of a Genre with Slug
  @access Public
  @params { id }
  @return { genre messsage success }
*/


router.get("/:slug", async (req, res) => {
  // Getting the Slug
  let slug = req.params.slug;

  // Cheking validity of Slug
  if (!slug || slug.length == 0) {
    return res.status(400).json({
      message: "Invalid Slug",
    });
  }

  // Fetching the Genre
  try {
    const genre = await Genre.findOne({
      slug: slug,
    });
    if (!genre) {
      // If Genre not found
      return res.status(404).json({
        message: "Genre not found",
      });
    }
    // Sending Response
    return res.status(200).json({
      genre: {
        id: genre._id,
        name: genre.name,
        slug: genre.slug,
        books: genre.books,
      },
      success: true,
      message: "Genre found",
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
