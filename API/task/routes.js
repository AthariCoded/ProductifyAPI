const express = require("express");

const passport = require("passport");
const {
  tasksFetch,
  fetchTask,
  createTask,
  markTask,
  deleteTask,
  updateTask,
  createTaskTodoItem,
  deleteTaskTodoItem,
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
router.get("/", tasksFetch);

// Add Route
router.post("/", passport.authenticate("jwt", { session: false }), createTask);

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
  deleteTask
);
// update Route
router.put(
  "/:taskId",
  passport.authenticate("jwt", { session: false }),

  updateTask
);

// Create task-todo-item Route
router.post(
  "/:taskId/taskTodoItems",
  passport.authenticate("jwt", { session: false }),
  createTaskTodoItem
);

// Delete task-todo-item Route
router.delete(
  "/:taskId/taskTodoItems/:taskTodoItemId",
  passport.authenticate("jwt", { session: false }),
  deleteTaskTodoItem
);

module.exports = router;
