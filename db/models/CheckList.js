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
