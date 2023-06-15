const { getAllPlanets } = require("../../models/planets.model");

async function httpGetAllPlanets(request, response) {
  return response.status(200).json(await getAllPlanets());
}

module.exports = {
  httpGetAllPlanets,
};
