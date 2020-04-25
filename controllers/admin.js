const db = require("../models");

function removeUser(req, res) {
  db.User.destroy({
    where: {
      username: req.params.username
    }
  })
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.sendStatus(404);
    });
}

module.exports = {
  removeUser
};
