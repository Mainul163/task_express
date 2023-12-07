const express = require("express");
const { registration } = require("../controllers/register.controller");
const router = express.Router();

router.post("/", registration);

module.exports = router;
