const { isValidObjectId } = require("mongoose");
const HttpError = require("../utils/HttpError");
const isValidId = (req, res, next) => {
  if (!isValidObjectId(req.params.contactId))
    next(HttpError(400, "id is not valid"));
  next();
};
module.exports = isValidId;
