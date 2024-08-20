function createAndPassError(status, message, next) {
  const error = new Error(message);
  error.status = status;
  next(error);
}

module.exports = createAndPassError;
