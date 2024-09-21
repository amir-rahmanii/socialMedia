// imports
const express = require("express");
var cookieParser = require("cookie-parser");
const { setHeaders } = require("./middlewares/setHeaders");
const path = require("path");
const userRouter = require("./modules/v1/users/user.routes");
const postRouter = require("./modules/v1/posts/post.routes");
const storyRouter = require("./modules/v1/story/story.routes");
const ticketRouter = require("./modules/v1/ticket/ticket.routes");
const errorHandler = require("./middlewares/errorHandler");
const convertToTrim = require("./middlewares/convertToTrim");
const systemInfoMiddleware = require("./middlewares/systemInfo");
const apiDocRoutes = require("./modules/v1/apiDoc/swagger.routes");
const cors = require('cors');

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// parse application/json
app.use(express.json({ limit: "50mb" }));

//parse cookies
app.use(cookieParser());

// cors policy
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
})); 

app.use(setHeaders);

// add system info middleware
app.use(systemInfoMiddleware);

//static folders
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

//convert to trim req.body
app.use(convertToTrim);

// routes
app.use("/api-doc", apiDocRoutes);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/story", storyRouter);
app.use("/ticket", ticketRouter);

// 404 err handler
app.use((req, res) => {
  console.log("this path is not found", req.path);
  return res
    .status(404)
    .json({ msg: "this path is not found, check method or path" });
});

// err handler
app.use(errorHandler); 

//export
module.exports = app;
