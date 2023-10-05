const { ErrorNotFound } = require("../utils/errorHandlers");

const notFound = (req, res, next) => {
  const error = new ErrorNotFound(req.url);
  next(error);
};

module.exports = notFound;
