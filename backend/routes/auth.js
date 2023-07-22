const express = require("express");

const router = express.Router();

const {
  register,
  login,
  changePassword,
  checkMyAuth,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");
const { authMiddleware } = require("../middleware/auth");
const { resetPasswordMiddleware } = require("../middleware/reset-password");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authMiddleware, logout);
router.route("/change-password").put(authMiddleware, changePassword);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPasswordMiddleware, resetPassword);

module.exports = router;
