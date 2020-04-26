// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  // MOCK OUT LOGGED IN USER
  // req.user = {
  //   username: "admin",
  //   password: "test"
  // };

  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    if (req.user.username.toLowerCase() === "admin") {
      return res.redirect("/dashboard/admin");
    } else {
      return next();
    }
  }

  // If the user isn't logged in, redirect them to the login page
  return res.redirect("/");
};
