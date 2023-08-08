const Links = require("../models/Links");
const scrape = require("../utils/scraper");
const ScholarshipLinks = require("../models/ScholarshipLinks");
const getDataFromLinks = require("../controllers/getDataFromLinks");

const getRelevantData = async () => {
  // get all the link from db

  let search_links = [];
  try {
    search_links = await Links.find({});
    // console.log("Fetched data:", search_links);
  } catch (err) {
    console.error("Error fetching data");
  }

  const data = await getDataFromLinks(search_links);

  data.forEach(async (d) => {
    try {
      const saved = await ScholarshipLinks.create({
        title: d.title,
        link: d.link,
        desc: d.desc,
      });
      console.log("Inserted data: ", saved);
    } catch (err) {
      console.log("Error: ", err);
    }
  });
};

module.exports = getRelevantData;
