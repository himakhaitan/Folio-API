const express = require("express");

const router = express.Router();

router.get("/book", (req, res) => {
    
  return res.json({
    message: "Book Route",
  });
});

router.use("/author", require("./author"));

module.exports = router;
