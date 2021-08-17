const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Progress } = require("../../db/models");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");

exports.register = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    req.body.userId = newUser.id;
    const newProgress = await Progress.create(req.body);

    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
      progress: newProgress,
    };

    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { user } = req;

  //to get user's corresponding progress
  const userProgress = await user.getProgress();

  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
    progress: userProgress,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};
