// Requiring path to so we can use relative routes to our HTML files
const express = require("express");
const buildUserInfo = require("../middleware/getUserInfo");
const userController = require("../controllers/user");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

const router = express.Router();

router.get("/", function(req, res) {
  if (req.user) {
    return res.redirect("/dashboard");
  }
  res.render("index");
});

router.get("/login", function(req, res) {
  if (req.user) {
    return res.redirect("/dashboard");
  }
  res.render("login");
});

router.get("/signup", function(req, res) {
  if (req.user) {
    return res.redirect("/dashboard");
  }
  res.render("signup");
});

router.get("/dashboard", isAuthenticated, buildUserInfo, function(req, res) {
  // res.render("dashboard", req.userData);
  // console.log(req.userData);
  // res.sendStatus(200);
  return res.render("dashboard", { ...req.userData, layout: "main" });
});

router.get("/:username", function(req, res) {
  // determine layout and render layout with req.userData
  userController.getUser(req.params.username).then(userData => {
    if (!userData) {
      return res.sendStatus(404);
    }
    res.render(userData.layout, {
      ...userData.toJSON(),
      layout: "public"
    });
  });
});

module.exports = router;
