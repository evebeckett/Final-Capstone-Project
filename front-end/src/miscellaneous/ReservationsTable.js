import React from "react";
import uniqid from "uniqid";

function ReservationsTable({ reservations }) {
  
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
              <td key={uniqid()}>
                <a href={`/reservations/${reservation.reservation_id}/seat`}>
                <button >
                  Seat
                </button>
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ReservationsTable;
