import express from "express";
const router = express.Router();

import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/userControllers.js";

import {signin,
signup} from "../controllers/authController.js"

router.route("/addUser").post(addUser);
router.route("/getUsers").get(getUsers);
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);
router.route("/signin").post(signin);
router.route("/signup").post(signup);

export default router;
