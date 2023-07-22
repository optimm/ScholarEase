const Project = require("../models/Project");
const User = require("../models/User");
const paginate = require("./paginate");

const searchProject = async (req, res, searchQuery) => {
  let { q, sortByLikes, sortByComments } = req.query;
  let mongoQuery;
  let total;
  if (q) {
    mongoQuery = Project.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $match: {
          $or: [
            { title: { $regex: q, $options: "i" } },
            { tags: { $regex: new RegExp(q, "i") } },
            { "owner.name": { $regex: q, $options: "i" } },
            { "owner.username": { $regex: q, $options: "i" } },
          ],
        },
      },
      {
        $project: {
          title: 1,
          desc: 1,
          image: 1,
          tags: 1,
          github_link: 1,
          live_link: 1,
          likes: 1,
          comments: 1,
          saved: 1,
          total_likes: 1,
          total_saves: 1,
          total_comments: 1,
          created_at: 1,
          owner: {
            $arrayElemAt: [
              {
                $map: {
                  input: "$owner",
                  as: "o",
                  in: {
                    _id: "$$o._id",
                    username: "$$o.username",
                    email: "$$o.email",
                    avatar: "$$o.avatar",
                  },
                },
              },
              0,
            ],
          },
        },
      },
    ]).sort("-total_likes");

    const z = await Project.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $match: {
          $or: [
            { title: { $regex: q, $options: "i" } },
            { tags: { $regex: new RegExp(q, "i") } },
            { "owner.name": { $regex: q, $options: "i" } },
            { "owner.username": { $regex: q, $options: "i" } },
          ],
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);
    total = z[0]?.count || 0;
  } else {
    mongoQuery = Project.find(searchQuery)
      .sort("-total_likes")
      .select("-likes -comments -saved")
      .populate("owner", "name email avatar username");
    total = await Project.countDocuments(searchQuery);
  }
  const data = await paginate(req, res, mongoQuery);
  return { data, total };
};

module.exports = searchProject;
