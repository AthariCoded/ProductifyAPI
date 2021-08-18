const { CheckList, Task } = require("../../db/models");

exports.fetchTask = async (taskId, next) => {
  try {
    const foundTask = await Task.findByPk(taskId);
    return foundTask;
  } catch (error) {
    next(error);
  }
};

exports.checklistsFetch = async (req, res, next) => {
  try {
    const checklists = await CheckList.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: { model: Task, as: "task", attributes: ["name"] },
    });
    res.json(checklists);
  } catch (error) {
    next(error);
  }
};

exports.createChecklist = async (req, res, next) => {
  try {
    req.body.taskId = req.task.id;
    req.body.done = false;

    const newChecklist = await CheckList.create(req.body);

    res.status(201).json(newChecklist);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
