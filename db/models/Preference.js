module.exports = (sequelize, DataTypes) => {
  const Preference = sequelize.define("Preference", {
    sunday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    monday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tuesday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    wednesday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    thursday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    friday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    saturday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    timeStart: {
      type: DataTypes.STRING,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Time start is required",
        },
      },
    },
    timeEnd: {
      type: DataTypes.STRING,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Time end is required",
        },
      },
    },
  });

  return Preference;
};
