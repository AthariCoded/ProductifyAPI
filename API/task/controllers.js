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

exports.markTask = async (req, res, next) => {
  try {
    // if (req.trip.userId === req.user.id) {
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

exports.deleteTask = async (req, res, next) => {
    try {
      /* The user deleting the trip must be the creator*/ //error with req.user says undef
      if (req.user.id !== req.task.userId) {
        const error = new Error("Unauthorized.");
        error.status = 401;
        return next(error);
      }
      await req.task.destroy();
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
