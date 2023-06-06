const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchId,
  abortLaunchById,
} = require("../../models/launches.model");

function httpGetAllLaunches(request, response) {
  return response.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(request, response) {
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
  addNewLaunch(launch);
  return response.status(201).json(launch);
}

function httpAbortLaunch(request, response) {
  const launchId = Number(request.params.id);

  if (!existsLaunchId(launchId)) {
    return response.status(404).json({
      error: "Launch not found",
    });
  }
  const aborted = abortLaunchById(launchId);
  return response.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
