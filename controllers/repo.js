const db = require("../models");

function create(repo, username) {
  return db.Repo.create({
    repoId: repo.repoId,
    name: repo.name,
    description: repo.description,
    repoUrl: repo.repoUrl,
    lastUpdate: repo.lastUpdate,
    UserUsername: username
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

function destroy(repo, username) {
  return db.Repo.destroy({
    where: {
      repoId: repo.repoId,
      UserUsername: username
    }
  });
}

module.exports = {
  update,
  create,
  destroy
};
