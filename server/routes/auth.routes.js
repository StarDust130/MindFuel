import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";


const router = express.Router();

//! Unprotected Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

//! Protected Routes
router.get("/logout", logoutUser);

export default router;
