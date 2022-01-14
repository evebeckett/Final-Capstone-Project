/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
async function list(req, res) {
  res.json({
    data: [],
  });
}

async function create () {
  
}

module.exports = {
  asyncErrorBoundary(list),
};
