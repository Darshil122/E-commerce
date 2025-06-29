const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const {handleUserLoginSign} = require("../controller/user");
const router = express.Router();

router.post("/", handleUserLoginSign);

module.exports = router;
