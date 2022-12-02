const express = require("express");

const router = express.Router();

router.use("/book", require("./book"));
router.use("/user", require("./user"));


module.exports = router;
