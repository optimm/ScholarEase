const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const adminOnlyCheckMiddleware = async (req, res, next) => {
  const { isadmin } = req.user;
  if (!isadmin) {
    throw new UnauthenticatedError("Not Admin");
  }
  next();
};

module.exports = adminOnlyCheckMiddleware;
