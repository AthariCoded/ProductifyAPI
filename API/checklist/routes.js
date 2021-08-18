const express = require("express");

const passport = require("passport");
const {
  checklistsFetch,
  fetchTask,
  createChecklist,
  //deleteChecklist,
} = require("./controllers");

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

// do you need this route?
// do you ever display the entire
// list of every task's checklist
// items from all users in the database?
// ---
// from my note in the task fetch controller,
// you don't need this route/controller at all.
// List Route
router.get("/", checklistsFetch);

// the todo item add and update should be moved to the task routes/controllers files
// Add Route
router.post(
  "/:taskId",
  passport.authenticate("jwt", { session: false }),
  createChecklist
);

//delete checklist item
// router.delete(
//   "/:checklistId",
//   passport.authenticate("jwt", { session: false }),
//   deleteChecklist
// );

module.exports = router;
