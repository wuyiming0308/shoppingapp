var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
const usersRouter = require("./routes/user");
const authenticationRouter = require("./routes/authentication");
const productRouter = require("./routes/products");

var app = express();
app.use(cors({ origin: "*" }));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authenticationRouter);
app.use("/products", productRouter);
app.use("/user", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

var url =
  "mongodb+srv://wuyiming:19950308@cluster0.9y7eagg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url).then(() => {
  console.log("successfully conenct to db");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
