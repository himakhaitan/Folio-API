const express = require("express");

const router = express.Router();

router.post("/genre", (req, res) => {
  return res.send("Genre Route");
});

module.exports = router;
