const express = require("express");
const role = require("../../config/role");

// Defining Data Types
const ObjectId = require("mongoose").Types.ObjectId;

// Importing Validators
const { bookValidator } = require("../../validation/addValidator");

// Importing Middlewares
const authMiddleware = require("../../middlewares/auth");

// Importing Models
const Book = require("../../models/Book");
const Author = require("../../models/Author");
const Genre = require("../../models/Genre");

// Creating Router
const router = express.Router();

/*
  @route  POST /api/add/book
  @desc   Add a Book in the Database
  @access { admin employee }
  @params { title, genre, author}
  @return { book, success, message }
*/

router.post(
  "/book",
  authMiddleware([role.admin, role.employee]),
  async (req, res) => {
    // Validating Request Body
    const { errors, isValid } = bookValidator(req.body);

    // If Data is not valid return 400 Status
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Creating slug from Title
    let slug = req.body.title.toLowerCase().replace(/ /g, "-");

    // Checking for existing book
    try {
      let book = await Book.findOne({
        slug: slug,
      });
      if (book) {
        return res.status(400).json({
          message: "Book already exists",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    // Find the Author
    let author;
    try {
      // Fetching the Author
      author = await Author.findById(req.body.author);
      if (!author) {
        throw new Error("Author not found");
      }
    } catch (err) {
      errors.author = err.message;
      return res.status(400).json(errors);
    }

    // Find the Genre
    let genre;
    try {
      // Fetching the Genre
      genre = await Genre.findById(req.body.genre);
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

    // Updating Author
    try {
      // Checking if Book is already in there
      if (author.books.includes(book.id)) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      // Pushing Book into Authors Array
      author.books.push(book.id);
      await author.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
    // Updating Genre
    try {
      // Checking if Book is already in there
      if (genre.books.includes(book.id)) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      // Pushing Books into Genre Array
      genre.books.push(book.id);
      await genre.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    // Saving the Book
    try {
      await book.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    // Sending Response
    res.json({
      book,
      success: true,
      message: "Book added successfully!",
    });
  }
);

// Exporting Router
module.exports = router;
