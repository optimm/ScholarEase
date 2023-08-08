const { Schema, default: mongoose } = require("mongoose");

const LinksSchema = new Schema({
  title: String,
  link: String,
});

const Links = mongoose.model("Links", LinksSchema);

module.exports = Links;
