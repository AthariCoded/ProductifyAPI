const { Task } = require("../../db/models");

exports.fetchTask = async (taskId, next) => {
  try {
    const foundTask = await Task.findByPk(taskId);
    return foundTask;
  } catch (error) {
    next(error);
  }
};

exports.tasksFetch = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      //   include: { model: User, as: "user", attributes: ["username"] },
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};
exports.createTask = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    req.body.done = false;

    const newTask = await Task.create(req.body);

    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.markTask = async (req, res, next) => {
  try {
    // if (req.task.userId === req.user.id) {
    req.body.done = !req.task.done;
    const updatedTask = await req.task.update(req.body);
    res.json(updatedTask);
    // } else {
    const err = new Error("Unauthorized!");
    err.status = 401;
    return next(err);
    // }
  } catch (error) {
    next(error);
  }
};
