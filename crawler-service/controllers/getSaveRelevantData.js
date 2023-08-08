const Links = require("../models/Links");
const scrape = require("../utils/scraper");
const { addScholarShip } = require("../utils/webhook");

const getSaveRelevantData = async () => {
  let search_links = [];

  try {
    search_links = await Links.find({});
    console.log("Fetched the links");
  } catch (err) {
    console.error("Fetching links from db error: ", err);
  }

  try {
    await addScholarShip({ title: "Hello", link: "hello", desc: "hello" });
  } catch (err) {
    console.log("Add scholarship to backend error: ", err);
    // continue;
  }
  // for (let i = 0; i < search_links.length; i++) {
  //   const linkData = search_links[i];
  //   try {
  //     const scholarship_links = await scrape(linkData.link);
  //     for (let j = 0; j < scholarship_links.length; j++) {
  //       const obj = {
  //         title: scholarship_links[j].title.trim(),
  //         link: scholarship_links[j].link,
  //         desc: linkData.title.trim(),
  //       };
  //       try {
  //         await addScholarShip(obj);
  //       } catch (error) {
  //         console.log("Add scholarship to backend error: ", err);
  //         continue;
  //       }
  //     }
  //   } catch (e) {
  //     console.log("Get data from links error: ", e);
  //   }
  // }
};

module.exports = getSaveRelevantData;
