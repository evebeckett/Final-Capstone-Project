const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const hasProperties = require("../errors/hasProperties")
const hasRequiredProperties = hasProperties("table_name", "capacity")
const reservationsService= require("../reservations/reservations.service")

const VALID_PROPERTIES = [
  "table_name",
  "capacity",
  "reservation_id"
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

function validateCapacity(req, res, next) {
  const { data = {} } = req.body;
  console.log(typeof data.capacity)
  try {
      if (typeof data.capacity !== "number" || data.capacity <= 0) {
        const error = new Error("'Capacity' must be a number.");
        error.status = 400;
        error.message = "capacity must be a number."
        throw error;
      }
   
    next();
  } catch (error) {
    next(error);
  }
};

function validateTableName(req, res, next) {
  const { data = {} } = req.body;
  try {
      if (!data.table_name || data.table_name.length < 2) {
        const error = new Error("'table_name' must contain at least two characters.");
        error.status = 400;
        error.message = "'table_name' must contain at least two characters."
        throw error;
      }
   
    next();
  } catch (error) {
    next(error);
  }
}

function validateNotOccupied(req, res, next) {
  const { data = {} } = req.body;
  try {
      if (typeof data.reservation_id === "number") {
        const error = new Error("This table is currently occupied.  Please choose another table.");
        error.status = 400;
        error.message = "This table is currently occupied.  Please choose another table."
        throw error;
      }
   
    next();
  } catch (error) {
    console.error(error)
    next(error);
  }
}

function validateReservationId(req, res, next) {
  const { data = {} } = req.body;
  try {
      if (!data.reservation_id || Number(data.reservation_id) === NaN) {
        const error = new Error("reservation_id is missing");
        error.status = 400;
        error.message = "reservation_id is missing"
        throw error;
      }
   
    next();
  } catch (error) {
    console.error(error)
    next(error);
  }
}

// async function validateSufficientTableCapacity(req, res, next) {
//   const { data = {} } = req.body;
//   let reservationId = data.reservation_id
 
//   try {
     
//       let reservation = await reservationsService.listSingleReservation(reservationId)
      
//       let table = await tablesService.listSingleTable(reservationId)
      
//       console.log(reservation.people, "people")

//       console.log(table.capacity, "capacity")
      

//       if (Number(table.capacity) < Number(reservation.people)) {
//         const error = new Error("the number of people exceeds the table capacity");
//         error.status = 400;
//         error.message = "the number of people exceeds the table capacity";
//         throw error;
//       }
      
//     next();
//   } catch (error) {
//     console.error(error)
//     next(error);
//   }
// }

async function create (req, res, next) {
  
  tablesService
  .create(req.body.data)
  .then((data) => res.status(201).json({ data }))
  .catch(next)

 }
 
 async function list(req, res, next) {
 try {
    let data = await tablesService.list();
    
   res.json({data});
  }
   
    catch (error) {
     console.log(error)
     error.status = 400;
     error.message = "table info was unable to render"
     throw error;
   }
  }
 

 async function update(req, res, next){
  // find reservation_id
  let {reservation_id} = req.body.data;
  let tableId = req.params.table_id
 try {
  const data = await tablesService.update(tableId, reservation_id)
  
  res.status(200).json({data})

 } catch (error) {
   console.log(error)
   error.status = 400;
   error.message = "table info was unable to update"
   throw error;
 }
}

module.exports = {
    list,
    create: [
      hasRequiredProperties, 
      hasOnlyValidProperties, 
      validateCapacity, 
      validateTableName,
      create
    ],
    
    update: [
      validateNotOccupied,
      validateReservationId,
      // validateSufficientTableCapacity,
      update,
    ],
  };
  