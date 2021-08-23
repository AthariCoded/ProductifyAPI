module.exports = (sequelize, DataTypes) => {
  const TaskNote = sequelize.define("TaskNote", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Note name is required",
        },
      },
    },
  });

  return TaskNote;
};
