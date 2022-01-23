import React from "react";

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
            <tr>
              <td>{reservation.last_name}</td>
              <td>{reservation.first_name}</td>
              <td>{reservation.mobile_number}</td>
              <td>{reservation.people}</td>
              <td>{reservation.reservation_time}</td>
              <td>{reservation.reservation_date}</td>
              <td>
                <a href={`/reservations/${reservation.reservation_id}/seat`}>
                  Seat
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
