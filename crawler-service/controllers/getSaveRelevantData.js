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
  for (let i = 0; i < search_links.length; i++) {
    const linkData = search_links[i];
    try {
      const scholarship_links = await scrape(linkData.link);
      for (let j = 0; j < scholarship_links.length; j++) {
        const obj = {
          link: scholarship_links[j].link,
          desc: `${linkData.title.trim()} ${scholarship_links[j].title.trim()}`,
        };
        // console.log({ obj });
        try {
          await addScholarShip(obj);
        } catch (error) {
          console.log("Add scholarship to backend error: ", err);
          continue;
        }
      }
    } catch (e) {
      console.log("Get data from links error: ", e);
    }
  }
};

module.exports = getSaveRelevantData;
