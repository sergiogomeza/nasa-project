const { getAllPlanets } = require("../../models/planets.model");

function httpGetAllPlanets(request, response) {
  return response.status(200).json(getAllPlanets());
}

module.exports = {
  httpGetAllPlanets,
};
