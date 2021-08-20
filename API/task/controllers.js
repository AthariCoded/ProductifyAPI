const { Task, TaskTodoItem } = require("../../db/models");

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
      include: {
        model: TaskTodoItem,
        as: "taskTodoItems",
        attributes: ["id", "text", "done"],
      },
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

exports.updateTask = async (req, res, next) => {
  try {
    if (req.task.userId === req.user.id) {
      const updatedTask = await req.task.update(req.body);
      res.json(updatedTask);
    } else {
      const err = new Error("Unauthorized!");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};

// Create a todo item for a task
exports.createTaskTodoItem = async (req, res, next) => {
  try {
    if (req.user.id === req.task.userId) {
      req.body.taskId = req.task.id;
      const newTaskTodoItem = await TaskTodoItem.create(req.body);
      // response: 201 CREATED
      res.status(201).json(newTaskTodoItem);
    } else {
      const err = new Error("Unauthorized|!");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};

// Delete a todo item of a task

exports.deleteTaskTodoItem = async (req, res, next) => {
  try {
    if (req.user.id === req.task.userId) {
      await req.taskTodoItems.destroy();
      res.status(204).end(); // NO CONTENT
    } else {
      const err = new Error("Unauthorized!");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};
