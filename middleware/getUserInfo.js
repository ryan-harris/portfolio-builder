const axios = require("axios");
const repoController = require("../controllers/repo");
const userController = require("../controllers/user");

if (process.env.ACCESS_TOKEN) {
  axios.defaults.headers.common.Authorization = `token ${process.env.ACCESS_TOKEN}`;
}

async function buildUserInfo(req, res, next) {
  const userData = await userController.getUser(req.user.username);
  const ghUserInfo = await getUserInfo(userData.ghUsername); //object
  let ghRepos = [];
  if (ghUserInfo) {
    ghRepos = await getUserRepos(userData.ghUsername, ghUserInfo.numberRepos);
  }

  //update user info where columns null
  if (ghUserInfo && ghRepos) {
    await userController.updateWhereNull(ghUserInfo, userData);
    ghRepos.forEach(repo => {
      repoController.findOrCreate(repo, req.user.username);
      repoController.update(repo, req.user.username);
    });
  }

  req.userData = await constructData(req.user.username);

  next();
}

function getUserInfo(username) {
  return axios
    .get(`https://api.github.com/users/${username}`)
    .then(response => {
      return {
        profileImg: response.data.avatar_url,
        aboutMe: response.data.bio,
        displayName: response.data.name || username,
        numberRepos: response.data.public_repos
      };
    })
    .catch(() => {
      return null;
    });
}

function getUserRepos(username, numberRepos) {
  const numberOfPages = Math.ceil(numberRepos / 100);

  const calls = [];
  for (let i = 1; i <= numberOfPages; i++) {
    calls.push(
      axios.get(
        `https://api.github.com/users/${username}/repos?per_page=100&page=${i}`
      )
    );
  }

  return Promise.all(calls).then(responses => {
    const repos = [];
    responses.forEach(repo => {
      repos.push(repo.data);
    });
    return repos.flat().map(repo => {
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
    userlayout: userData.layout,
    ghUsername: userData.ghUsername,
    username: userData.username
  };
  return returnData;
}

module.exports = buildUserInfo;
