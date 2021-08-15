
exports.login = async (req, res, next) => {
    const { user } = req;
    const payload = {
      id: user.id,
      username: user.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.json({ token });
  };
  