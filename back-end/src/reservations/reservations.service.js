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

module.exports={ list, listSingleReservation, create, updateStatus };