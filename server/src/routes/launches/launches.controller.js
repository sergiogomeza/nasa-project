const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

async function httpGetAllLaunches(request, response) {
  return response.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(request, response) {
  const launch = request.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return response
      .status(400)
      .json({ error: "Missing required launch property" });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return response.status(400).json({
      error: "Invalid launch date",
    });
  }
  await scheduleNewLaunch(launch);
  return response.status(201).json(launch);
}

async function httpAbortLaunch(request, response) {
  const launchId = Number(request.params.id);
  const existsLaunch = await existsLaunchWithId(launchId);

  if (!existsLaunch) {
    return response.status(404).json({
      error: "Launch not found",
    });
  }
  const aborted = abortLaunchById(launchId);
  if (!aborted) {
    return response.status(400).json({ error: "Launch not aborted" });
  }
  return response.status(200).json({ ok: true });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
