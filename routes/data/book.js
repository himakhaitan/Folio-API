// Import Statements
const express = require("express");
const mongoose = require("mongoose");

// Instanciating Router
const router = express.Router();

// Importing Models
const Book = require("../../models/Book");

/*
  @route  GET /api/data/book/id/:id
  @desc   Fetch Book by ID
  @access Public
  @params { id }
  @return { book messsage success }
*/

router.get("/id/:id", async (req, res) => {
  // Getting the Book ID
  let id = req.params.id;

  // Checking the Object ID
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "Invalid Object ID",
    });
  }

  // Fetching the Book
  try {
    const book = await Book.findById(id)
      .populate("genre", "name")
      .populate("author", "firstName lastName");

    if (!book) {
      // If Book not found
      return res.status(404).json({
        message: "Book not found",
      });
    }
    // Sending Response
    return res.status(200).json({
      book: {
        id: book._id,
        title: book.title,
        slug: book.slug,
        copies: book.copies,
        author: book.author,
        genre: {
          id: book.genre._id,
          name: book.genre.name,
        },
      },
      success: true,
      message: "Book Fetched Successfully",
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
  @route  GET /api/data/book/:slug
  @desc   Fetch Book by Slug
  @access Public
  @params { id }
  @return { book messsage success }
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

  // Fetching the Book
  try {
    const book = await Book.findOne({
      slug: slug,
    })
      .populate("genre", "name")
      .populate("author", "firstName lastName");
    if (!book) {
      // If Book not found
      return res.status(404).json({
        message: "Book not found",
      });
    }
    // Sending Response
    return res.status(200).json({
      book: {
        id: book._id,
        title: book.title,
        slug: book.slug,
        copies: book.copies,
        author: book.author,
        genre: {
          id: book.genre._id,
          name: book.genre.name,
        },
      },
      message: "Book fetched",
      success: true,
    });
  } catch (err) {
    // Tackling Errors
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Exporting Router
module.exports = router;
