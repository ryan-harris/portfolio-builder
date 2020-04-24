const axios = require("axios");
const repoController = require("../controllers/repo");
const userController = require("../controllers/user");

async function buildUserInfo(req, res, next) {
  const databaseData = await userController.getUser(req.user.username);
  const githubUserInfo = await getUserInfo(databaseData.ghUsername); //object
  const githubUserRepos = await getUserRepos(databaseData.ghUsername); //array

  //update user info where columns null
  await userController.updateWhereNull(githubUserInfo, databaseData);
  githubUserRepos.forEach(async repo => {
    await repoController.findOrCreate(repo, req.user.username);
    await repoController.update(repo);
  });
  req.userData = await constructData(req.user.username);

  next();
}

function getUserInfo(username) {
  return axios
    .get("https://api.github.com/users/" + username)
    .then(response => {
      return {
        profileImg: response.data.avatar_url,
        aboutMe: response.data.bio,
        displayName: response.data.name || username
      };
    });
}

function getUserRepos(username) {
  return axios
    .get("https://api.github.com/users/" + username + "/repos")
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

async function constructData(username) {
  const userData = await userController.getUser(username).then(data => {
    return data.toJSON();
  });

  const returnData = {
    repos: userData.Repos,
    displayName: userData.displayName,
    aboutMe: userData.aboutMe,
    profileImage: userData.profileImg,
    theme: userData.theme,
    layout: userData.layout,
    ghUsername: userData.ghUsername,
    username: userData.username
  };
  return returnData;
}

module.exports = buildUserInfo;
