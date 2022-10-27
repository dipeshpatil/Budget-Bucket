const jwt = require("jsonwebtoken");
const config = require("config");

const { NO_AUTH_TOKEN_MESSAGE, INVALID_TOKEN } = config.get("strings");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ message: NO_AUTH_TOKEN_MESSAGE });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: `${INVALID_TOKEN} ${err.message}` });
  }
};
