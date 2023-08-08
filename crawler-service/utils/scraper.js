const axios = require("axios");
const cheerio = require("cheerio");

async function scrape(link) {
  // console.log("scraping:", link);
  const scholarshipsLinks = new Set();

  try {
    const url = link;
    const pageHTML = await axios.get(url);
    const $ = cheerio.load(pageHTML.data);

    $("a").each((index, element) => {
      const link = $(element).attr("href");
      var linkText = $(element).text();
      // console.log(link);
      // console.log(linkText);
      linkText = linkText.toLowerCase();

      if (linkText.includes("scholarship")) {
        const linkObj = { title: linkText, link: link };
        scholarshipsLinks.add(linkObj);
        // console.log(link);
      }
    });
  } catch (e) {
    console.log("error: ", e);
  }
  return [...scholarshipsLinks];
}

module.exports = scrape;
