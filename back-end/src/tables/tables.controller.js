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

module.exports = {
    list,
    create
  };
  