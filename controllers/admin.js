const db = require("../models");
const moment = require("moment");

function removeUser(req, res) {
  db.User.destroy({
    where: {
      username: req.params.username
    }
  })
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function() {
      res.sendStatus(404);
    });
}

async function getDatabaseStats() {
  const usage = await getStorageUsage();
  const users = await getNumberOfUsers();
  const repos = await getNumberOfRepos();
  const userData = await getAllUsers();

  return {
    storage: usage[0].MB,
    users: users.count,
    repos: repos.count,
    userData: userData
  };
}

function getNumberOfUsers() {
  return db.User.findAndCountAll({
    where: {
      username: {
        [db.Sequelize.Op.ne]: "admin"
      }
    }
  });
}

function getNumberOfRepos() {
  return db.Repo.findAndCountAll();
}

function getStorageUsage() {
  const dbName = db.sequelize.getDatabaseName();
  return db.sequelize.query(
    `
    SELECT table_schema "Database",
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 1) "MB" 
    FROM information_schema.tables 
    WHERE table_schema = "${dbName}"
    `,
    { type: db.sequelize.QueryTypes.SELECT }
  );
}

function getAllUsers() {
  return db.User.findAll({
    include: {
      model: db.Repo
    },
    where: {
      username: {
        [db.Sequelize.Op.ne]: "admin"
      }
    }
  }).then(users => {
    return users.map(user => {
      return {
        totalRepos: user.Repos.length,
        username: user.dataValues.username,
        signedUp: moment(user.dataValues.createdAt).format("MMM Do YYYY"),
        ghUsername: user.dataValues.ghUsername,
        role: user.dataValues.role
      };
    });
  });
}

module.exports = {
  removeUser,
  getDatabaseStats
};
