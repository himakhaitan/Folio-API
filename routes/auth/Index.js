const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

// Importing Models
const Admin = require("../../models/Admin");

// Importing Validators
const {
  loginValidator,
  registerValidator,
} = require("../../validation/authValidator");

/*
  @route  POST /auth/register
  @desc   Register Route
  @access Public
  @params { username email password }
  @return { admin messsage success }
*/

router.post("/register", async (req, res) => {
  // Validating Request Body
  const { errors, isValid } = registerValidator(req.body);

  if (!isValid) {
    return res.status(400).json({
      message: "Invalid Data",
      errors,
    });
  }

  // Checking if the Admin exists
  let admin;
  try {
    // Checking Emails
    admin = await Admin.findOne({
      email: req.body.email,
    });

    // If an admin with given email exists
    if (admin) {
      return res.status(400).json({
        message: "Email is already in Use",
        success: false,
      });
    }

    // Checking Username
    admin = await Admin.findOne({
      username: req.body.username,
    });

    // If an admin with given username exists
    if (admin) {
      return res.status(400).json({
        message: "Username is already in Use",
        success: false,
      });
    }
  } catch (err) {
    // Handling Errors
    console.log(err);
    return res.status(500).json({
      success: false,
      messsage: "Internal Server Error",
    });
  }

  // Hashing the Password
  let noOfRounds = 8;
  try {
    bcrypt.genSalt(noOfRounds, (err, salt) => {
      // Checking for Error
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
          success: false,
        });
      }
      // Hashing Password
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        // Checking for Error
        if (err) {
          return res.status(500).json({
            message: "Internal Server Error",
            success: false,
          });
        }
        // Creating an Admin

        const admin = new Admin({
          username: req.body.username,
          email: req.body.email,
          password: hash,
        });

        // Saving the Admin
        await admin.save();

        // Sending Response
        return res.status(200).json({
          message: "Admin Created",
          success: true,
          admin: {
            username: admin.username,
            email: admin.email,
            role: admin.role,
            id: admin.id,
          },
        });
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

/*
  @route  POST /auth/login
  @desc   Login Route
  @access Public
  @params { username/email password }
  @return { jwt messsage success }
*/

router.post("/login", async (req, res) => {

  // Validating Request Body
  const { errors, isValid } = loginValidator(req.body);

  if (!isValid) {
    return res.status(400).json({
      message: "Invalid Data",
      success: false,
      errors,
    });
  }

  

});

module.exports = router;
