const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;

// Importing Validators
const { bookValidator } = require("../../validation/addValidator");

// Importing Models
const Book = require("../../models/Book");
const Author = require("../../models/Author");
const Genre = require("../../models/Genre");

// Creating Router
const router = express.Router();

/*
  @route  POST /api/add/book
  @desc   Add a Book in the Database
  @access Public
  @params { title, genre, author}
  @return { book, success, message }
*/
router.get("/book", async (req, res) => {
  // Validating Request Body
  const { errors, isValid } = bookValidator(req.body);

  // If Data is not valid return 400 Status
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Creating slug from Title
  let slug = req.body.title.toLowerCase().replace(/ /g, "-");

  // Find the Author
  try {
    // Fetching the Author
    let author = await Author.findById(req.body.author);
    if (!author) {
      throw new Error("Author not found");
    }
  } catch (err) {
    errors.author = err.message;
    return res.status(400).json(errors);
  }

  // Find the Genre
  try {
    // Fetching the Genre
    let genre = await Genre.findById(req.body.genre);
    if (!genre) {
      throw new Error("Genre not found");
    }
  } catch (err) {
    errors.genre = err.message;
    return res.status(400).json(errors);
  }

  // Creating a Book
  const book = new Book({
    title: req.body.title,
    slug,
    author: new ObjectId(req.body.author),
    genre: new ObjectId(req.body.genre),
  });

  // Saving the Book
  try {
    await book.save();
  } catch (err) {
    console.log(err);
  }

  // Sending Response
  res.json({
    book,
    success: true,
    message: "Book added successfully!",
  });
});

// Exporting Router
module.exports = router;
