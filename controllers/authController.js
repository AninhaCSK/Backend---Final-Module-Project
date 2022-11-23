import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await UserModel.findOne({ email });

  if (foundUser)
    return res
      .status(401)
      .json({ status: "failed", message: "email already registered" });

  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(password, salt);

  req.body.password = hashedPassword;
  const user = new UserModel(req.body);
  await user.save();

  const payload = {
    id: user._id,
    name: user.name,
  };

  jwt.sign(payload, "something", { expiresIn: "10h" }, (err, token) => {
    if (err) throw err;
    res
      .status(200)
      .json({ token, status: "success", message: "user registered" });
  });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const currentUser = await UserModel.findOne({ email });
  if (!currentUser)
    return res
      .status(400)
      .json({ status: "failed", message: "Invalid Credentials" });

  const verified = await bcrypt.compare(password, currentUser.password);

  if (!verified)
    return res
      .status(400)
      .json({ status: "failed", message: "Invalid Credentials" });

  const payload = {
    email,
    userName: currentUser.name,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "10h",
  });
  res.status(200).json({
    status: "success",
    data: { email: currentUser.email, name: currentUser.name, token },
  });
};
