const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const role = require("../../config/role");

// Importing Middleware
const authMiddleware = require("../../middlewares/auth");

// Importing Models
const User = require("../../models/User");

/*
  @route  GET /api/data/user/id/:id
  @desc   Get a User by Object ID
  @access { admin employee }
  @params { id }
  @return { user messsage success }
*/

router.get(
  "/id/:id",
  authMiddleware([role.admin, role.employee, role.common]),
  async (req, res) => {
    // Getting the User ID
    let id = req.params.id;

    // Checking the Object ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid Object ID",
      });
    }

    // Fetching the User
    try {
      const user = await User.findById(id);
      if (!user) {
        // If User not found
        return res.status(404).json({
          message: "User not found",
        });
      }
      // Sending Response
      return res.status(200).json({
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          regNo: user.regNo,
          issues: user.issues,
          dues: user.dues,
        },
        success: true,
        message: "User found",
      });
    } catch (err) {
      // Dealing with Errors
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);

/*
  @route  GET /api/data/user/regNo/:regNo
  @desc   Get a User by Registration Number
  @access { admin employee }
  @params { regNo }
  @return { user messsage success }
*/

router.get(
  "/regNo/:regNo",
  authMiddleware([role.admin, role.employee]),
  async (req, res) => {
    // Getting the Registration Number
    let regNo = req.params.regNo;

    // Cheking the Registration Number
    if (regNo.length != 8) {
      return res.status(400).json({
        message: "Invalid Registration Number",
      });
    }

    // Fetching the User
    try {
      const user = await User.findOne({
        regNo: regNo,
      });
      if (!user) {
        // If User not found
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Sending Response
      return res.status(200).json({
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          regNo: user.regNo,
          issues: user.issues,
          dues: user.dues,
        },
        success: true,
        message: "User found",
      });
    } catch (err) {
      // Dealing with Errors
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);

module.exports = router;
