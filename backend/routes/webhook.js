const express = require("express");
const addScholarship = require("../controllers/webhook");
const { crawlerAuthMiddleware } = require("../middleware/crawler-authenticate");

const router = express.Router();

router.route("/scholarship/add").post(crawlerAuthMiddleware, addScholarship);

module.exports = router;
