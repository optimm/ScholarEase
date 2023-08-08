const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const crawlerAuthMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    throw new UnauthenticatedError("Not authorized");
  }

  const [bearer, token] = authorizationHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    throw new UnauthenticatedError("Not authorized");
  }

  const { crawlerSecretKey } = jwt.verify(token, process.env.JWT_SECRET);

  if (crawlerSecretKey != process.env.CRAWLER_SECRET_KEY) {
    throw new UnauthenticatedError("Invalid Secret Key");
  }

  next();
};

module.exports = { crawlerAuthMiddleware };
