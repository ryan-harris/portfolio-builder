// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  // MOCK OUT LOGGED IN USER
  // req.user = {};
  // req.user.username = "test";
  // req.user.password = "test";
  if (!req.user) {
    res.redirect("/");
  }
  if (req.user) {
    if (
      req.user.username.toLowerCase() === "admin" ||
      req.user.role.toLowerCase() === "admin"
    ) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  }
};
