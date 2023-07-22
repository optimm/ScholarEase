const mongoose = require("mongoose");
const User = require("./User");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    max: [50, "Title cannot be more than 50 characters"],
  },
  image: {
    public_id: String,
    url: String,
  },
  desc: {
    type: String,
    max: [500, "Descripition cannot be more than 500 characters"],
  },
  tags: [{ type: String }],
  github_link: {
    type: String,
    required: [
      function () {
        return this.live_link === null;
      },
      "Code base or live link should be provided",
    ],
  },
  live_link: {
    type: String,
    required: [
      function () {
        return this.github_link === null;
      },
      "Code base or live link should be provided",
    ],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      comment: {
        type: String,
        required: [true, "Please provide a comment"],
        max: [200, "Comment cannot be more than 200 characters"],
      },
    },
  ],
  saved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  total_likes: {
    type: Number,
    default: 0,
  },
  total_comments: {
    type: Number,
    default: 0,
  },
  total_saves: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
