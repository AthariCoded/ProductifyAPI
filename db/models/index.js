"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// user relation with tasks
db.User.hasMany(db.Task, {
  foreignKey: "userId",
  allowNull: false,
  as: "tasks",
});

db.Task.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user",
});

//user relation with preference
db.User.hasOne(db.Preference, {
  as: "preference",
  foreignKey: "userId",
});

db.Preference.belongsTo(db.User, {
  as: "user",
});

// task relation with task-todo-item
db.Task.hasMany(db.TaskTodoItem, {
  foreignKey: "taskId",
  allowNull: false,
  as: "taskTodoItems",
});

db.TaskTodoItem.belongsTo(db.Task, {
  foreignKey: "taskId",
  as: "task",
});

//Task relation with TaskNote
db.Task.hasOne(db.TaskNote, {
  as: "taskNote",
  foreignKey: "taskId",
});

db.TaskNote.belongsTo(db.Task, {
  as: "task",
});

module.exports = db;
