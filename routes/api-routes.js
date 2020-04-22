const passport = require("../config/passport");
const userController = require("../controllers/user");
const express = require("express");

const router = express.Router();

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), userController.login);

router.post("/api/signup", userController.signup);

router.get("/logout", userController.logout);

module.exports = router;
