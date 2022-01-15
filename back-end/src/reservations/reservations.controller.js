const reservationsService = require("./reservations.service");
const { default: Reservations } = require("../../../front-end/src/reservations/Reservations");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
  const data = await reservationsService.list();
  res.json({data});
}

async function create () {
 return null;
}

module.exports = asyncErrorBoundary(list)

