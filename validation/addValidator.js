const mongoose = require("mongoose");

// Custom isEmpty function
const isEmpty = require("../utils/isEmpty");

// Book Valildator
const bookValidator = (data) => {
  let errors = {};

  // Validating Title
  data.title = isEmpty(data.title) ? "" : data.title;

  if (data.title.length < 3) {
    errors.title = "Title must be at least 3 characters long";
  }

  if (data.title.length == 0) {
    errors.title = "Title is required";
  }

  // Validating Genre
  data.genre = isEmpty(data.genre) ? "" : data.genre;

  // Checking for valid Object Id
  if (!mongoose.isValidObjectId(data.genre)) {
    errors.genre = "Genre is not valid";
  }

  if (data.genre.length == 0) {
    errors.genre = "Genre is required";
  }

  // Validating Author
  data.author = isEmpty(data.author) ? "" : data.author;

  // Checking for valid Object Id
  if (!mongoose.isValidObjectId(data.author)) {
    errors.author = "Author is not valid";
  }

  if (data.author.length == 0) {
    errors.author = "Author is required";
  }

  // Returning Errors
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// Author Validator
const authorValidator = (data) => {
  let errors = {};

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// Genre Validator
const genreValidator = (data) => {
  let errors = {};

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// User Validator
const userValidator = (data) => {
  let errors = {};

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// Exporting Validators
module.exports = {
  bookValidator,
  authorValidator,
  genreValidator,
};
