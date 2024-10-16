export const globalErrorHandler = (err, req, res, next) => {
  console.log(err.stack); // Log the error stack 📚

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error 😿";

  //! development
  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });

    //! production
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    error.message = err.message;

    if (error.name === "CastError") {
      const message = `Resource not found. Invalid: ${error.path}`;
      error = new AppError(message, 404);
    }

    if (error.code === 11000) {
      const message = `Duplicate field value entered`;
      error = new AppError(message, 400);
    }

    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((val) => val.message);
      error = new AppError(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
