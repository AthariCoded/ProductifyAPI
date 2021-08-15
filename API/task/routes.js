const express = require("express");
const { tasksFetch, fetchTask } = require("./controllers");

const router = express.Router();

//=== param middleware (parameter) ====\\
// router.param("taskId", async (req, res, next, taskId) => {
//   const trip = await fetchTask(taskId, next);
//   if (trip) {
//     req.trip = trip;
//     next();
//   } else {
//     const error = new Error("Trip Not Found.");
//     error.status = 404;
//     next(error);
//   }
// });

// List Route
router.get("/", tasksFetch);

module.exports = router;
