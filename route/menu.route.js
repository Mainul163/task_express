const express = require("express");
const { createUser } = require("../controllers/menu.controller");

const router = express.Router();

router.post("/", createUser);

module.exports = router;
