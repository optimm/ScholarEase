const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth");
const { ifAuthenticated } = require("../middleware/if-autheticated");
const {
  getAllScholarship,
  getSingleScholarship,
  createScholarship,
  updateScholarship,
  deleteScholarship,
  upvoteScholarship,
  saveScholarship,
  commentOnScholarship,
  deleteComment,
  getComments,
  editComment,
} = require("../controllers/scholarship");

router.route("/").get(ifAuthenticated, getAllScholarship);

router
  .route("/:id")
  .get(ifAuthenticated, getSingleScholarship)
  .patch(authMiddleware, updateScholarship)
  .delete(authMiddleware, deleteScholarship);

router.route("/create").post(authMiddleware, createScholarship);
router.route("/:id/upvote").get(authMiddleware, upvoteScholarship);
router.route("/:id/save").get(authMiddleware, saveScholarship);

router
  .route("/:id/comment")
  .get(getComments)
  .post(authMiddleware, commentOnScholarship)
  .delete(authMiddleware, deleteComment)
  .patch(authMiddleware, editComment);
module.exports = router;
