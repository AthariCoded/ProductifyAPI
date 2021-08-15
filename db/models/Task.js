module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Title is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  
    return Task;
  };
  