const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

// routes
const userRoutes = require("./API/user/routes");
const taskRoutes = require("./API/task/routes");
const preferenceRoutes = require("./API/preference/routes");
//const taskTodoItemRoutes = require("./API/taskTodoItem/routes");

const passport = require("passport");
const { localStrategy } = require("./middleware/passport");
const { jwtStrategy } = require("./middleware/passport");

const app = express();
const db = require("./db/models/index");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//=============== Productify Routes ===============\\
app.use("/preferences", preferenceRoutes);
app.use(userRoutes);
app.use("/tasks", taskRoutes);
//app.use("/checklist", checklistRoutes); would you delete this?

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "internal Server Error." });
});

//=========Path Not Found===========\\
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found." });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");

    app.listen(8060, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error(error);
  }
};

run();
