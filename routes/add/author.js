const express = require("express");

// Creating Router
const router = express.Router();

router.post("/author", (req, res) => {
  return res.send("Author Route");
});

module.exports = router;
