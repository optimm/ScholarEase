const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const ifAuthenticated = async (req, res, next) => {
  if (req.cookies) {
    const { token } = req.cookies;
    if (token) {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(userId);
      if (user) {
        req.user = { userId };
      }
    }
  }

  next();
};

module.exports = { ifAuthenticated };
