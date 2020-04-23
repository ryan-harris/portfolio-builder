const axios = require("axios");
const userData = {};
const repoList = [];

function getUserInfo(req, res, next) {
  // TODO: issue #47 get user info from database
  // will need join between repos and user information

  // TODO: issue #46 get user repos from github
  //req.user.ghUsername
  const userName = req.user.ghUsername;

  axios.get("https://api.github.com/users/" + userName).then(response => {
    userData.name = response.data.name;
    userData.profileImg = response.data.avatar_url;
    userData.about = response.data.bio;

    getUserRepos(userName, () => {
      req.userData = userData;
      next();
    });

    // assign the data here to pass along to next function
  });
}

function getUserRepos(userName, callback) {
  axios
    .get("https://api.github.com/users/" + userName + "/repos")
    .then(response => {
      response.data.forEach(repo => {
        const repoData = {
          name: repo.name,
          description: repo.description,
          repoUrl: repo.html_url
        };
        repoList.push(repoData);
      });
      userData.repos = repoList;
      callback();
    });
}

module.exports = getUserInfo;
