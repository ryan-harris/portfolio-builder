const axios = require("axios");

function getUserInfo(req, res, next) {
  const userData = {};
  // TODO: issue #47 get user info from database
  // will need join between repos and user information

  // TODO: issue #46 get user repos from github

  const userName = req.user.ghUsername;

  axios.get("https://api.github.com/users/" + userName).then(response => {
    userData.profileImg = response.data.avatar_url;
    userData.about = response.data.bio;
  });

  // TODO: issue #45 get user info from github

  // assign the data here to pass along to next function
  req.userData = "some data";

  next();
}

module.exports = getUserInfo;
