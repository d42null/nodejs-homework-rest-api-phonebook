const cntrlErrorDecorator = (cntrlFunc) => async (req, res, next) => {
  try {
    await cntrlFunc(req, res, next);
  } catch (error) {
    next(error);
  }
};
module.exports = cntrlErrorDecorator;
