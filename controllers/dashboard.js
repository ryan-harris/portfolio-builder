const db = require("../models");

function profileSave(req, res) {
  db.User.update(
    {
      profileImg: req.body.profileImg,
      aboutMe: req.body.aboutMe,
      displayName: req.body.displayName
    },
    {
      where: {
        username: req.user.username
      }
    }
  ).then(data => {
    if (data[0] === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  });
}

function repoInclude(req, res) {
  db.Repo.update(
    {
      included: req.body.included
    },
    {
      where: {
        repoId: req.params.id,
        UserUsername: req.user.username
      }
    }
  ).then(data => {
    if (data[0] === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  });
}

function ghUsernameUpdate(req, res) {
  db.User.update(
    {
      ghUsername: req.body.ghUsername
    },
    {
      where: {
        username: req.user.username
      }
    }
  ).then(data => {
    if (data[0] === 0) {
      return res.sendStatus(404);
    }
    db.Repo.destroy({
      where: {
        UserUsername: req.user.username
      }
    }).then(() => {
      res.sendStatus(200);
    });
  });
}

function updateLayout(req, res) {
  db.User.update(
    {
      layout: req.body.layout
    },
    {
      where: {
        username: req.user.username
      }
    }
  ).then(data => {
    if (data[0] === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  });
}

function updateTheme(req, res) {
  db.User.update(
    {
      theme: req.body.theme
    },
    {
      where: {
        username: req.user.username
      }
    }
  ).then(data => {
    if (data[0] === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  });
}

module.exports = {
  profileSave,
  repoInclude,
  ghUsernameUpdate,
  updateLayout,
  updateTheme
};
