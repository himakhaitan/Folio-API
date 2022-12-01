const { Schema, model } = require("mongoose");

// Defining Data Types
let ObjectId = Schema.Types.ObjectId;

// Creating a Schema
const userSchema = new Schema({
  // First Name of the User
  firstName: {
    type: String,
    required: true,
  },
  // Last Name of the User
  lastName: {
    type: String,
    required: true,
  },
  // Email of the User
  email: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
    unique: true,
  },
  // Issues of the User
  issues: [
    {
      book: {
        type: ObjectId,
        ref: "Book",
      },
      issuedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  // Dues of the User
  dues: {
    type: Number,
    default: 0,
  },
});

// Creating Data Model
const User = model("User", userSchema);

module.exports = User;
