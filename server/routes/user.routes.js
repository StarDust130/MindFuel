import express from "express";
import {
  protectRoute,
  restrictRoute,
  Roles,
} from "../middlewares/auth.middlewares.js";
import {
  deleteAll,
  getAllInfo,
  getAllUsers,
} from "../controllers/user.controller.js";

const router = express();

//! get all user
//!  Admin Routes
router.get("/", protectRoute, restrictRoute(Roles.ADMIN), getAllUsers);

router.delete(
  "/deleteAll",
  protectRoute,
  restrictRoute(Roles.ADMIN),
  deleteAll
);
router.get("/getAllInfo", protectRoute, restrictRoute(Roles.ADMIN), getAllInfo);

export default router;
