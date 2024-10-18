import express from "express";
import {
  loginUser,
  logoutUser,
  protectRoute,
  registerUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

//! Unprotected Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

//! Protected Routes
router.get("/logout", protectRoute, logoutUser);

export default router;
