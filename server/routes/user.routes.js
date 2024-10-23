import express from "express";
import {
  protectRoute,
  restrictRoute,
  Roles,
} from "../middlewares/auth.middlewares.js";
import {
  deleteAll,
  deleteMe,
  getAllInfo,
  getAllUsers,
  updateMe,
} from "../controllers/user.controller.js";

const router = express();

//! get all user
//!  Admin Routes
router.get("/", protectRoute, restrictRoute(Roles.ADMIN), getAllUsers);

//! delete All users
router.delete(
  "/deleteAll",
  protectRoute,
  restrictRoute(Roles.ADMIN),
  deleteAll
);

//! update  user
router.patch("/updateMe", protectRoute, restrictRoute(Roles.ADMIN), updateMe);


//! delete user
router.delete("/deleteMe", protectRoute, restrictRoute(Roles.ADMIN), deleteMe);



//! getAllInfo
router.get("/getAllInfo", protectRoute, restrictRoute(Roles.ADMIN), getAllInfo);

export default router;
