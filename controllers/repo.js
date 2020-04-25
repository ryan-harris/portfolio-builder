const db = require("../models");

function findOrCreate(repo, username) {
  return db.Repo.findOrCreate({
    where: {
      repoId: repo.repoId,
      UserUsername: username
    },
    defaults: {
      repoId: repo.id,
      name: repo.name,
      description: repo.description,
      repoUrl: repo.repoUrl,
      lastUpdate: repo.lastUpdate,
      UserUsername: username
    }
  });
}

function update(repo, username) {
  return db.Repo.update(
    {
      name: repo.name,
      description: repo.description,
      repoUrl: repo.repoUrl,
      lastUpdate: repo.lastUpdate
    },
    {
      where: {
        repoId: repo.repoId,
        UserUsername: username
      }
    }
  );
}

module.exports = {
  findOrCreate,
  update
};
