const express = require("express");
const cors = require("cors");

//routes
const profileRoutes = require("./API/profile/routes");

//Database
const app = express();
const db = require("./db/models/index");

//Middleware
app.use(cors());

//=============== Productify Routes ===============\\
//app.use("/profile", profileRoutes);

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
