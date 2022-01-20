const reservationsService = require("./reservations.service");
// const { default: Reservations } = require("../../../front-end/src/reservations/Reservations");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

function validatePeople(req, res, next) {
    const { data = {} } = req.body;

    try {
      
        if (isNaN(parseInt(data.people))) {
          const error = new Error("'People' must be a number.");
          error.status = 400;
          throw error;
        }
      next();
    } catch (error) {
      next(error);
    }
  };


function validateReservationTime() {
  return null;
}

function validateDate() {
  return null;
}

async function create (req, res, next) {
 reservationsService
 .create(req.body.data)
 .then((data) => res.status(201).json({ data }))
 .catch(next)
}



async function list(req, res) {
  let {date} = req.query;

   let data = await reservationsService.list(date);
   
  res.json({data});
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasOnlyValidProperties, hasRequiredProperties, validatePeople, create] 
};

