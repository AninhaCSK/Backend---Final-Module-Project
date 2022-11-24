import express from "express";
const router = express.Router();
import checkUser from "../middleware/checkUser.js";

import {
  addUser,
  deleteUser,
  getUsers,
  getOneUser,
  updateUser,
} from "../controllers/userControllers.js";

import { signin, signup } from "../controllers/authController.js";

router.route("/addUser").post(addUser);
router.route("/getUsers").get(getUsers);
router.route("/:id").get(getOneUser);
router.route("/:id").put(checkUser,updateUser);
router.route("/:id").delete(deleteUser);
router.route("/signin").post(signin);
router.route("/signup").post(signup);

export default router;
