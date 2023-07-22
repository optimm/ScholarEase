const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const resetPasswordMiddleware = async (req, res, next) => {
  const { token } = req.query;
  if (!token) {
    throw new UnauthenticatedError("Token not present");
  }
  let data;
  try {
    data = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new UnauthenticatedError("Link is invalid or expired");
  }
  const { userId, hash } = data;
  if (!userId || !hash) {
    throw new BadRequestError("Link is broken");
  }
  req.user = { userId, hash };
  next();
};

module.exports = { resetPasswordMiddleware };
