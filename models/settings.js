module.exports = function(sequelize, DataTypes) {
  const Settings = sequelize.define("Settings", {
    theme: {
      type: DataTypes.STRING,
      allowNull: false
    },
    layout: DataTypes.STRING,
    aboutMe: DataTypes.STRING,
    ghUsername: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileImg: DataTypes.STRING,
    displayName: DataTypes.STRING
  });

  Settings.associate = models => {
    models.Settings.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Settings;
};
