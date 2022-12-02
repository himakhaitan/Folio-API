const express = require("express");

const router = express.Router();

router.use("/book", require("./book"));
router.use("/", require("./author"));
router.use("/", require("./genre"));
router.use("/", require("./user"));


module.exports = router;
