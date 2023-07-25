const Scholarship = require("../models/Scholarship");
const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const searchProject = require("../utils/searchProject");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");

const getAllScholarship = async (req, res) => {
  let searchQuery = {};
  const data = await searchProject(req, res, searchQuery);
  res.status(StatusCodes.OK).json({ success: true, data });
};

const getSingleScholarship = async (req, res) => {
  const { id } = req.params;
  let isUpvoted = false;
  let isMine = false;
  let isSaved = false;

  const scholarship = await Scholarship.findById(id)
    .select("-comments")
    .populate("owner", "name username email avatar")
    .populate("upvotes", "name username email avatar")
    .populate("saved", "name username email avatar");
  if (!scholarship) {
    throw new NotFoundError("Scholarship not found");
  }

  if (req?.user?.userId) {
    const userId = req?.user?.userId.toString();
    if (userId === scholarship?.owner?._id.toString()) isMine = true;

    if (scholarship?.upvotes?.some((e) => e._id.toString() === userId))
      isUpvoted = true;

    if (scholarship?.saved?.some((e) => e._id.toString() === userId))
      isSaved = true;
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: scholarship,
    isMine,
    isUpvoted,
    isSaved,
    readme,
  });
};

const getScholarshipUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  let searchQuery = { owner: id };
  const data = await searchProject(req, res, searchQuery);
  res.status(StatusCodes.OK).json({ success: true, data });
};

// can be done by only owner********/
const createScholarship = async (req, res) => {
  const { userId } = req.user;
  const me = await User.findById(userId);
  const { title, desc, link, image, tags } = req.body;
  if (!title) {
    throw new BadRequestError("Please Provide title for scholarship");
  }

  let projectData = {
    title,
  };
  if (desc) projectData.desc = desc;
  if (tags) projectData.tags = tags;
  if (link) projectData.link = link;
  if (image) {
    const myCloud = await cloudinary.uploader.upload(image, {
      folder: "scholarships",
    });
    projectData.image = {
      public_id: myCloud?.public_id,
      url: myCloud?.secure_url,
    };
  }

  const scholarship = await Scholarship.create({
    ...projectData,
    owner: userId,
  });
  me.scholarships.unshift(scholarship._id);
  me.total_scholarships += 1;
  await me.save();
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Scholarship Created" });
};

const updateScholarship = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  let scholarship = await Scholarship.findById(id);
  if (!scholarship) {
    throw new NotFoundError("Scholarship not found");
  }
  if (userId.toString() !== scholarship.owner.toString()) {
    throw new UnauthenticatedError("Scholarship is not owned by current user");
  }
  const { title, link, tags, desc, image } = req.body;
  if (!title) {
    throw new BadRequestError("Please Provide title for scholarship");
  }
  scholarship = scholarship.toObject();

  scholarship.title = title;
  if (scholarship?.desc && (!desc || desc === "")) {
    delete scholarship.desc;
  }
  if (desc) {
    scholarship.desc = desc;
  }
  if (link) {
    scholarship.link = link;
  }
  if (tags) {
    scholarship.tags = [...tags];
  }
  if (image) {
    const myCloud = await cloudinary.uploader.upload(image, {
      folder: "scholarships",
    });
    scholarship.image = {
      public_id: myCloud?.public_id,
      url: myCloud?.secure_url,
    };
  }

  await Scholarship.deleteOne({ _id: id });
  let newProject = new Scholarship(scholarship);
  await newProject.save();
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Scholarship Updated" });
};

const deleteScholarship = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const scholarship = await Scholarship.findById(id);
  if (!scholarship) {
    throw new NotFoundError("Scholarship not found");
  }
  if (userId.toString() !== scholarship.owner.toString()) {
    throw new UnauthenticatedError("Scholarship is not owned by current user");
  }
  const me = await User.findById(userId);
  me.total_scholarships -= 1;
  const index = me.scholarships.indexOf(id);
  me.scholarships.splice(index, 1);
  await me.save();
  await User.updateMany(
    { saved_scholarships: id },
    { $pull: { saved_scholarships: id } }
  );
  await Scholarship.deleteOne({ _id: id });
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Scholarship deleted" });
};

const getSavedScholarships = async (req, res) => {
  const { userId } = req.user;
  const searchQuery = { saved: userId };

  const data = await searchProject(req, res, searchQuery);
  res.status(StatusCodes.OK).json({ success: true, data });
};
//**********************************/
const upvoteScholarship = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const scholarship = await Scholarship.findById(id);
  if (!scholarship) {
    throw new NotFoundError("Scholarship not found");
  }

  if (scholarship.upvotes.includes(userId)) {
    const index = scholarship.upvotes.indexOf(userId);
    scholarship.upvotes.splice(index, 1);
    scholarship.total_upvotes -= 1;
    await scholarship.save();
    res
      .status(StatusCodes.OK)
      .json({ success: true, msg: "Scholarship unvoted" });
  } else {
    scholarship.upvotes.push(userId);
    scholarship.total_upvotes += 1;
    await scholarship.save();
    res
      .status(StatusCodes.OK)
      .json({ success: true, msg: "Scholarship voted" });
  }
};

