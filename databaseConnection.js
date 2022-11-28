let mongoose = require("mongoose");

// Connecting to MongoDB

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });
