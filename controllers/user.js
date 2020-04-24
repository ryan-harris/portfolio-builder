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
    password: req.body.password,
    ghUsername: req.body.github
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

function updateWhereNull(updateData, currentData) {
  fields = [];
  if (!currentData.aboutMe) {
    fields.push("aboutMe");
  }
  if (!currentData.profileImg) {
    fields.push("profileImg");
  }
  if (!currentData.displayName) {
    fields.push("displayName");
  }
  return db.User.update(updateData, {
    where: {
      username: currentData.username
    },
    fields: fields
  });
}

function getUser(username) {
  return db.User.findOne({
    include: db.Repo,
    where: {
      username: username
    }
  });
}

function getIncludedRepos(username) {
  return db.User.findOne({
    include: {
      model: db.Repo,
      require: false,
      where: {
        included: true
      }
    },
    where: {
      username: username
    }
  });
}

module.exports = {
  login,
  signup,
  logout,
  updateWhereNull,
  getUser,
  getIncludedRepos
};
