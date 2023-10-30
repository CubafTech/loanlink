import AppError from "../utils/appError.js";

const productionError = (err, res) => {
  console.log(err);
  if (!err.isOperational) {
    return res.status(500).json({
      message: "something  went wrong",
    });
  }
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err: err,
  });
};

const handleCastError = (err) => {
  const message = `invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleValiationError = (err) => {
  const message = Object.values(err.errors).map((data) => data.message)[0];

  return new AppError(`${message}`, 400);
};

const handleDuplicateError = (err) => {
  const message = "user credential already exist";
  return new AppError(message, 422);
};

const handleJsonWebTokenError = (err) =>
  new AppError("invalid token passed", 422);

const handleTokenExpiredError = (err) =>
  new AppError("Token already expired", 422);

const developmentError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err: err,
  });
};

export const globalError = (err, req, res, next) => {
  console.log(err);
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 400;

  if (process.env.NODE_ENV !== "production") {
    if (err.name === "CastError") {
      let error = { ...err };
      error = handleCastError(error);
      return developmentError(error, res);
    }
    if (err.name === "ValidationError") {
      let error = { ...err };
      error = handleValiationError(error);
      return developmentError(error, res);
    }
    if (err.code === 11000) {
      let error = { ...err };
      error = handleDuplicateError(error);
      return developmentError(error, res);
    }
    if (err.name === "JsonWebTokenError") {
      let error = { ...err };
      error = handleJsonWebTokenError(error);
      return developmentError(error, res);
    }
    if (err.name === "TokenExpiredError") {
      let error = { ...err };
      error = handleTokenExpiredError(error);
      return developmentError(error, res);
    }

    // productionError(error, res);
    developmentError(err, res);
    // else {}
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (err.name === "CastError") error = handleCastError(error);
    if (err.name === "CastError") {
      let error = { ...err };
      error = handleCastError(error);
      return productionError(error, res);
    }
    if (err.name === "ValidationError") {
      let error = { ...err };
      error = handleValiationError(error);
      return productionError(error, res);
    }
    if (err.code === 11000) {
      let error = { ...err };
      error = handleDuplicateError(error);
      return productionError(error, res);
    }
    if (err.name === "JsonWebTokenError") {
      let error = { ...err };
      error = handleJsonWebTokenError(error);
      return productionError(error, res);
    }
    if (err.name === "TokenExpiredError") {
      let error = { ...err };
      error = handleTokenExpiredError(error);
      return productionError(error, res);
    }
  }
};
