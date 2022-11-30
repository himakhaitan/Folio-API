const express = require("express");

const router = express.Router();

// Importing Models
const Genre = require("../../models/Genre");

// Importing Validators
const { genreValidator } = require("../../validation/addValidator");

router.post("/genre", async (req, res) => {
  // Validating Request Body

  const { errors, isValid } = genreValidator(req.body);

  // Checking Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Creating Slug
  const slug = req.body.name.toLowerCase().replace(/ /g, "-");

  // Checking for existing genre
  try {
    const genre = await Genre.findOne({
      slug: slug,
    });
    if (genre) {
      errors.name = "Genre already exists";
      return res.status(400).json(errors);
    }
  } catch (err) {
    console.log(err);
  }

  // Creating a New Genre
  const newGenre = new Genre({
    name: req.body.name.toLowerCase(),
    slug: slug,
    books: [],
  });

  // Saving the New Genre
  try {
    await newGenre.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  // Returning the New Genre
  return res.status(200).json({
    message: "Genre Added Successfully",
    success: true,
    genre: newGenre,
  });
});

module.exports = router;
