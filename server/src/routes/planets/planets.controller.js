const fetchedPlanets = require("../../models/planets.model");

function getAllPlanets(request, response) {
  return response.status(200).json(fetchedPlanets);
}

module.exports = {
  getAllPlanets,
};
