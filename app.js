var express = require("express");
var path = require("path");
require("./src/db/Mongoose");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
var app = express();
app.use(cors());

var bodyParser = require("body-parser");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/driver");
var signupRouter = require("./routes/Signup");

var contactRouter = require("./routes/contactRoute");
var bookingRouter = require("./routes/Booking")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", signupRouter);
app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/", contactRouter)
app.use("/", bookingRouter)

app.listen(5000, () => {
  console.log(`server connected successfully`);
});
