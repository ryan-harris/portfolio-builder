const db = require("../models");

function findOrCreate(repo, username) {
  return db.Repo.findOrCreate({
    where: {
      repoId: repo.id
    },
    defaults: {
      repoId: repo.id,
      name: repo.name,
      description: repo.description,
      repoUrl: repo.repoUrl,
      UserUsername: username
    }
  });
}

function update(repo) {
  return db.Repo.update(
    {
      name: repo.name,
      description: repo.description,
      repoUrl: repo.repoUrl
    },
    {
      where: {
        repoId: repo.id
      }
    }
  );
}

module.exports = {
  findOrCreate,
  update
};
