const Project = require("../models/Project");
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
const paginate = require("../utils/paginate");
const getReadmeUrl = require("../utils/getReadmeUrl");

const getAllProjects = async (req, res) => {
  let searchQuery = {};
  const data = await searchProject(req, res, searchQuery);
  res.status(StatusCodes.OK).json({ success: true, data });
};

const getSingleProject = async (req, res) => {
  const { id } = req.params;
  let isLiked = false;
  let isMine = false;
  let isSaved = false;
  let readme = null;
  const project = await Project.findById(id)
    .select("-comments")
    .populate("owner", "name username email avatar")
    .populate("likes", "name username email avatar")
    .populate("saved", "name username email avatar");
  if (!project) {
    throw new NotFoundError("Project not found");
  }
  if (project?.github_link) {
    readme = await getReadmeUrl({ github_link: project?.github_link });
  }
  if (req?.user?.userId) {
    const userId = req?.user?.userId.toString();
    if (userId === project?.owner?._id.toString()) isMine = true;

    if (project?.likes?.some((e) => e._id.toString() === userId))
      isLiked = true;

    if (project?.saved?.some((e) => e._id.toString() === userId))
      isSaved = true;
  }

  res
    .status(StatusCodes.OK)
    .json({ success: true, data: project, isMine, isLiked, isSaved, readme });
};

const getProjectsOfUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  let searchQuery = { owner: id };
  const data = await searchProject(req, res, searchQuery);
  res.status(StatusCodes.OK).json({ success: true, data });
};

const getFeed = async (req, res) => {
  const { userId } = req.user;
  // let { id } = req.params;
  let id = mongoose.Types.ObjectId(userId);
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const following = user.following;
  let searchQuery = { owner: following };
  const data = await searchProject(req, res, searchQuery);
  res.status(StatusCodes.OK).json({ success: true, data });
};

// can be done by only owner********/
const createProject = async (req, res) => {
  const { userId } = req.user;
  const me = await User.findById(userId);
  const { title, desc, live_link, github_link, image, tags } = req.body;
  if (
    !title ||
    !image ||
    title === "" ||
    (title &&
      (!live_link || live_link === "") &&
      (!github_link || github_link === ""))
  ) {
    throw new BadRequestError(
      "Please Provide title, cover image and one link for project"
    );
  }
  const myCloud = await cloudinary.uploader.upload(image, {
    folder: "projects",
  });
  let projectData = {
    title,
    image: { public_id: myCloud?.public_id, url: myCloud?.secure_url },
  };
  if (desc) projectData.desc = desc;
  if (live_link) projectData.live_link = live_link;
  if (github_link) projectData.github_link = github_link;
  if (tags) projectData.tags = tags;

  const project = await Project.create({ ...projectData, owner: userId });
  me.projects.unshift(project._id);
  me.total_projects += 1;
  await me.save();
  res.status(StatusCodes.OK).json({ success: true, msg: "Project Created" });
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  let project = await Project.findById(id);
  if (!project) {
    throw new NotFoundError("Project not found");
  }
  if (userId.toString() !== project.owner.toString()) {
    throw new UnauthenticatedError("Project is not owned by current user");
  }
  const { title, live_link, github_link, tags, desc, image } = req.body;
  if (
    !title ||
    title === "" ||
    (title &&
      (!live_link || live_link === "") &&
      (!github_link || github_link === ""))
  ) {
    throw new BadRequestError("Please Provide title and one link for project");
  }
  project = project.toObject();
  if (title) {
    project.title = title;
  }
  if (project?.desc && (!desc || desc === "")) {
    delete project.desc;
  }
  if (desc) {
    project.desc = desc;
  }
  if (project?.live_link && (live_link || live_link === "")) {
    delete project.live_link;
  }
  if (live_link) {
    project.live_link = live_link;
  }
  if (project?.github_link && (github_link || github_link === "")) {
    delete project.github_link;
  }
  if (github_link) {
    project.github_link = github_link;
  }
  if (tags) {
    project.tags = [...tags];
  }
  if (image) {
    const myCloud = await cloudinary.uploader.upload(image, {
      folder: "projects",
    });
    project.image = { public_id: myCloud?.public_id, url: myCloud?.secure_url };
  }

  await Project.deleteOne({ _id: id });
  let newProject = new Project(project);
  await newProject.save();
  res.status(StatusCodes.OK).json({ success: true, msg: "Project Updated" });
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const project = await Project.findById(id);
  if (!project) {
    throw new NotFoundError("Project not found");
  }
  if (userId.toString() !== project.owner.toString()) {
    throw new UnauthenticatedError("Project is not owned by current user");
  }
  const me = await User.findById(userId);
  me.total_projects -= 1;
  const index = me.projects.indexOf(id);
  me.projects.splice(index, 1);
  await me.save();
  await User.updateMany(
    { saved_projects: id },
    { $pull: { saved_projects: id } }
  );
  await Project.deleteOne({ _id: id });
  res.status(StatusCodes.OK).json({ success: true, msg: "Project deleted" });
};