const saveScholarship = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const me = await User.findById(userId);
  const scholarship = await Scholarship.findById(id);
  if (!scholarship) {
    throw new NotFoundError("Scholarship not found");
  }
  if (me.saved_scholarships.includes(id)) {
    const index = scholarship.saved.indexOf(userId);
    const index2 = me.saved_scholarships.indexOf(id);
    scholarship.saved.splice(index, 1);
    me.saved_scholarships.splice(index2, 1);
    scholarship.total_saves -= 1;
    await scholarship.save();
    await me.save();
    res
      .status(StatusCodes.OK)
      .json({ success: true, msg: "Scholarship unsaved" });
  } else {
    scholarship.saved.push(userId);
    me.saved_scholarships.push(id);
    scholarship.total_saves += 1;
    await scholarship.save();
    await me.save();
    res
      .status(StatusCodes.OK)
      .json({ success: true, msg: "Scholarship saved" });
  }
};

const commentOnScholarship = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { comment } = req.body;
  if (!comment || comment === "") {
    throw new BadRequestError("Please provide a comment");
  }
  const scholarship = await Scholarship.findById(id);
  if (!scholarship) {
    throw new NotFoundError("Scholarship not found");
  }
  scholarship.comments.unshift({ user: userId, comment });
  scholarship.total_comments += 1;
  await scholarship.save();
  res.status(StatusCodes.OK).json({ success: true, msg: "Comment added" });
};

const deleteComment = async (req, res) => {
  const { userId } = req.user;
  const { id: pId } = req.params;
  const { commentId } = req.body;
  const scholarship = await Scholarship.findById(pId);

  if (!scholarship) {
    throw new NotFoundError("Scholarship not found");
  }
  let comments = scholarship.comments;
  comments = comments.filter(
    (item) => item._id.toString() === commentId.toString()
  );

  if (comments.length < 1) {
    throw new NotFoundError("Comment not found");
  }
  const comment = comments[0];
  if (
    !(
      comment.user.toString() === userId.toString() ||
      scholarship.owner.toString() === userId.toString()
    )
  ) {
    throw new UnauthenticatedError("Not authorized to delete comment");
  }
  scholarship.comments = scholarship.comments.filter(
    (item) => item._id.toString() !== commentId.toString()
  );
  scholarship.total_comments -= 1;

  await scholarship.save();
  res.status(StatusCodes.OK).json({ success: true, msg: "Comment Deleted" });
};

const getComments = async (req, res) => {
  const { id: pId } = req.params;
  const scholarship = await Scholarship.findById(pId).populate({
    path: "comments",
    populate: { path: "user", select: "name username email avatar" },
  });

  if (!scholarship) {
    throw new NotFoundError("Scholarship not found");
  }
  let comments = scholarship.comments;
  res
    .status(StatusCodes.OK)
    .json({ success: true, data: { _id: scholarship?._id, comments } });
};

const editComment = async (req, res) => {
  const { userId } = req.user;
  const { id: pId } = req.params;
  let { commentId, commentText } = req.body;
  if (!commentText || commentText === "") {
    throw new BadRequestError("Please provide a comment");
  }
  const scholarship = await Scholarship.findById(pId);
  commentId = mongoose.Types.ObjectId(commentId);

  if (!scholarship) {
    throw new NotFoundError("Scholarship not found");
  }
  let comments = scholarship.comments;
  comments = comments.filter(
    (item) => item._id.toString() === commentId.toString()
  );

  if (comments.length < 1) {
    throw new NotFoundError("Comment not found");
  }
  const comment = comments[0];
  if (
    !(
      comment.user.toString() === userId.toString() ||
      scholarship.owner.toString() === userId.toString()
    )
  ) {
    throw new UnauthenticatedError("Not authorized to delete comment");
  }
  await Scholarship.updateOne(
    { "comments._id": commentId },
    {
      $set: {
        "comments.$.comment": commentText,
      },
    }
  );
  res.status(StatusCodes.OK).json({ success: true, msg: "Comment Updated" });
};

module.exports = {
  getAllScholarship,
  getSingleScholarship,
  createScholarship,
  updateScholarship,
  deleteScholarship,
  getSavedScholarships,
  upvoteScholarship,
  saveScholarship,
  commentOnScholarship,
  deleteComment,
  getComments,
  editComment,
  getScholarshipUser,
};
