const jwt = require("jsonwebtoken");

const generateJwtToken = async () => {
  return jwt.sign(
    { crawlerSecretKey: process.env.CRAWLER_SECRET_KEY },
    process.env.JWT_SECRET
  );
};

module.exports = { generateJwtToken };
