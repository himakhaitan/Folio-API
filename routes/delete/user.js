const express = require("express");
const { default: mongoose } = require("mongoose");

// Importing Models
const User = require("../../models/User");
const Book = require("../../models/Book");

const router = express.Router();

// Delete user using Object ID
router.delete("/:id", async (req, res) => {
  // Extract Object ID
  const id = req.params.id;

  // Verifying Object ID
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "Invalid Object ID",
      success: false,
    });
  }

  // Deleting User
  let user;
  try {
    user = await User.findByIdAndDelete(id);

    // If no user is found
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
  } catch (err) {
    // Handling Errors
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }

  // Unissuing All the books

  user.issues.forEach(async (issue) => {
    try {
      const book = await Book.findById(issue.book);
      book.issuer = null;
      book.save();
    } catch (err) {
      // Handling Errors
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  });

  // Sending Response
  return res.status(200).json({
    message: "User Deleted",
    user: id,
    success: true,
  });
});

module.exports = router;
