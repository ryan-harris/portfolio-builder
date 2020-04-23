const db = require("../models");

function findOrCreate(repo, userId) {
  db.Repo.findOrCreate({
    where: {
      repoId: repo.id
    },
    defaults: {
      repoId: repo.id,
      name: repo.name,
      description: repo.description,
      repoUrl: repo.repoUrl,
      UserId: userId
    }
  }).then();
}

function update(repo) {
  db.Repo.update(repo, {
    where: {
      repoId: repo.id
    }
  });
}

module.exports = {
  findOrCreate,
  update
};
