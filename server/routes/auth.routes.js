import express from "express";
import {
  loginUser,
  logoutUser,
  protectRoute,
  registerUser,
} from "../controllers/auth.controller.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

//! Unprotected Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

//! Protected Routes
router.get("/logout", logoutUser);

//! 
router.get("/", getAllUsers);

export default router;
