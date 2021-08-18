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
    // this line....
    // this line uses the id of req.progress to find a progress object with the same id
    // so you're looking for a progress object that's the same as req.progress
    // but you already have it as req.progress
    // its like talking to your friend on the phone, and telling them:
    // "Wait! I can't find my phone 💔 Help me find it! PLEASE!"
    // see what I mean?
    // the preferences is already included in the login token
    // FE already has it, no need for this route/controller.
    const progress = await Progress.findByPk(req.progress.id);
    res.json(progress);
  } catch (error) {
    next(error);
  }
};

// you dont need this controller ever
// no user is gonna see a list of other users' preferences
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

// ????
/*
       const response = await instance.put(`/progress/${updatedProgress.id}`, updatedProgress);
        for (const key in this.progress)
        this.progress[key] = response.data[key];
       */
