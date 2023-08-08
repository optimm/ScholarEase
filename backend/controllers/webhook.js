const Scholarship = require("../models/Scholarship");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { CustomAPIError, BadRequestError } = require("../errors");

const addScholarship = async (req, res) => {
  let { title, desc, link, tags } = req.body;
  const admin = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!admin) {
    throw new CustomAPIError("No Admin");
  }
  if (!link) {
    throw new BadRequestError("Link not present in scholarship");
  }
  const total = await Scholarship.count({});
  if (!title || title === "") {
    //ad title with number
    title = `Scholarship ${total + 1}`;
  }
  const scholarshipPresent = await Scholarship.findOne({ link });

  if (scholarshipPresent) {
    throw new BadRequestError("Scholarship is present in db");
  }

  let scholarshipData = { link, title };

  if (desc && desc != "") scholarshipData.desc = desc;
  if (tags) scholarshipData.tags = tags;

  const scholarship = await Scholarship.create({
    ...scholarshipData,
    owner: admin._id,
  });
  admin.scholarships.unshift(scholarship._id);
  admin.total_scholarships += 1;
  await admin.save();

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Scholarship Created" });
};

module.exports = addScholarship;
