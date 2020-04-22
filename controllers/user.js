function login(req, res) {
  res.json({
    username: req.user.username,
    id: req.user.id
  });
}

module.exports = {
  login
};
