const express = require("express");
const { tasksFetch, fetchTask, markTask, deleteTask } = require("./controllers");
const passport = require("passport");
const router = express.Router();

//=== param middleware (parameter) ====\\
router.param("taskId", async (req, res, next, taskId) => {
  const task = await fetchTask(taskId, next);
  if (task) {
    req.task = task;
    next();
  } else {
    const error = new Error("Task Not Found.");
    error.status = 404;
    next(error);
  }
});

// List Route
router.get("/", tasksFetch);
// Mark Task Route
router.put(
  "/mark/:taskId",
  // passport.authenticate("jwt", { session: false }),
  markTask
);
//delete task
router.delete(
    "/:taskId",
    passport.authenticate("jwt", { session: false }),
    deleteTask);

module.exports = router;
