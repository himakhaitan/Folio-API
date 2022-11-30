const mongoose = require("mongoose");

// Custom isEmpty function
const isEmpty = require("../utils/isEmpty");

// Custom isEmail function
const isEmail = require("../utils/isEmail");

// Custom isDate function
const isDate = require("../utils/isDate");

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

  // Validating First Name
  data.firstName = isEmpty(data.firstName) ? "" : data.firstName;

  if (data.firstName.length < 3) {
    errors.firstName = "First Name must be at least 3 characters long";
  }

  if (data.firstName.length == 0) {
    errors.firstName = "First Name is required";
  }

  // Validating Last Name
  data.lastName = isEmpty(data.lastName) ? "" : data.lastName;

  if (data.lastName.length < 3) {
    errors.lastName = "Last Name must be at least 3 characters long";
  }

  if (data.lastName.length == 0) {
    errors.lastName = "Last Name is required";
  }
  
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// Genre Validator
const genreValidator = (data) => {
  let errors = {};

  // Validating Name
  data.name = isEmpty(data.name) ? "" : data.name;

  if (data.name.length < 3) {
    errors.name = "Name must be at least 3 characters long";
  }

  if (data.name.length == 0) {
    errors.name = "Name is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// User Validator
const userValidator = (data) => {
  let errors = {};

  // Validating First Name
  data.firstName = isEmpty(data.firstName) ? "" : data.firstName;

  if (data.firstName.length < 3) {
    errors.firstName = "First Name must be at least 3 characters long";
  }

  if (data.firstName.length == 0) {
    errors.firstName = "First Name is required";
  }

  // Validating Last Name
  data.lastName = isEmpty(data.lastName) ? "" : data.lastName;

  if (data.lastName.length < 3) {
    errors.lastName = "Last Name must be at least 3 characters long";
  }

  if (data.lastName.length == 0) {
    errors.lastName = "Last Name is required";
  }

  // Validating Email
  data.email = isEmpty(data.email) ? "" : data.email;

  if (!isEmail(data.email)) {
    errors.email = "Email is not valid";
  }

  // Validating Registration Number
  data.regNo = isEmpty(data.regNo) ? "" : data.regNo;
  data.regNo = data.regNo.toUpperCase();
  if (data.regNo.length != 8) {
    errors.regNo = "Invalid Registration Number";
  }

  if (data.regNo.length == 0) {
    errors.regNo = "Registration Number is required";
  }

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
  userValidator,
};
