require("dotenv").config();
require("express-async-errors");

//imports********************
const express = require("express");
const app = express();
const port = process.env.PORT;
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const helemt = require("helmet");
const xss = require("xss-clean");
const morgan = require("morgan");
const cluster = require("cluster");
const os = require("os");

const numCPUs = os.cpus().length;

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//db
const connectDb = require("./db/connect");

//importing routers
const authRouter = require("./routes/auth");
const projectRouter = require("./routes/project");
const userRouter = require("./routes/user");

// error handler middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//*******************************

//middlewares
app.use(
  cors({
    credentials: true,
    origin: `${process.env.FRONTEND_URL}`,
    sameSite: "none",
  })
);
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helemt());
app.use(xss());
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);

// error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDb();
    console.log("Connected to Database...\n");

    if (cluster.isMaster) {
      console.log(`Master ${process.pid} is running`);

      // Fork workers
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork(); // replace the dead worker
      });
    } else {
      app.listen(port, () => {
        console.log(
          `Devhub Server is running on port ${port} and worker ${process.pid} is listening`
        );
      });
    }
  } catch (error) {
    console.log(error);
  }
};
start();
