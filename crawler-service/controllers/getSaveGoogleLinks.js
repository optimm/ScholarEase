const Links = require("../models/Links");
const searchGoogle = require("../utils/crawler");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const getSaveGoogleLinks = async () => {
  const links = await searchGoogle("government scholarship", 10, false);

  links.forEach(async (link) => {
    try {
      const ispresent = await Links.findOne({
        title: link.title,
        link: link.link,
      });
      if (!ispresent) {
        await Links.create({ title: link.title, link: link.link });
      }
    } catch (error) {
      console.log("Get Save Google Links error: ", error);
    }
  });
};

module.exports = getSaveGoogleLinks;
