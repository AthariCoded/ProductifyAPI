const express = require("express");
const passport = require("passport");

const {
  progressFetch,
  fetchProgress,
  fetchUserProgress,
  updateProgress,
} = require("./controllers");
const router = express.Router();

// param middleware (parameter)
router.param("progressId", async (req, res, next, progressId) => {
  // get the progress with id progressId
  const progress = await fetchProgress(progressId, next);
  if (progress) {
    // store it in req
    req.progress = progress;
    next();
  } else {
    // give back response 404 Progress Not Found
    const error = new Error("Progress Not Found.");
    error.status = 404;
    next(error);
  }
});

// List Route
router.get("/", progressFetch);

//fetch progress
router.get("/:progressId", fetchUserProgress);

// Update Route
router.put(
  "/:progressId",
  passport.authenticate("jwt", { session: false }),
  updateProgress
);

module.exports = router;
