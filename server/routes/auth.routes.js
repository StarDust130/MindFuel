import express from "express";
import {
  loginUser,
  logoutUser,
  protectRoute,
  registerUser,
  restrictRoute,
  Roles,
} from "../controllers/auth.controller.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();


//! Unprotected Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

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
