const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
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

    if (typeof data.people !== "number" || data.people <= 0) {
      const error = new Error("'People' must be a number.");
      error.status = 400;
      error.message = "people must be a number.";
      throw error;
    }

    next();

}

function validateDate(req, res, next) {
  const { reservation_date } = req.body.data;

  const dateFormat = /\d\d\d\d-\d\d-\d\d/;

    if (!dateFormat.test(reservation_date)) {
      const error = new Error("reservation_date must be in the proper format");
      error.status = 400;
      error.message = "reservation_date must be in the proper format";
      throw error;
    }
    next();

}

function validateTime(req, res, next) {
  const { data = {} } = req.body;
  const timeFormat = /\d\d:\d\d/;

  
    if (!data.reservation_time.match(timeFormat)) {
      const error = new Error(
        "'reservation_time' must be in the proper format."
      );
      error.status = 400;
      error.message = "reservation_time must be in the proper format";
      throw error;
    }
    next();
}

function reservationNotOnTuesday(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;

  let date = new Date(reservation_date + " " + reservation_time);

  let dayOfWeek = date.getDay();

  
    if (dayOfWeek === 2) {
      const error = new Error(
        "The restaurant is closed on Tuesdays. Please pick another date."
      );
      error.status = 400;
      error.message =
        "The restaurant is closed on Tuesdays.  Please pick another date.";
      throw error;
    }
    next();
  
}

function reservationNotInPast(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;

  let date = new Date(reservation_date + " " + reservation_time);
  let today = new Date();

  
    if (date.getTime() < today.getTime()) {
      const error = new Error("You cannot create reservations in the past.");
      error.status = 400;
      error.message =
        "You cannot create reservations in the past. Please choose a date in the future.";
      throw error;
    }
    next();
}

function validateStatus(req, res, next) {
  const {status} = req.body.data;
  console.log(status, "status")
  
    if (
      status === "seated" || status === "finished"
    ) {
      const error = new Error(
        "Status must be not be 'finished' or 'seated'"
      );
      error.status = 400;
      error.message =
        "Status must not be 'finished' or 'seated'";
      throw error;
    }
    res.status(201)
    next();
  } 



function validateReservationTime(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  let requestedDate = new Date(reservation_date + " " + reservation_time);

  let hoursOpen = new Date(reservation_date + " " + "10:30:00");

  let hoursClosed = new Date(reservation_date + " " + "21:30:00");

  try {
    if (
      requestedDate.getTime() < hoursOpen.getTime() ||
      requestedDate.getTime() > hoursClosed.getTime()
    ) {
      const error = new Error(
        "The restaurant only accepts reservations between 10:30 a.m. and 9:30 p.m.  Please choose another reservation time."
      );
      error.status = 400;
      error.message =
        "The restaurant only accepts reservations between 10:30 a.m. and 9:30 p.m.  Please choose another reservation time..";
      throw error;
    }
    next();
  } catch (error) {
    console.log("error");
    next(error);
  }
}

async function listSingleReservation(req, res, next){
  const reservationId = req.params.reservation_id;

  let data = await reservationsService.listSingleReservation(reservationId)
  res.json({data});
}

function validateExistenceOfStatus(req, res, next) {
  const {status} = req.body.data;
  console.log(status, "<+++++++++++++++req.body.data(status")
  
  
    if (!status || status === "unknown") {
      const error = new Error(
        "Status is unknown."
      );
      error.status = 400;
      error.message =
        "Status is unknown.";
      throw error;
    }
    res.status(201)
    next();
  } 

async function validateStatusIsNotFinished(req, res, next) {
  
  const reservationId = req.params.reservation_id;
  try {
  const reservation = await reservationsService.listSingleReservation(reservationId)
  console.log(reservation, "<==========reservation")
  const status = reservation.status;
  console.log(reservation.status, "<=======reservation.status")

  if (status === "finished") {
    const error = new Error(
      "The status of 'finished' tables cannot be changed."
    );
    error.status = 400;
    error.message =
    "The status of 'finished' tables cannot be changed."
    throw error;
  }
  res.status(201)
  next();
} catch (error) {
  console.log("error")
  next(error);
}
  
}

async function validateWhetherReservationExists (req, res, next) {
  const reservationId = req.params.reservation_id;
  console.log(reservationId, "<=======reservationId(validateWhetherReservationExists)")
  try {
    let reservation = await reservationsService.listSingleReservation(reservationId)
    
    if (!reservation) {
      return next({
        status: 400,
        message: `reservation is already seated`,
      });
    }} catch (error) {
      console.log("error");
      next(error);
  
    }
  
}


async function updateStatus(req, res, next) {
 try {
  const data = (
    await reservationsService.updateStatus(
      Number(req.params.reservation_id),
      req.body.data.status
    )
  )[0];
  res.status(200).json({ data });
} catch (error) {
  console.log("error");
  next(error);
}
}

async function create(req, res, next) {
  reservationsService
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}

async function validateReservationId(req, res, next) {
  let reservationId = req.params.reservation_id;
  
  let data = await reservationsService.listSingleReservation(reservationId)
  
  if (!data) {
    res.status(200).json({ data });
  } else {
    return next({
      status: 404,
      message: `reservation_id ${reservationId} does not exist.`,
    });
  }
  next();
}

async function list(req, res, next) {
  let { date } = req.query;

  let data = await reservationsService.list(date);

  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    validatePeople,
    validateDate,
    validateTime,
    validateStatus,
    reservationNotOnTuesday,
    reservationNotInPast,
    validateReservationTime,
    asyncErrorBoundary(create),
  ],
  // validateReservationId: [validateReservationId],
  updateStatus: [
    validateExistenceOfStatus,
    validateStatusIsNotFinished,
    // validateWhetherReservationExists,
    // validateReservationId,

    // validateWhetherAlreadySeated,
    asyncErrorBoundary(updateStatus),
  ],
  listSingleReservation: [asyncErrorBoundary(listSingleReservation)],
};
