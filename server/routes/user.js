var express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/usercontroller");

/* GET users listing. */
router.get("/", usercontroller.getAllUsers);

module.exports = router;
