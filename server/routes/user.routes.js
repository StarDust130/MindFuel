import express from "express";
import {
  protectRoute,
  restrictRoute,
  Roles,
} from "../middlewares/auth.middlewares.js";
import { deleteAll, getAllUsers } from "../controllers/user.controller.js";


const router = express();


//! get all user
//!  Admin Routes
router.get(
  "/",
  protectRoute,
  restrictRoute(Roles.ADMIN),
  getAllUsers
);


router.delete("/all", deleteAll);






export default router;
