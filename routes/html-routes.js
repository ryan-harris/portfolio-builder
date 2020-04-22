// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const express = require("express");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

const router = express.Router();

router.get("/", function(req, res) {
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/login", function(req, res) {
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/signup", function(req, res) {
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/dashboard", isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, "../public/dashboard.html"));
});

module.exports = router;
