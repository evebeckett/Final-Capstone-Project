const knex = require("../db/connection");


function list() {
    return knex("tables").select("*").orderBy("table_name")
}

function listSingleTable(tableId) {
    return knex("tables").select("*").where({"tables.table_id": tableId}).first()
}

function create(newTable) {
    return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdRecords) => createdRecords[0])
}

function update(tableId, reservationId) {
    return knex("tables")
    .where("table_id", Number(tableId))
    .update("reservation_id", Number(reservationId))
  }

module.exports={ list, listSingleTable, create, update }