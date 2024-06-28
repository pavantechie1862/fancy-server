const express = require("express");
const router = express.Router();
const materialTestingQuotation = require("../reports/materialTestingQuotation");

router.post("/material-testing-quotation", materialTestingQuotation);
module.exports = router;
