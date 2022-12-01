const express = require("express");

// Creating Router
const router = express.Router();

// Importing Author Model
const Author = require("../../models/Author");

// Importing Author Validator

const { authorValidator } = require("../../validation/addValidator");


/*
  @route  POST /api/add/author
  @desc   Adding an Author
  @access Public
  @params { firstName lastName }
  @return { author messsage success }
*/

router.post("/author", async (req, res) => {
  // Validating Request Body
  const { errors, isValid } = authorValidator(req.body);

  // If Data is not valid return 400 Status
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Checking for existing author
  try {
    let author = await Author.findOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    // If author exists return 400 Status
    if (author) {
      return res.status(400).json({
        message: "Author already exists",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  // Creating a New Author
  const newAuthor = new Author({
    firstName: req.body.firstName.toLowerCase(),
    lastName: req.body.lastName.toLowerCase(),
    books: [],
  });

  // Saving the New Author
  try {
    await newAuthor.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  // Returning the New Author
  return res.status(200).json({
    message: "Author Added Successfully",
    success: true,
    author: newAuthor,
  });
});

module.exports = router;
