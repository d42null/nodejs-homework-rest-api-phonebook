const jwt = require("jsonwebtoken");
const HttpError = require("../utils/HttpError");
const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  const [bearer, token] = (req.headers.authorization ?? "").split(" ");
  if (!bearer) next(HttpError(401, "Not authorized"));
  try {
    const user = await User.findById(jwt.verify(token, process.env.S_KEY).id);
    if (!user || !user.token || user.token !== token)
      next(HttpError(401, "Not authorized"));
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};
module.exports = authenticate;
