const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const hasRequiredProperties = hasProperties("first_name",
"last_name",
"mobile_number",
"reservation_date",
"reservation_time",
"people");

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

function validateFirstName(req, res, next) {
  const { data = {} } = req.body;

  if (!data.first_name || data.first_name.length === 0) {
    const error = new Error("first_name is missing");
    error.status = 400;
    error.message = "first_name is missing";
    throw error;
  }

  next();
}

function validateLastName(req, res, next) {
  const { data = {} } = req.body;

  if (!data.last_name || data.last_name.length === 0) {
    const error = new Error("last_name is missing");
    error.status = 400;
    error.message = "last_name is missing";
    throw error;
  }

  next();
}

function validateMobileNumber(req, res, next) {
  const { data = {} } = req.body;

  if (!data.mobile_number || data.mobile_number.length === 0) {
    const error = new Error("mobile_number is missing");
    error.status = 400;
    error.message = "mobile_number is missing";
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

  if (!data.reservation_time || !data.reservation_time.match(timeFormat)) {
    const error = new Error("'reservation_time' must be in the proper format.");
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
  const { status } = req.body.data;

  if (status === "seated" || status === "finished") {
    const error = new Error("Status must be not be 'finished' or 'seated'");
    error.status = 400;
    error.message = "Status must not be 'finished' or 'seated'";
    throw error;
  }
  res.status(201);
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
    next(error);
  }
}

function validateExistenceOfStatus(req, res, next) {
  
  const { status } = req.body.data;
  const validStatuses = ["booked", "seated", "finished", "cancelled"]
  if (!status || !validStatuses.includes(status)) {
    const error = new Error(`${status} is not a valid status or is unknown.`);
    error.status = 400;
    throw error;
  }
  res.status(201);
  next();
}

function validateStatusIsNotFinished(req, res, next) {
  
    const {status} = res.locals.reservation;

    if (status === "finished") {
      const error = new Error(
        "The status of 'finished' tables cannot be changed."
      );
      error.status = 400;
      throw error;
    }
    
    next();
}



async function validateWhetherReservationExists(req, res, next) {
  const reservationId = req.params.reservation_id;
  try {
    let reservation = await reservationsService.listSingleReservation(
      reservationId
    );

    if (!reservation) {
      return next({
        status: 404,
        message: `reservation does not exist`,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function validateReservationId(req, res, next) {
  let reservationId = req.params.reservation_id;
  try {
    res.locals.reservation = await reservationsService.listSingleReservation(
      reservationId
    );

    if (!res.locals.reservation) {
     
      return next({
        status: 404,
        message: `reservation_id ${reservationId} does not exist.`,
      });
    }
    next();
  } catch (error) {
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
    );
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
 
  reservationsService
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}

async function list(req, res, next) {
  let data;
 
  if (req.query.date) {
    data = await reservationsService.list(req.query.date);
  } else if (req.query.mobile_number) {
    data = await reservationsService.search(req.query.mobile_number);
  } else {
    data = [];
  }
  res.json({
    data: data,
  });
}
async function update(req, res, next) {
  const data = (
    await reservationsService.update(Number(req.params.reservation_id), req.body.data)
  )[0];
  res.status(200).json({ data });
}

async function listSingleReservation(req, res, next) {
  const reservationId = req.params.reservation_id;
  let data = await reservationsService.listSingleReservation(
    Number(reservationId)
  );
  res.json({ data });
}
module.exports = {
  list:  [asyncErrorBoundary(list)],
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

  updateStatus: [
    asyncErrorBoundary(validateReservationId),
    validateExistenceOfStatus,
    validateStatusIsNotFinished,
    asyncErrorBoundary(updateStatus),
  ],
  listSingleReservation: [
    hasOnlyValidProperties,
    asyncErrorBoundary(validateReservationId),
    [asyncErrorBoundary(listSingleReservation)],
  ],
  update: [
    validateFirstName, 
    validateLastName, 
    validateMobileNumber, 
    validatePeople, 
    validateDate, 
    validateTime,
    reservationNotOnTuesday,
    reservationNotInPast,
    validateReservationTime,
    asyncErrorBoundary(validateWhetherReservationExists),
    asyncErrorBoundary(update)],
};
