const express = require("express");
const mongoose = require("mongoose");
const role = require("../../config/role");

// Importing Utils
const isEmpty = require("../../utils/isEmpty");

// Importing Middleware
const authMiddleware = require("../../middlewares/auth");

// Instanciating Router
const router = express.Router();

// Importing Models
const Book = require("../../models/Book");
const Author = require("../../models/Author");
const Genre = require("../../models/Genre");
const User = require("../../models/User");

/*
  @route  DELETE /api/delete/book/:id
  @desc   Delete a Book by ID
  @access { admin }
  @params { id }
  @return { messsage success }
*/

router.delete("/:id", authMiddleware([role.admin]), async (req, res) => {
  // Extracting ID
  const id = req.params.id;

  // Validating ID
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "Invalid Object ID",
    });
  }

  // Fetching and Deleting the Book
  let book;
  try {
    book = await Book.findByIdAndDelete(id);

    // if Book not found
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }
  } catch (err) {
    // Dealing with Errors
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  // Checking for an issuer
  if (!isEmpty(book.issuer)) {
    let user = await User.findById(book.issuer);

    // Updating User
    let index = -1;
    user.issues.forEach((issue, i) => {
      if (issue.book == id) {
        index = i;
      }
    });

    if (index > -1) {
      user.issues.splice(index, 1);
    }
  }

  // Deleting from the Genre Array
  let genre;
  try {
    genre = await Genre.findById(book.genre);

    let index = genre.books.indexOf(id);
    genre.books.splice(index, 1);
  } catch (err) {
    // Dealing with Errors
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  // Deleting from the Author Array
  let author;
  try {
    author = await Author.findById(book.author);

    let index = author.books.indexOf(id);
    author.books.splice(index, 1);
  } catch (err) {
    // Dealing with Errors
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  // Saving the Data
  try {
    await author.save();
    await genre.save();
  } catch (err) {
    // Dealing with Errors
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  // Sending Response
  return res.status(200).json({
    message: "Book Deleted Successfully",
    success: true,
  });
});

module.exports = router;
