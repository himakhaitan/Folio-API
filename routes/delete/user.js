const express = require("express");
const { default: mongoose } = require("mongoose");
const role = require("../../config/role");

// Importing Models
const User = require("../../models/User");
const Book = require("../../models/Book");

// Intanciating Router
const router = express.Router();

// Importing Middleware
const authMiddleware = require("../../middlewares/auth");

/*
  @route  DELETE /api/delete/user/:id
  @desc   Delete a User
  @access { admin }
  @params { id }
  @return { messsage success }
*/

router.delete("/:id", authMiddleware([role.admin]) ,async (req, res) => {

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
