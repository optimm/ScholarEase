const User = require("../models/User");
const paginate = require("./paginate");

const searchUser = async (req, res, searchQuery) => {
  let { q } = req.query;
  let queryObject = { ...searchQuery };

  if (q) {
    q = q.toLowerCase();
    const userQuery = {
      $or: [
        { name: { $regex: q, $options: "i" } },
        { username: { $regex: q, $options: "i" } },
      ],
    };
    queryObject = { ...queryObject, ...userQuery };
  }
  const mongoQuery = User.find(queryObject).select(
    "name username email avatar"
  );
  const data = await paginate(req, res, mongoQuery);
  const total = await User.countDocuments(queryObject);
  return { data, total };
};

module.exports = searchUser;
