const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose.connect(process.env.MONGO_URL);
};

module.exports = connectDB;
