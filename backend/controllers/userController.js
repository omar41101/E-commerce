import user from "../models/userModel.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js";

const creatUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("please fill all the inputs");
  }
  const userExists = await user.findOne({ email });
  if (userExists) res.status(400).send("user already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //adding user to db
  const newUser = new user({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("invalid user data");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await user.findOne({ email });
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordValid) {
      createToken(res, existingUser._id);
      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return;
    }
  }
});
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logged out succesfuly" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await user.find({});
  res.json(users);
});

const getCurrectUserProfile = asyncHandler(async (req, res) => {
  const cuser = await user.findById(req.user._id);
  if (cuser) {
    res.json({
      _id: cuser._id,
      username: cuser.username,
      email: cuser.email,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const uuser = await user.findById(req.user._id);
  if (uuser) {
    uuser.username = req.body.username || uuser.username;
    uuser.email = req.body.email || uuser.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      uuser.password = hashedPassword;
    }
    const updatedUser = await uuser.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error(" user not found ");
  }
});

export { creatUser, loginUser, logoutUser, getAllUsers, getCurrectUserProfile ,updateCurrentUserProfile };
