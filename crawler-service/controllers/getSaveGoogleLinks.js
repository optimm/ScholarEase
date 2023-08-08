const Links = require("../models/Links");
const searchGoogle = require("../utils/crawler");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const getSaveGoogleLinks = async () => {
  // 1 get the links from the crawler
  const links = await searchGoogle("government scholarship", 5, false);

  // store in db
  links.forEach(async (link) => {
    try {
      const ispresent = await Links.findOne({
        title: link.title,
        link: link.link,
      });
      if (!ispresent) {
        await Links.create({ title: link.title, link: link.link });
      }
    } catch (error) {}
  });
};

module.exports = getSaveGoogleLinks;
