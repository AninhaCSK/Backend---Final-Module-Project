import UserModel from "../models/userModel.js";
import { validationResult } from "express-validator";

export const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

export const getOneUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const addUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const user = new UserModel(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
