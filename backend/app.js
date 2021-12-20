const express = require("express");
const logger = require("morgan");
const apiRouter = require("./routes/api");
const DB = require("./db/db");
const app = express();

app.use(logger("dev"));
app.use(express.json());

const PORT = 3100;

app.get("/", (req, res) => {
  res.json("Home Route");
});

app.use("/api", apiRouter);

module.exports = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
