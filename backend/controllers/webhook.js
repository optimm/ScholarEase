const Scholarship = require("../models/Scholarship");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { CustomAPIError } = require("../errors");

const addScholarship = async (req, res) => {
  const { title, desc, link, tags } = req.body;
  const admin = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!admin) {
    throw new CustomAPIError("No Admin");
  }
  if (!link) {
    throw new BadRequestError("Link not present in scholarship");
  }
  const total = await Scholarship.count({});
  if (!title) {
    //ad title with number
    title = `Scholarship ${total + 1}`;
  }
  const scholarshipPresent = await Scholarship.find({ link });

  if (scholarshipPresent) {
    throw new BadRequestError("Scholarship is present in db");
  }

  let scholarshipData = { link, title };

  if (desc) scholarshipData.link = link;
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
