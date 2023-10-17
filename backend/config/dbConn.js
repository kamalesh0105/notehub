const mongoose = require("mongoose");
const atlas_uri = process.env.DB_URI;
let conn = null;

// Making a database connection to Atlas MongoDB
const dbconn = () => {
  mongoose.connect(atlas_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  conn = db;
  return db; // Return the connection object
};

// Check whether there is an existing connection and return it or create a new connection
const getconn = () => {
  if (conn != null) {
    return conn;
  } else {
    return dbconn(); // Return the connection object from dbconn
  }
};

module.exports = getconn;
