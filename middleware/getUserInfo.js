function getUserInfo(req, res, next) {
  // TODO: issue #47 get user info from database
  // will need join between repos and user information

  // TODO: issue #46 get user repos from github

  // TODO: issue #45 get user info from github

  // assign the data here to pass along to next function
  req.userData = "some data";
  next();
}

module.exports = getUserInfo;
