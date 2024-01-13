const HttpError = require("../utils/HttpError");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) next(HttpError(400, error.message.replace(/"/g, "")));
    next();
  };
};
module.exports = validateBody;
