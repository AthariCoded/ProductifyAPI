module.exports = (sequelize, DataTypes) => {
  const Progress = sequelize.define("Progress", {
    username: {
      type: DataTypes.STRING,
    },
    days: {
      type: DataTypes.INTEGER,
    },
    hours: {
      type: DataTypes.INTEGER,
    },
  });

  return Progress;
};
