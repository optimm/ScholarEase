const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { emailReg } = require("../utils/validation");
const Project = require("./Project");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Username already in use"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [emailReg, "Please provide a valid email"],
    unique: [true, "Email already in use"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    select: false,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  about: {
    type: String,
    max: [500, "About cannot be more than 500 characters"],
    default: "",
  },
  bio: {
    type: String,
    max: [200, "Bio cannot be more than 200 characters"],
    default: "",
  },
  profiles: {
    type: [
      {
        link: {
          type: String,
          required: [true, "Please provide a link"],
        },
        platform: {
          type: String,
          required: [true, "Please provide the platform name"],
        },
      },
    ],
    default: [],
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  saved_projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  total_followers: {
    type: Number,
    default: 0,
  },
  total_following: {
    type: Number,
    default: 0,
  },
  total_projects: {
    type: Number,
    default: 0,
  },
  reset_password: {
    type: String,
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log("password change");
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.CheckPassword = async function (userPassword) {
  const ismatch = await bcrypt.compare(userPassword, this.password);
  return ismatch;
};

// generating the jwt token
UserSchema.methods.CreateJWT = function ({ expires, id = null }) {
  return jwt.sign({ userId: this._id, hash: id }, process.env.JWT_SECRET, {
    expiresIn: expires,
  });
};

module.exports = mongoose.model("User", UserSchema);
