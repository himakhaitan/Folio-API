const { Schema, model } = require("mongoose");

// Defining Data Types
let ObjectId = Schema.Types.ObjectId;

// Creating a Schema
const authorSchema = new Schema({
  // First Name of the Author
  firstName: {
    type: String,
    required: true,
  },
  // Last Name of the Author
  lastName: {
    type: String,
    required: true,
  },
  // Books of the Author
  books: [
    {
      type: ObjectId,
      ref: "Book",
    },
  ],
});

// Creating a Data Model
const Author = model("Author", authorSchema);

module.exports = Author;
