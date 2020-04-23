const axios = require("axios");
// const userData = { repoList: [] };

// TODO: issue #47 get user info from database
// will need join between repos and user information

// TODO: issue #46 get user repos from github
//req.user.ghUsername

async function buildUserInfo(req, res, next) {
  req.user = {};
  req.user.ghUsername = "tylorkolbeck";
  const githubUserInfo = await getUserInfo(req.user.ghUsername); //object
  const githubUserRepos = await getUserRepos(req.user.ghUsername); //array

  interpolateDataHere();

  console.log(githubUserInfo, githubUserRepos);
  next();
}

function getUserInfo(userName) {
  return axios
    .get("https://api.github.com/users/" + userName)
    .then(response => {
      return {
        profileImg: response.data.avatar_url,
        about: response.data.bio,
        name: response.data.name
      };
    });
}

function getUserRepos(userName) {
  return axios
    .get("https://api.github.com/users/" + userName + "/repos")
    .then(response => {
      return response.data.map(repo => {
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          repoUrl: repo.html_url
        };
      });
    });
}

function interpolateDataHere() {
  return null;
}

module.exports = buildUserInfo;
