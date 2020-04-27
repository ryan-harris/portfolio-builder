const axios = require("axios");
const array = require("lodash/array");
const repoController = require("../controllers/repo");
const userController = require("../controllers/user");

if (process.env.ACCESS_TOKEN) {
  axios.defaults.headers.common.Authorization = `token ${process.env.ACCESS_TOKEN}`;
}

async function buildUserInfo(req, res, next) {
  const userData = await userController
    .getUser(req.user.username)
    .then(user => user.toJSON());
  const ghUserInfo = await getUserInfo(userData.ghUsername); //object
  let ghRepos = [];
  if (ghUserInfo) {
    ghRepos = await getUserRepos(userData.ghUsername, ghUserInfo.numberRepos);
  }

  const a = userData.Repos;
  const b = ghRepos;

  const toUpdate = array.intersectionWith(
    b,
    a,
    (b, a) =>
      a.repoId === b.repoId &&
      a.lastUpdate.getTime() !== Date.parse(b.lastUpdate)
  );

  const toCreate = array.differenceWith(b, a, (a, b) => {
    return a.repoId === b.repoId;
  });

  const toDelete = array.differenceWith(a, b, (a, b) => {
    return a.repoId === b.repoId;
  });

  await userController.updateWhereNull(ghUserInfo, userData);
  for (let i = 0; i < toCreate.length; i++) {
    await repoController.create(toCreate[i], req.user.username);
  }
  for (let i = 0; i < toUpdate.length; i++) {
    await repoController.update(toUpdate[i], req.user.username);
  }
  for (let i = 0; i < toDelete.length; i++) {
    await repoController.destroy(toDelete[i], req.user.username);
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
        repoId: repo.id,
        name: repo.name,
        description: repo.description,
        repoUrl: repo.html_url,
        lastUpdate: repo.updated_at
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
    username: userData.username,
    role: userData.role
  };
  return returnData;
}

module.exports = buildUserInfo;
