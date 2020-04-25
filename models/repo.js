module.exports = function(sequelize, DataTypes) {
  const Repo = sequelize.define("Repo", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    included: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    repoId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    repoUrl: DataTypes.STRING,
    demoUrl: DataTypes.STRING,
    lastUpdate: DataTypes.DATE
  });

  Repo.associate = models => {
    models.Repo.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Repo;
};
