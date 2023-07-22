const express = require("express");

const router = express.Router();

const { authMiddleware } = require("../middleware/auth");
const { ifAuthenticated } = require("../middleware/if-autheticated");
const {
  getAllUsers,
  getSingleUser,
  getFollowers,
  getFollowing,
  followUser,
  updateProfile,
  deleteProfile,
  checkMyAuth,
} = require("../controllers/user");
const {
  getProjectsOfUser,
  getSavedProjects,
  getFeed,
} = require("../controllers/project");

router.route("/").get(ifAuthenticated, getAllUsers);
router
  .route("/me")
  .get(authMiddleware, checkMyAuth)
  .patch(authMiddleware, updateProfile)
  .delete(authMiddleware, deleteProfile);
router.route("/me/feed").get(authMiddleware, getFeed);
router.route("/me/saved").get(authMiddleware, getSavedProjects);
router.route("/:id").get(ifAuthenticated, getSingleUser);
router.route("/:id/followers").get(getFollowers);
router.route("/:id/following").get(getFollowing);
router.route("/:id/follow").get(authMiddleware, followUser);
router.route("/:id/projects").get(getProjectsOfUser);

// route for user projects

module.exports = router;
