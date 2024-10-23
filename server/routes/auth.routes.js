import express from "express";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from "../controllers/auth.controller.js";
import { deleteAll, getAllUsers, updateMe, updatePassword } from "../controllers/user.controller.js";
import { protectRoute  } from "../middlewares/auth.middlewares.js";

const router = express.Router();


//! Unprotected Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/forgetPassword", forgotPassword);
// router.patch("/resetPassword/:token", resetPassword);


//! Protected Routes
router.get("/logout" , protectRoute , logoutUser);
router.patch("/updateMe", protectRoute, updateMe);



//! user Routes
router.patch("/updateMyPassword", protectRoute, updatePassword);



export default router;
