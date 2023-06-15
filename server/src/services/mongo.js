const mongoose = require("mongoose");

const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

mongoose.connection.on("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

async function mongoConnect() {
  await mongoose.connect(MONGODB_CONNECTION);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
