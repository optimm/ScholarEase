const mongoose = require("mongoose");
const User = require("./User");

const ScholarshipSchema = new mongoose.Schema({
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
    required: [true, "Please provide a description"],
    max: [500, "Descripition cannot be more than 500 characters"],
  },
  tags: [{ type: String }],

  link: {
    type: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  upvotes: [
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
  total_upvotes: {
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

module.exports = mongoose.model("Scholarship", ScholarshipSchema);
