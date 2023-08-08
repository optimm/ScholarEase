const { Schema, default: mongoose } = require("mongoose");

// const URLLinksSchema = new Schema({
//   link_title: String,
//   link_url: String,
// });

const ScholarshipLinksSchema = new Schema({
  title: String,
  link: String,
  desc: String,
});

// const URLLinks = mongoose.model("URLLinks", URLLinksSchema);

const ScholarshipLinks = mongoose.model(
  "ScholarshipLinks",
  ScholarshipLinksSchema
);

module.exports = ScholarshipLinks;
