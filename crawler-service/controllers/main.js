const getSaveGoogleLinks = require("./getSaveGoogleLinks");
const getSaveRelevantData = require("./getSaveRelevantData");

const main = async () => {
  await getSaveGoogleLinks();
  await getSaveRelevantData();
};

module.exports = main;
