// Requiring necessary npm packages
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const htmlRouter = require("./routes/html-routes.js");
const apiRouter = require("./routes/api-routes.js");
const compression = require("compression");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const hbs = exphbs.create({
  helpers: {
    ifEq: function(a, b, options) {
      if (a === b) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  }
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// We need to use sessions to keep track of our user's login status
app.use(
  session({
    secret: process.env.HASH_STRING,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
app.use(htmlRouter);
app.use(apiRouter);

app.use(compression());

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ alter: true }).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
