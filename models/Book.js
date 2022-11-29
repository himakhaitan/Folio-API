const { Schema, model } = require("mongoose");

let ObjectId = Schema.Types.ObjectId;

// Creating a Schema
const bookSchema = new Schema({
  // Title of the book
  title: {
    type: String,
    required: true,
  },
  // Slug of the book
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  // No of Copies of the Book
  copies: {
    type: Number,
    default: 1,
  },
  // Author of the Book
  author: {
    type: ObjectId,
    ref: "Author",
    required: true,
  },
  // Genre of the Book
  genre: {
    type: ObjectId,
    ref: "Genre",
    required: true,
  },
  // Issuer of the Book
  issuer: {
    type: ObjectId,
    ref: "User",
  },
});

// Creating a Data Model
const Book = model("Book", bookSchema);

module.exports = Book;
