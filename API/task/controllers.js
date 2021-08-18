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
    // findAll?
    // you don't want to give back ALL tasks in the DB
    // just the tasks that belong to the user
    // make sure to filter it properly.
    // also, make sure to include within each task its list of checklist items.
    // no need for another route/controller for the checklist, you can include
    // it here within each task.
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
    // you should keep the permissions condition
    // if (req.task.userId === req.user.id) {
    // if you define this as a normal update route
    // then you won't need this line here
    req.body.done = !req.task.done;

    // because this line here updates the `done` property.
    // So in FE you pass in the body of the request
    // an object with the value of `done` set to `true`.
    // So all the BE does is update the object,
    // the FE says to update the `done` field.
    const updatedTask = await req.task.update(req.body);
    res.json(updatedTask);
    // } else {

    // if you're removing the permissions condition
    // you have to remove these lines too
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
