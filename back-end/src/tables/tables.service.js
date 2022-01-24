const knex = require("../db/connection");


function list() {
    return knex("tables").select("*").orderBy("table_name")
}

function create(newTable) {
    return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdRecords) => createdRecords[0])
}

function update(table) {
    return knex("tables")
    .where("table_id", table.table_id)
    .update(table)
  }

module.exports={ list, create, update }