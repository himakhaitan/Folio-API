const mongoose = require("mongoose");
const isEmpty = require("../utils/isEmpty");

const addValidator = (data) => {
  let errors = {};
  data.regNo = isEmpty(data.regNo) ? "" : data.regNo;

  if (data.regNo.length != 8) {
    errors.regNo = "Invalid Registration Number";
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
