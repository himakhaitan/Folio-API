const mongoose = require("mongoose");
const isEmpty = require("../utils/isEmpty");

const addValidator = (data) => {
  let errors = {};
  data.user = isEmpty(data.user) ? "" : data.user;

  if (!mongoose.isValidObjectId(data.user)) {
    errors.user = "User is not valid";
  }
  data.book = isEmpty(data.book) ? "" : data.book;

  if (!mongoose.isValidObjectId(data.book)) {
    errors.book = "Book is not valid";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const removeValidator = (data) => {
  let errors = {};
  data.book = isEmpty(data.book) ? "" : data.book;

  if (!mongoose.isValidObjectId(data.book)) {
    errors.book = "Book is not valid";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = {
  addValidator,
  removeValidator,
};
