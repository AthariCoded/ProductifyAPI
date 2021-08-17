module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Task name is required",
        },
      },
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Task start date is required",
        },
      },
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Task end date is required",
        },
      },
    },
    hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "hours is required",
        },
      },
    },
    done: {
      type: DataTypes.BOOLEAN,
    },
  });

  return Task;
};
