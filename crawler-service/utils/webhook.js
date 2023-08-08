const axios = require("axios");
const { generateJwtToken } = require("./generateJwtToken");

const addScholarShip = async ({ title = "", link, desc = "" }) => {
  console.log("reached webhook");
  try {
    const authToken = await generateJwtToken();
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const scholarship = await axios.post(
      `${process.env.BACKEND_URL}/crawler/scholarship/add`,
      { title, link, desc },
      {
        headers,
      }
    );

    console.log({ scholarship });
  } catch (error) {
    console.log("Make request to backend error: ", error);
  }
};

module.exports = { addScholarShip };
