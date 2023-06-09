const http = require("http");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

const server = http.createServer(app);

mongoose.connection.on("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

async function startServer() {
  await mongoose.connect(MONGODB_CONNECTION);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
}

startServer();
