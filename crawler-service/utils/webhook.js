const axios = require("axios");
const { generateJwtToken } = require("./generateJwtToken");

const addScholarShip = async ({ title = "", link, desc = "" }) => {
  try {
    const authToken = await generateJwtToken();
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const { data } = await axios.post(
      `${process.env.BACKEND_URL}/crawler/scholarship/add`,
      { title, link, desc },
      {
        headers,
      }
    );
  } catch (error) {
    console.log("Make request to backend error: ", error?.response?.data);
  }
};

module.exports = { addScholarShip };
