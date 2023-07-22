const User = require("../models/User");
const { StatusCodes, BAD_GATEWAY } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SendMail } = require("../utils/sendMail");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
  const { name, email, password, username } = req.body;
  if (
    !email ||
    email === "" ||
    !name ||
    name === "" ||
    !password ||
    password === "" ||
    !username ||
    username === ""
  ) {
    throw new BadRequestError(
      "Please provide name,username,email and password"
    );
  }
  let user = await User.findOne({ email });
  if (user) {
    throw new BadRequestError("Email address already in use");
  }

  user = await User.findOne({ username });
  if (user) {
    throw new BadRequestError("Username already in use");
  }

  user = await User.create({ name, email, username, password });
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, msg: "User registered" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || email === "" || !password || password === "") {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new NotFoundError("User not found");
  }
  //compare password
  const isPasswordTrue = await user.CheckPassword(password);

  if (!isPasswordTrue) {
    throw new UnauthenticatedError("Incorrect password");
  }

  //generate jwt token
  const token = user.CreateJWT({ expires: "30d" });

  // cookie options
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res
    .status(StatusCodes.OK)
    .cookie("token", token, options)
    .json({
      succcess: true,
      data: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        _id: user._id,
      },
    });
};

const logout = async (req, res) => {
  const { userId } = req.user;
  res
    .status(StatusCodes.OK)
    .cookie("token", null, {
      sameSite: "none",
      secure: true,
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ success: true, msg: "Logged out" });
};

const changePassword = async (req, res) => {
  const { userId } = req.user;
  const me = await User.findById(userId).select("+password");
  const { currentPassword, newPassword } = req.body;
  if (
    !currentPassword ||
    !newPassword ||
    currentPassword === "" ||
    newPassword === ""
  ) {
    throw new BadRequestError("Please provide current and new password");
  }
  const isValid = await me.CheckPassword(currentPassword);
  if (!isValid) {
    throw new UnauthenticatedError("Current password is incorrect");
  }
  if (currentPassword === newPassword) {
    throw new BadRequestError("Cannot use previous password");
  }
  me.password = newPassword;
  await me.save();
  res.status(StatusCodes.OK).json({ success: true, msg: "Password changed" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email || email === "") {
    throw new BadRequestError("Please provide email");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("User not found");
  }
  const uniqueId = uuidv4();
  user.reset_password = uniqueId;
  const hashedId = await bcrypt.hash(uniqueId, 10);
  const token = user.CreateJWT({ id: hashedId, expires: 60 * 10 });
  const msg = await SendMail({ token, email });
  await user.save();
  res.status(StatusCodes.OK).json({ success: true, msg });
};
const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { userId, hash } = req.user;
  const user = await User.findById(userId).select("+password");
  if (!user) {
    throw new UnauthenticatedError("User does not exist");
  }
  if (!user.reset_password) {
    throw new BadRequestError("Link has expired");
  }
  const ismatch = await bcrypt.compare(user.reset_password, hash);
  if (!ismatch) {
    throw new BadRequestError("Link is broken");
  }
  if (!newPassword) {
    throw new BadRequestError("Provide a new password");
  }
  user.reset_password = null;
  user.password = newPassword;
  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Password reset successfull" });
};

module.exports = {
  register,
  login,
  changePassword,
  logout,
  forgotPassword,
  resetPassword,
};
