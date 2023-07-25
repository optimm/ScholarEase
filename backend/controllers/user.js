const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const searchUser = require("../utils/searchUser");
const Scholarship = require("../models/Scholarship");
const cloudinary = require("cloudinary").v2;

//**************************Generic Routes***********************/
const getAllUsers = async (req, res) => {
  let searchQuery = {};
  if (req.user) {
    const authUserQuery = { _id: { $ne: req.user.userId } };
    searchQuery = { ...authUserQuery };
  }

  const data = await searchUser(req, res, searchQuery);
  res.status(StatusCodes.OK).json({ success: true, data });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  let isMe = false;
  let user;
  let data;

  if (req?.user?.userId) {
    const userId = req?.user?.userId.toString();
    if (userId === id) {
      user = await User.findById(id).select("-scholarships");
      isMe = true;
      data = { ...user._doc };
    } else {
      user = await User.findById(id).select(
        "-scholarships -saved_scholarships"
      );
      if (!user) {
        throw new BadRequestError("User does not exist");
      }
      data = { ...user._doc };
    }
  } else {
    user = await User.findById(id).select("-scholarships -saved_scholarships");
    if (!user) {
      throw new BadRequestError("User does not exist");
    }
    data = { ...user._doc };
  }

  res.status(StatusCodes.OK).json({ success: true, data, isMe });
};

//To check my auth and send back my data
const checkMyAuth = async (req, res) => {
  const me = await User.findById(req.user.userId).select(
    "name username email avatar isadmin"
  );
  res.status(StatusCodes.OK).json({ success: true, data: me });
};

const updateProfile = async (req, res) => {
  const { userId } = req.user;
  const { name, username, email, image, bio, about } = req.body;
  let me = await User.findById(userId);

  if (email && email !== me.email) {
    const user = await User.findOne({ email });
    if (user) {
      throw new BadRequestError("Email already in use");
    }
    me.email = email;
  }
  if (username && username !== me.username) {
    const user = await User.findOne({ username });
    if (user) {
      throw new BadRequestError("Username already in use");
    }
    me.username = username;
  }

  me.name = name;
  me.bio = bio;
  me.about = about;

  if (image) {
    const myCloud = await cloudinary.uploader.upload(image, {
      folder: "users",
    });
    me.avatar = { public_id: myCloud?.public_id, url: myCloud?.secure_url };
  }

  await me.save();
  res.status(StatusCodes.OK).json({ success: true, msg: "Profile updated" });
};

const deleteProfile = async (req, res) => {
  const { userId } = req.user;
  const me = await User.findById(userId);

  //remove user
  await User.deleteOne({ _id: userId });

  // Delete all scholarships posted by the user
  await Scholarship.deleteMany({ owner: userId });

  //removing likes of this user
  await Scholarship.updateMany(
    { upvotes: userId },
    { $pull: { upvotes: userId } }
  );

  //removing user from posts he saved
  await Scholarship.updateMany({ saved: userId }, { $pull: { saved: userId } });

  //removing comment of this user from posts
  await Scholarship.updateMany(
    { "comments.user": userId },
    { $pull: { comments: { user: userId } } }
  );

  //logout and send res
  res
    .status(StatusCodes.OK)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .json({ success: true, msg: "Profile Deleted" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  checkMyAuth,
  updateProfile,
  deleteProfile,
};
