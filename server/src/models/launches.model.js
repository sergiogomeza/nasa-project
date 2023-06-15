const launchesMongoDB = require("./launches.mongo");
const planetsMongoDB = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

async function existsLaunchWithId(launchId) {
  return await launchesMongoDB.findOne({
    flightNumber: launchId,
  });
}

async function getAllLaunches() {
  return await launchesMongoDB.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  const planet = await planetsMongoDB.findOne({
    keplerName: launch.target,
  });

  console.log(planet);

  if (!planet) {
    throw new Error("No matching planet was found");
  }

  await launchesMongoDB.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

async function scheduleNewLaunch(launch) {
  const flightNumber = await getLastFlightNumber();

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Zero to Mastery", "NASA"],
    flightNumber,
  });
  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  const aborted = await launchesMongoDB.updateOne(
    {
      flightNumber: launchId,
    },
    { upcoming: false, success: false }
  );

  return aborted.modifiedCount === 1;
}

async function getLastFlightNumber() {
  const latestLaunch = await launchesMongoDB.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};
