

//! This function is used to catch errors in async functions and pass them to the error handling middleware.
// export const catchAsync = (fn) => {
//     return (req, res, next) => {
//         fn(req, res, next).catch(next);
//     }
  
// };


//! Same as above without curly braces
export const catchAsync = (fn) => (req, res, next) =>
  fn(req, res, next).catch(next);
