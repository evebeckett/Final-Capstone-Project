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
        if (typeof data.people !== "number" || data.people <= 0) {
          const error = new Error("'People' must be a number.");
          error.status = 400;
          error.message = "people must be a number."
          throw error;
        }
      console.log("people is working")
      next();
    } catch (error) {
      next(error);
    }
  };

function validateDate(req, res, next) {
  console.log("Hello")
  console.log(req.body.data)
  const { reservation_date } = req.body.data;

  console.log("Hello again")
  
  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  
  console.log("Hello a third time")
  
  console.log(`data: ${reservation_date}`)

  console.log(`isMatch: ${dateFormat.test(reservation_date)}`)
  
  try {
        if (!dateFormat.test(reservation_date)) {
          const error = new Error("reservation_date must be in the proper format");
          error.status = 400;
          error.message = "reservation_date must be in the proper format"
          throw error;
        }
      next();
    } catch (error) {
      next(error);
    }
  };

  function validateTime(req, res, next) {
    const { data = {} } = req.body;
    const timeFormat = /\d\d:\d\d/;
  
      try {
          if (!data.reservation_time.match(timeFormat)) {
            const error = new Error("'reservation_time' must be in the proper format.");
            error.status = 400;
            error.message = "reservation_time must be in the proper format"
            throw error;
          }
        next();
      } catch (error) {
        next(error);
      }
    };
  


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
  create: [hasOnlyValidProperties, hasRequiredProperties, validatePeople, validateDate, validateTime, asyncErrorBoundary(create)] 
};

