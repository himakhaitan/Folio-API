const express = require("express");

const router = express.Router();

// Including Add Routes
router.use("/book", require("./book"));
// router.use("/author", require("./author"));
router.use("/genre", require("./genre"));
router.use("/user", require("./user"));


module.exports = router;
