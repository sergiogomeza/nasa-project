const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const api = require("./routes/api");
require("dotenv").config();

const app = express(module.exports);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(morgan("combined"));
app.use(express.json());
app.use("/v1", api);
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/*", (request, response) => {
  response.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
module.exports = app;
