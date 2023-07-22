const axios = require("axios");
const getReadmeUrl = async ({ github_link }) => {
  const regex = /(?:https:\/\/)?github.com\/([\w-]+)\/([\w-]+)/;
  const match = github_link.match(regex);
  let link = null;
  let readmeData = null;

  if (match) {
    const url = `${match[1]}/${match[2]}`;
    try {
      const { data } = await axios.get(
        `https://api.github.com/repos/${url}/readme`
      );
      link = data?.download_url;  
    } catch (error) {}
  }
  if (link) {
    const { data } = await axios.get(link);
    readmeData = data;
  }
  return { readmeData, link };
};

module.exports = getReadmeUrl;
