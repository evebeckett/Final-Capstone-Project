const knex = require("../db/connection");

function updateStatus(reservationId, status){
    return knex("reservations")
    .select("*")
    .where({"reservation_id": reservationId})
    .update({"status": status})
    .returning("*");
}

function list(date) {
    return knex("reservations")
    .select("*")
    .where({"reservation_date":date})
    .whereNot({"status": "finished"})
    .orderBy("reservation_time");
}

function listSingleReservation(reservationId) {
    return knex("reservations").select("*").where({"reservations.reservation_id": reservationId}).first()
}
    

function create(newReservation) {
    return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0])
}

function destroy(reservationId) {
    return knex("reservations")
    .where("reservation_id", reservationId)
    .update("status", "finished")
  }


function search(mobile_number) {
    return knex("reservations")
        .whereRaw(
           "translate(mobile_number, '() -', '') like ?",
          `%${mobile_number.replace(/\D/g, "")}%`
         )
         .orderBy("reservation_date");
     }
module.exports={ list, listSingleReservation, create, updateStatus, destroy, search };