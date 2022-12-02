const { Schema, model } = require("mongoose");

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
    enum: ["admin", "employee", "common"],
    default: "common",
  },
});

// Creating a Data Model
const Admin = model("Admin", adminSchema);
module.exports = Admin;
