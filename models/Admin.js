const { Schema, model } = require("mongoose");
const role = require("../config/role");

// Creating a Schema
const adminSchema = new Schema({
  // Username
  username: {
    type: String,
    required: true,
    unique: true,
  },
  // Email
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Password
  password: {
    type: String,
    required: true,
  },
  // Role
  role: {
    type: String,
    enum: [role.admin, role.employee, role.common],
    default: "common",
  },
});

// Creating a Data Model
const Admin = model("Admin", adminSchema);
module.exports = Admin;
