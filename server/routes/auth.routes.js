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
  updatePassword,
} from "../controllers/auth.controller.js";
import { getAllUsers, updateMe } from "../controllers/user.controller.js";

const router = express.Router();


//! Unprotected Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgetPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);


//! Protected Routes
router.get("/logout" , protectRoute , logoutUser);
router.patch("/updateMyPassword", protectRoute, updatePassword);
router.patch("/updateMe", protectRoute, updateMe);


//!  Admin Routes
router.get(
  "/",
  protectRoute,
  restrictRoute(Roles.STUDENT),
  getAllUsers
);





export default router;
