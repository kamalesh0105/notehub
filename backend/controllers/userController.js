const User = require("../models/user");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "NO Users Found! " });
  }
  res.json(users);
});

const createNewUsers = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({
      message: `All Fields are required !`,
    });
  }
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate Username !" });
  }

  const hashedPass = await bcrypt.hash(password, 10);
  const userObject = { username: username, password: hashedPass, roles: roles };

  const user = await User.create(userObject);
  if (user) {
    res.status(200).json({ message: "New User Created" });
  } else {
    res.status(400).json({ message: "Invalid USer data" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body;

  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "No existing User" });
  }
  const duplicate = await User.findOne({ username: username }).lean().exec();
  if (duplicate && duplicate?._id.toString !== id) {
    return res
      .status(409)
      .json({ message: "Duplicate Username ,Try another " });
  }
  user.username = username;
  user.active = active;
  user.roles = roles;
  if (password) {
    const hashedPass = await bcrypt.hash(password, 10);
    user.password = hashedPass;
  }

  const newuser = await user.save();
  const msg = `${newuser.username} Updated`;
  res.status(200).json({ message: msg });
});
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User Id REquired" });
  }
  const notes = await Note.findOne({ user: id }).lean().exec();
  if (notes) {
    return res
      .status(409)
      .json({ message: "User Has Roles Assigned ,Can't delete User" });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "No user Found" });
  }

  const delUser = await User.deleteOne({ _id: id });

  if (delUser) {
    res.status(200).json({ message: "User Deleted Successfully" });
  }
});

module.exports = {
  getAllUsers,
  createNewUsers,
  updateUser,
  deleteUser,
};
