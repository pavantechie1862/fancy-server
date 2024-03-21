const express = require("express");

const { createCallbackRequest } = require("../controllers/bdControllers");

const router = express.Router();

router.post("/on-request-callback", createCallbackRequest);

module.exports = router;
