const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function create (req, res, next) {
  
  tablesService
  .create(req.body.data)
  .then((data) => res.status(201).json({ data }))
  .catch(next)
 }
 
 async function list(req, res, next) {
 
    let data = await tablesService.list();
    
   res.json({data});
   
 }

 async function update(req, res, next){
  // find reservation_id
  let reservation_id = req.body.data;
  console.log(reservation_id)
  //save reservation_id into tables table
  //verify to make sure it works
  
  const data = (await tablesService.update(reservation_id)
  
  res.status(200).json({data})
}

module.exports = {
    list,
    create,
    update,
  };
  