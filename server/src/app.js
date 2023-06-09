const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require('dotenv').config()

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

const app = express(module.exports);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(morgan("combined"));
app.use(express.json());
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/*", (request, response) => {
  response.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
module.exports = app;
