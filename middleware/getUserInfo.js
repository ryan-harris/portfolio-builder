const axios = require("axios");
const repoController = require("../controllers/repo");
const userController = require("../controllers/user");

async function buildUserInfo(req, res, next) {
  const githubUserInfo = await getUserInfo(req.user.ghUsername); //object
  const githubUserRepos = await getUserRepos(req.user.ghUsername); //array
  const databaseData = await userController.getUser(req.user.username);

  //update user info where columns null
  userController.updateWhereNull(githubUserInfo, databaseData);
  githubUserRepos.forEach(repo => {
    repoController.findOrCreate(repo, databaseData.id);
    repoController.update(repo);
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
        aboutMe: response.data.bio,
        displayName: response.data.name
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

function interpolateData() {
  return null;
}

module.exports = buildUserInfo;
