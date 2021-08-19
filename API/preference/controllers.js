const { Preference } = require("../../db/models");

exports.updatePreference = async (req, res, next) => {
  try {
    if (req.preference.userId === req.user.id) {
      const updatedPreference = await req.preference.update(req.body);
      res.json(updatedPreference);
    } else {
      const err = new Error("Unauthorized!");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.fetchPreference = async (preferenceId, next) => {
  try {
    const preference = await Preference.findByPk(preferenceId);
    return preference;
  } catch (error) {
    next(error);
  }
};
/*S
exports.fetchUserPreference = async (req, res, next) => {
  try {
    const preference = await Preference.findByPk(req.preference.id);
    res.json(preference);
  } catch (error) {
    next(error);
  }
};

exports.preferenceFetch = async (req, res, next) => {
  try {
    const preferences = await Preference.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(preferences);
  } catch (error) {
    next(error);
  }
};
*/

/*
       const response = await instance.put(`/progress/${updatedProgress.id}`, updatedProgress);
        for (const key in this.progress)
        this.progress[key] = response.data[key];
       */
