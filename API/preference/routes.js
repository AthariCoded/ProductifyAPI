const express = require("express");
const passport = require("passport");

const {
  // preferenceFetch,
  fetchPreference,
  // fetchUserPreference,
  updatePreference,
} = require("./controllers");
const router = express.Router();

// param middleware (parameter)
router.param("preferenceId", async (req, res, next, preferenceId) => {
  // get the preference with id progressId
  const preference = await fetchPreference(preferenceId, next);
  if (preference) {
    // store it in req
    req.preference = preference;
    next();
  } else {
    // give back response 404 Preference Not Found
    const error = new Error("Preference Not Found.");
    error.status = 404;
    next(error);
  }
});

// List Route
//router.get("/", preferenceFetch);

//fetch preference
//router.get("/:preferenceId", fetchUserPreference);

// Update Route
router.put(
  "/:preferenceId",
  passport.authenticate("jwt", { session: false }),
  updatePreference
);

module.exports = router;
