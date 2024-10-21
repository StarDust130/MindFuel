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
import { deleteAll, deleteMe, getAllUsers, updateMe, updatePassword } from "../controllers/user.controller.js";

const router = express.Router();


//! Unprotected Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/forgetPassword", forgotPassword);
// router.patch("/resetPassword/:token", resetPassword);


//! Protected Routes
router.get("/logout" , protectRoute , logoutUser);
router.patch("/updateMe", protectRoute, updateMe);
router.delete("/deleteMe", protectRoute, deleteMe);


//! user Routes
router.patch("/updateMyPassword", protectRoute, updatePassword);

//!  Admin Routes
router.get(
  "/",
  protectRoute,
  restrictRoute(Roles.STUDENT),
  getAllUsers
);


router.delete("/all", deleteAll);


export default router;
