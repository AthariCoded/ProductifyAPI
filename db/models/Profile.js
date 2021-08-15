module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    
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

  return Profile;
};
