import React from "react";
import uniqid from "uniqid";
import {Link} from "react-router-dom"
import {updateReservation} from "../utils/api"

function ReservationsTable({ reservations }) {
  
 async function updateReservationToSeated (reservation) {
    try{
      await updateReservation(reservation.status, reservation.id)
    } catch(error) {
      console.error(error);

    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Mobile Number</th>
          <th>People</th>
          <th>Reservation Time</th>
          <th>Reservation Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => {
          return (
            <tr key={uniqid()}>
              <td key={uniqid()}>{reservation.last_name}</td>
              <td key={uniqid()}>{reservation.first_name}</td>
              <td key={uniqid()}>{reservation.mobile_number}</td>
              <td key={uniqid()}>{reservation.people}</td>
              <td key={uniqid()}>{reservation.reservation_time}</td>
              <td key={uniqid()}>{reservation.reservation_date}</td>
              <td key={uniqid()} data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
              {reservation.status === "booked" && <Link to={`/reservations/${reservation.reservation_id}/seat`}><button className="btn btn-primary mb-2" onClick={()=> updateReservationToSeated(reservation)}>Seat</button></Link>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ReservationsTable;
