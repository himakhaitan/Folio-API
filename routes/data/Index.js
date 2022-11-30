const express = require("express");

const router = express.Router();

// Including Add Routes
// router.use("/", require("./book"));
// router.use("/", require("./author"));
// router.use("/", require("./genre"));
router.use("/", require("./user"));


module.exports = router;
