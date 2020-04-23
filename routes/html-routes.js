// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const express = require("express");
const getUserInfo = require("../middleware/getUserInfo");

// Requiring our custom middleware for checking if a user is logged in
// const isAuthenticated = require("../config/middleware/isAuthenticated");

const router = express.Router();

router.get("/", function(req, res) {
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.render("index");
});

router.get("/login", function(req, res) {
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.render("login");
});

router.get("/signup", function(req, res) {
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

// router.get("/dashboard", isAuthenticated, getUserInfo, function(req, res) {
router.get("/dashboard", getUserInfo, function(req, res) {
  // res.render("dashboard", req.userData);
  // console.log(req.userData);
  res.sendStatus(200);
});

module.exports = router;
