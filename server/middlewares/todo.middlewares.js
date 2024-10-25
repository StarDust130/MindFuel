
export const validateTodo = (req, res, next) => {
  const { title, description } = req.body;
  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid or missing title" });
  }
  if (description && typeof description !== "string") {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid description" });
  }
  next();
};
