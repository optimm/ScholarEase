const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth");
const { ifAuthenticated } = require("../middleware/if-autheticated");
const {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
  likeProject,
  saveProject,
  commentOnProject,
  deleteComment,
  getComments,
  editComment,
} = require("../controllers/project");

router.route("/").get(ifAuthenticated, getAllProjects);

router
  .route("/:id")
  .get(ifAuthenticated, getSingleProject)
  .patch(authMiddleware, updateProject)
  .delete(authMiddleware, deleteProject);

router.route("/create").post(authMiddleware, createProject);
router.route("/:id/like").get(authMiddleware, likeProject);
router.route("/:id/save").get(authMiddleware, saveProject);

router
  .route("/:id/comment")
  .get(getComments)
  .post(authMiddleware, commentOnProject)
  .delete(authMiddleware, deleteComment)
  .patch(authMiddleware, editComment);
module.exports = router;
