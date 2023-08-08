const scrape = require("../utils/scraper");

async function getDataFromLinks(search_links) {
  const data = [];

  for (const [index, link] of search_links.entries()) {
    try {
      const scholarship_links = await scrape(link.link);
      // for each link - linkObj- linkObj-desc-
      for (const [index, scholarship_link] of scholarship_links.entries()) {
        const result = {
          title: scholarship_link.title.trim(),
          link: scholarship_link.link,
          desc: link.title.trim(),
        };

        data.push(result);
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  }
  return data;
}

module.exports = getDataFromLinks;