const getSavedProjects = async (req, res) => {
  const { userId } = req.user;
  const searchQuery = { saved: userId };

  const data = await searchProject(req, res, searchQuery);
  res.status(StatusCodes.OK).json({ success: true, data });
};
//**********************************/
const likeProject = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    throw new NotFoundError("Project not found");
  }

  if (project.likes.includes(userId)) {
    const index = project.likes.indexOf(userId);
    project.likes.splice(index, 1);
    project.total_likes -= 1;
    await project.save();
    res.status(StatusCodes.OK).json({ success: true, msg: "Project unliked" });
  } else {
    project.likes.push(userId);
    project.total_likes += 1;
    await project.save();
    res.status(StatusCodes.OK).json({ success: true, msg: "Project liked" });
  }
};

const saveProject = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const me = await User.findById(userId);
  const project = await Project.findById(id);
  if (!project) {
    throw new NotFoundError("Project not found");
  }
  if (me.saved_projects.includes(id)) {
    const index = project.saved.indexOf(userId);
    const index2 = me.saved_projects.indexOf(id);
    project.saved.splice(index, 1);
    me.saved_projects.splice(index2, 1);
    project.total_saves -= 1;
    await project.save();
    await me.save();
    res.status(StatusCodes.OK).json({ success: true, msg: "Project unsaved" });
  } else {
    project.saved.push(userId);
    me.saved_projects.push(id);
    project.total_saves += 1;
    await project.save();
    await me.save();
    res.status(StatusCodes.OK).json({ success: true, msg: "Project saved" });
  }
};

const commentOnProject = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { comment } = req.body;
  if (!comment || comment === "") {
    throw new BadRequestError("Please provide a comment");
  }
  const project = await Project.findById(id);
  if (!project) {
    throw new NotFoundError("Project not found");
  }
  project.comments.unshift({ user: userId, comment });
  project.total_comments += 1;
  await project.save();
  res.status(StatusCodes.OK).json({ success: true, msg: "Comment added" });
};

const deleteComment = async (req, res) => {
  const { userId } = req.user;
  const { id: pId } = req.params;
  const { commentId } = req.body;
  const project = await Project.findById(pId);

  if (!project) {
    throw new NotFoundError("Project not found");
  }
  let comments = project.comments;
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
      project.owner.toString() === userId.toString()
    )
  ) {
    throw new UnauthenticatedError("Not authorized to delete comment");
  }
  project.comments = project.comments.filter(
    (item) => item._id.toString() !== commentId.toString()
  );
  project.total_comments -= 1;

  await project.save();
  res.status(StatusCodes.OK).json({ success: true, msg: "Comment Deleted" });
};

const getComments = async (req, res) => {
  const { id: pId } = req.params;
  const project = await Project.findById(pId).populate({
    path: "comments",
    populate: { path: "user", select: "name username email avatar" },
  });

  if (!project) {
    throw new NotFoundError("Project not found");
  }
  let comments = project.comments;
  res
    .status(StatusCodes.OK)
    .json({ success: true, data: { _id: project?._id, comments } });
};

const editComment = async (req, res) => {
  const { userId } = req.user;
  const { id: pId } = req.params;
  let { commentId, commentText } = req.body;
  if (!commentText || commentText === "") {
    throw new BadRequestError("Please provide a comment");
  }
  const project = await Project.findById(pId);
  commentId = mongoose.Types.ObjectId(commentId);

  if (!project) {
    throw new NotFoundError("Project not found");
  }
  let comments = project.comments;
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
      project.owner.toString() === userId.toString()
    )
  ) {
    throw new UnauthenticatedError("Not authorized to delete comment");
  }
  await Project.updateOne(
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
  getAllProjects,
  getSingleProject,
  getFeed,
  createProject,
  updateProject,
  deleteProject,
  getSavedProjects,
  likeProject,
  saveProject,
  commentOnProject,
  deleteComment,
  getComments,
  editComment,
  getProjectsOfUser,
};
