require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3500;
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

//database connnection func'
const getconn = require("./config/dbConn");

//importing routes
const RootRoute = require("./routes/Root.Route");

// Initialize the connection and obtain the connection object
const db = getconn();

// Handle database connection events
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

app.use(logger);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", RootRoute);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 File Not Found");
  }
});

app.use(errorHandler);

db.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
