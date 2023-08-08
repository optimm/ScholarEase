const getSaveGoogleLinks = require("./getSaveGoogleLinks");
const getRelevantData = require("./getRelevantData");

const main = async () => {
  // func 1
  await getSaveGoogleLinks();

  // func 2
  await getRelevantData();

  //make request
};

module.exports = main;
