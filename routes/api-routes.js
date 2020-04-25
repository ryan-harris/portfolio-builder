const express = require("express");
const passport = require("../config/passport");
const userController = require("../controllers/user");
const dashController = require("../controllers/dashboard");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), userController.login);

router.post("/api/signup", userController.signup);

router.get("/api/logout", userController.logout);

router.patch("/api/profile", isAuthenticated, dashController.profileSave);

router.patch(
  "/api/repo/include/:id",
  isAuthenticated,
  dashController.repoInclude
);

router.patch(
  "/api/profile/github",
  isAuthenticated,
  dashController.ghUsernameUpdate
);

router.patch(
  "/api/profile/layout",
  isAuthenticated,
  dashController.updateLayout
);

router.patch("/api/profile/theme", isAuthenticated, dashController.updateTheme);

module.exports = router;
