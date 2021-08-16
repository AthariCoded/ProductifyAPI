const { Progress } = require("../../db/models");

exports.fetchProgress = async (progressId, next) => {
  try {
    const progress = await Progress.findByPk(progressId);
    return progress;
  } catch (error) {
    next(error);
  }
};

exports.fetchUserProgress = async (req, res, next) => {
  try {
    const progress = await Progress.findByPk(req.progress.id);
    res.json(progress);
  } catch (error) {
    next(error);
  }
};

exports.progressFetch = async (req, res, next) => {
  try {
    const progresses = await Progress.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(progresses);
  } catch (error) {
    next(error);
  }
};

exports.updateProgress = async (req, res, next) => {
  try {
    if (req.progress.userId === req.user.id) {
      const updatedProgress = await req.progress.update(req.body);
      res.json(updatedProgress);
    } else {
      const err = new Error("Unauthorized!");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};
