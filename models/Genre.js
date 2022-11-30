const { Schema, model } = require("mongoose");

// Defining Data Types
let ObjectId = Schema.Types.ObjectId;

// Creating a Schema
const genreSchema = new Schema({
  // Name of the Genre
  name: {
    type: String,
    required: true,
  },
  // Slug of the Genre
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  // Books of the Genre
  books: [
    {
      type: ObjectId,
      ref: "Book",
    },
  ],
});

// Creating a Data Model
const Genre = model("Genre", genreSchema);

// Exporting the Data Model
module.exports = Genre;
