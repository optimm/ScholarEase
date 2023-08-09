require("dotenv").config();
const express = require("express");
const cron = require("node-cron");

const app = express();
const port = process.env.PORT;
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./db/connect");
const mainController = require("./controllers/main");
const { StatusCodes } = require("http-status-codes");

app.use(cors());

app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

//routes
app.get("/", async (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Crawler is up and running" });
});

const start = async () => {
  try {
    await connectDB();
    console.log("Connected to Db");
    app.listen(port, () => {
      console.log(`Server is running on port ${port} `);
    });

    // Schedule mainController to run at 8:00 AM and 6:00 PM every day

    cron.schedule("0 8,17 15 * *", () => {
      mainController();
    });
  } catch (error) {
    console.log(error);
  }
};
start();
