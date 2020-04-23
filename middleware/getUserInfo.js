const axios = require("axios");
const db = require("../models");
const repoController = require("../controllers/repo");

async function buildUserInfo(req, res, next) {
  const githubUserInfo = await getUserInfo(req.user.ghUsername); //object
  const githubUserRepos = await getUserRepos(req.user.ghUsername); //array
  const databaseData = await getDatabaseData(req.user.username);

  githubUserRepos.forEach(repo => {
    // not updating anything in our database with new info for an existing repo
    repoController.findOrCreate(repo, databaseData.id);
  });
  interpolateData(githubUserInfo, githubUserRepos, databaseData);

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

function getDatabaseData(username) {
  return db.User.findOne({
    include: db.Repo,
    where: {
      username: username
    }
  });
}

function interpolateData() {
  return null;
}

module.exports = buildUserInfo;
