const puppeteer = require("puppeteer");
const fs = require("fs");

async function searchGoogle(keyword, depth, filePath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to Google and search for the keyword
  await page.goto(`https://www.google.com/search?q=${keyword}`);

  const results = [];

  for (let i = 0; i < depth; i++) {
    // Wait for the search results to load
    await page.waitForSelector("div#search");

    // Extract the search results on this page
    const pageResults = await page.evaluate(() => {
      const searchResults = [];
      const resultsElements = document.querySelectorAll("div.g");

      resultsElements.forEach((element) => {
        const titleElement = element.querySelector("h3");
        const linkElement = element.querySelector("a");

        if (titleElement && linkElement) {
          searchResults.push({
            title: titleElement.innerText,
            link: linkElement.href,
          });
        }
      });

      return searchResults;
    });

    // Add the page results to the overall results
    results.push(...pageResults);

    // Click the "Next" button if it exists
    const nextButton = await page.$("#pnnext");
    if (nextButton) {
      await nextButton.click();
    } else {
      break;
    }
  }

  // Close the browser
  await browser.close();


  // Return the search results
  return results;
}

module.exports = searchGoogle;
