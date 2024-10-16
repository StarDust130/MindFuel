

export const globalErrorHandler = (err, req, res, next) => {
  console.log(err.stack); // Log the error stack 📚

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error 😿";

  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};