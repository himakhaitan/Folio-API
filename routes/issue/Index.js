const express = require("express");
const router = express.Router();
const role = require("../../config/role");

// Importing Models
const User = require("../../models/User");
const Book = require("../../models/Book");

// Importing Validators
const {
  addValidator,
  removeValidator,
} = require("../../validation/issueValidator");

// Importing Middlewares
const authMiddleware = require("../../middlewares/auth");

/*
  @route  POST /api/issue/add 
  @desc   Issue a Book
  @access { admin employee }
  @params { book regNo }
  @return { success message issuedTo regNo book }
*/

router.post(
  "/add",
  authMiddleware([role.admin, role.employee]),
  async (req, res) => {
    //  Validate Req Body
    const { errors, isValid } = addValidator(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Check for the Book ID
    let book;
    try {
      book = await Book.findById(req.body.book);

      if (!book) {
        return res.status(404).json({
          message: "Book not found!",
          success: false,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error!",
      });
    }

    // Check for the User ID
    let user;
    try {
      user = await User.findOne({
        regNo: req.body.regNo,
      });

      if (!user) {
        return res.status(404).json({
          message: "User Not Found!",
          success: false,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error!",
      });
    }

    // Updating Book
    book.issuer = user.id;

    // Updating User
    let isThere = false;
    user.issues.forEach((issue) => {
      if (issue.book == req.body.book) {
        isThere = true;
        issue.issuedAt = Date.now();
      }
    });

    if (!isThere) {
      user.issues.push({
        book: req.body.book,
        issuedAt: Date.now(),
      });
    }

    // Saving Data
    try {
      await user.save();
      await book.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error!",
        success: false,
      });
    }

    // Returning Response
    return res.status(200).json({
      message: "Book Issued",
      issuedTo: user.id,
      regNo: user.regNo,
      book: book.id,
      success: true,
    });
  }
);

/*
  @route  POST /api/issue/remove
  @desc   Retrieve a Book
  @access { admin employee }
  @params { bookID }
  @return { success message book user }
*/

router.post(
  "/remove",
  authMiddleware([role.admin, role.employee]),
  async (req, res) => {
    // Validate Req Body
    const { errors, isValid } = removeValidator(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Check for the Book ID
    let book;
    try {
      book = await Book.findById(req.body.book);

      if (!book) {
        return res.status(404).json({
          message: "Book not found!",
          success: false,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error!",
      });
    }

    // Fetching User
    let user;
    try {
      user = await User.findById(book.issuer);

      if (!user) {
        return res.status(404).json({
          message: "User Not Found!",
          success: false,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error!",
      });
    }

    // Updating User
    let index = -1;
    user.issues.forEach((issue, i) => {
      if (issue.book == req.body.book) {
        index = i;
      }
    });

    if (index > -1) {
      user.issues.splice(index, 1);
    }

    // Updating Book
    book.issuer = null;

    // Saving Data
    try {
      await user.save();
      await book.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error!",
        success: false,
      });
    }

    // Returning Response
    return res.status(200).json({
      message: "Book returned successfully!",
      success: true,
      book: book.id,
      user: user.id,
    });
  }
);

module.exports = router;
