const bcrypt = require("bcryptjs");

// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return;
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user"
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "theme1"
    },
    layout: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "layout1"
    },
    aboutMe: DataTypes.TEXT,
    ghUsername: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileImg: DataTypes.STRING,
    displayName: DataTypes.STRING
  });

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.getDataValue("password"));
  };

  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.getDataValue("password"),
      bcrypt.genSaltSync(10),
      null
    );
  });

  User.associate = models => {
    models.User.hasMany(models.Repo, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return User;
};
