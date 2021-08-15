
const express = require("express");
const passport = require("passport");
const { login, register } = require("./controllers");
const router = express.Router();

router.post("/register", register);
router.post(
    "/login",
    passport.authenticate("local", { session: false }),
    login
  );

module.exports = router;
