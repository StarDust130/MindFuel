

export const globalErrorHandler = (err, req, res, next) => {
  console.log(err.stack); // Log the error stack 📚

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error 😿";

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};