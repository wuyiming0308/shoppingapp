const express = require("express");
const { login, signup } = require("../controllers/authenticationcontroller");
const router = express.Router();

/* Handle login request. */
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
