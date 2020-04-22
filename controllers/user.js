const db = require("../models");

function login(req, res) {
  res.json({
    username: req.user.username,
    id: req.user.id
  });
}

function signup(req, res) {
  db.User.create({
    username: req.body.username,
    password: req.body.password
  })
    .then(function() {
      res.redirect(307, "/api/login");
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
}

function logout(req, res) {
  req.logout();
  res.redirect("/");
}

module.exports = {
  login,
  signup,
  logout
};
