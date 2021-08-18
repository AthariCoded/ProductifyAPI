// i think a better name for this model is TaskTodoItem or TaskChecklistItem
// because this model isn't the whole checklist, it's only one item within it.
module.exports = (sequelize, DataTypes) => {
  const CheckList = sequelize.define("CheckList", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "CheckList name is required",
        },
      },
    },
    done: {
      type: DataTypes.BOOLEAN,
    },
  });

  return CheckList;
};
