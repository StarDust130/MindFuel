const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error("ERROR 💥", err);

    // 2) Send generic message
    res.status(500).json({
      success: false,
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

export const globalErrorHandler = (err, req, res, next) => {
  console.log(err.stack); // Log the error stack 📚

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error 😿";

  //! development
  if (process.env.NODE_ENV === "development") {
    return sendErrorDev(err, res);

    //! production
  } else if (process.env.NODE_ENV === "production") {
    return sendErrorProd(err, res);
  }
};
