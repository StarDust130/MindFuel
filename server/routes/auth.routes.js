import express from "express";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  protectRoute,
  registerUser,
  resetPassword,
  restrictRoute,
  Roles,
} from "../controllers/auth.controller.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();


//! Unprotected Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgetPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);

//! Protected Routes
router.get("/logout" , logoutUser);

//!  Admin Routes
router.get(
  "/",
  protectRoute,
  restrictRoute(Roles.STUDENT),
  getAllUsers
);



export default router;
