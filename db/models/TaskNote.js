module.exports = (sequelize, DataTypes) => {
  const TaskNote = sequelize.define("TaskNote", {
    text: {
      type: DataTypes.TEXT,
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
