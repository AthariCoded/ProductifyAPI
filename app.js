const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db/models/index");
app.use(cors());

//ROUTES
const taskRoutes = require("./API/task/routes");
app.use("/tasks", taskRoutes);

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error(error);
  }
};

run();
