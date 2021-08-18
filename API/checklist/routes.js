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

// List Route
router.get("/", checklistsFetch);

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
