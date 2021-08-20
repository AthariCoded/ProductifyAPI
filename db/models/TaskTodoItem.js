module.exports = (sequelize, DataTypes) => {
  const TaskTodoItem = sequelize.define("TaskTodoItem", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Todo name is required",
        },
      },
    },
    done: {
      type: DataTypes.BOOLEAN,
    },
  });

  return TaskTodoItem;
};
