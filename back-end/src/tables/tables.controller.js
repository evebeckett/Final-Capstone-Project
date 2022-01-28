const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("table_name", "capacity");
const reservationsService = require("../reservations/reservations.service");

const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id"];

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

function validateCapacity(req, res, next) {
  const { data = {} } = req.body;

  try {
    if (typeof data.capacity !== "number" || data.capacity <= 0) {
      const error = new Error("'Capacity' must be a number.");
      error.status = 400;
      error.message = "capacity must be a number.";
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
}

function validateTableName(req, res, next) {
  const { data = {} } = req.body;
  try {
    if (!data.table_name || data.table_name.length < 2) {
      const error = new Error(
        "'table_name' must contain at least two characters."
      );
      error.status = 400;
      error.message = "'table_name' must contain at least two characters.";
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
}
async function validateNotOccupied(req, res, next) {
  const { data = {} } = req.body;
  let tableId = req.params.table_id;

  let table = await tablesService.listSingleTable(tableId);

  if (table.reservation_id) {
    return next({
      status: 400,
      message: "occupied",
    });
  }
  next();
}

function validateReservationId(req, res, next) {
  const { data = {} } = req.body;
  try {
    if (!data.reservation_id) {
      const error = new Error("reservation_id is missing");
      error.status = 400;
      error.message = "reservation_id is missing";
      throw error;
    }
    res.status(200);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function validateReservationIdExists(req, res, next) {
  const { data = {} } = req.body;

  res.locals.reservation = await reservationsService.listSingleReservation(
    data.reservation_id
  );

  if (!res.locals.reservation) {
    return next({
      status: 404,
      message: `reservation_id ${data.reservation_id} does not exist.`,
    });
  }
  next();
}

async function validateSufficientTableCapacity(req, res, next) {
  const { data = {} } = req.body;
  let reservationId = data.reservation_id;
  let tableId = req.params.table_id;

  try {
    let reservation = await reservationsService.listSingleReservation(
      reservationId
    );

    let table = await tablesService.listSingleTable(tableId);

    if (Number(table.capacity) < Number(reservation.people)) {
      const error = new Error(
        "the number of people exceeds the table capacity"
      );
      error.status = 400;
      error.message = "the number of people exceeds the table capacity";
      throw error;
    } else {
      res.status(200);
      next();
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function validateTableIsOccupied(req, res, next) {
  const { data = {} } = req.body;
  let tableId = req.params.table_id;

  let table = await tablesService.listSingleTable(tableId);

  if (!table.reservation_id) {
    return next({
      status: 400,
      message: "not occupied",
    });
  }
  next();
}

function validateTableId(req, res, next) {
  const { data = {} } = req.body;

  try {
    if (!data.table_id) {
      const error = new Error("table_id is missing");
      error.status = 400;
      error.message = "table_id is missing";
      throw error;
    }
    res.status(200);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function validateTableIdExists(req, res, next) {
  const { data = {} } = req.body;

  res.locals.tableId = await tablesService.listSingleTable(Number(data.table_id));

  if (!res.locals.tableId) {
    return next({
      status: 404,
      message: `table_id ${data.table_id} does not exist.`,
    });
  }
  next();
}

// async function updateToSeated(req, res, next) {
//   console.log(req.body.data, "<===========req.body.data")
//   let reservationId = req.body.data.reservation_id;
  
//   let status = req.body.data.status;
  
//   try {
    
//     await reservationsService.updateStatus(reservationId, status);
//     res.status(200);

//   } 
//     catch (error) {
//     console.log(error);
//     error.status = 400;
//     error.message = "Unable to seat table.";
//     throw error;
//   }
// }

async function create(req, res, next) {
  tablesService
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}

async function list(req, res, next) {
  try {
    let data = await tablesService.list();

    res.json({ data });
  } catch (error) {
    console.log(error);
    error.status = 400;
    error.message = "table info was unable to render";
    throw error;
  }
}

async function update(req, res, next) {
  //update reservation to "seated"
 
  let { reservation_id } = req.body.data;
  let tableId = req.params.table_id;
  
  
  try {

    await reservationsService.updateStatus(reservation_id, "seated");

    const data = await tablesService.update(tableId, reservation_id);

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    error.status = 400;
    error.message = "table info was unable to update";
    throw error;
  }
}

async function destroy(req, res, next) {
  let tableId = req.params.table_id;

  const data = (await tablesService.destroy(tableId))[0];
  res.status(200).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    hasRequiredProperties,
    hasOnlyValidProperties,
    validateCapacity,
    validateTableName,
    asyncErrorBoundary(create),
  ],

  update: [
    validateReservationId,
    validateReservationIdExists,
    validateSufficientTableCapacity,
    validateNotOccupied,
    asyncErrorBoundary(update),
  ],
  // updateToSeated: [updateToSeated],
  destroy: [
    // validateTableId,
    // validateTableIdExists,
    validateTableIsOccupied,
    asyncErrorBoundary(destroy),
  ],
};
