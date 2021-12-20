const mongoose = require("mongoose");
const DB_URI =
  "mongodb://localhost:27017/gbgdev?readPreference=primary&directConnection=true&ssl=false";
let DB = mongoose.connect(DB_URI, () => {
  console.log("Connected to Mongo DB");
});

module.exports = DB;
