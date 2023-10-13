const express = require("express");
const app = express();
const port = process.env.PORT || 3500;
const path = require("path");

app.use("/", express.static(path.join(__dirname, "public/")));
app.use("/", require(path.join(__dirname, "routes/Root.Route")));
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
