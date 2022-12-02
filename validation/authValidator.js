const isEmpty = require("../utils/isEmpty");
const isEmail = require("../utils/isEmail");

const registerValidator = (data) => {
  let errors = {};

  // Validating Username
  data.username = isEmpty(data.username) ? "" : data.username;

  if (isEmail(data.username)) {
    errors.username = "Email and Username can't be same";
  }

  if (data.username.length == 0) {
    errors.username = "Username is Required";
  }

  // Validating Email
  data.email = isEmpty(data.email) ? "" : data.email;

  if (!isEmail(data.email)) {
    errors.email = "Email is Invalid";
  }

  if (data.email.length == 0) {
    errors.email = "Email is Required";
  }

  // Validating Password
  data.password = isEmpty(data.password) ? "" : data.password;

  if (data.password.length < 8) {
    errors.password = "Password must be 8 charachters long";
  }

  if (data.password.length == 0) {
    errors.password = "Password is Required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const loginValidator = (data) => {
  let errors = {};

  // Validating username or email
  data.username = isEmpty(data.username) ? "" : data.username;

  if (data.username.length == 0) {
    errors.username = "Username/Email is required";
  }

  // Validating Password
  data.password = isEmpty(data.password) ? "" : data.password;
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = {
  loginValidator,
  registerValidator,
};
