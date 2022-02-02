import React, {useState} from "react";
import uniqid from "uniqid";
import {Link, useHistory} from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import {updateStatus} from "../utils/api"

function ReservationsTable({ reservations }) {
 
  const [reservationsTableError, setReservationsTableError] = useState();

  const history = useHistory();

 async function handleCancel(reservationId) {

  if (
    window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    )
  ) {
    
      updateStatus({status: "cancelled"}, reservationId)
      .then(()=> history.go(0))
      .catch(setReservationsTableError)
 
  }
    }
 function reservationsTemplate (reservations) {
  if(reservations) {
    if(reservations.length === 0) {
      return "****No reservations found****";
    } else {
      return (<table>
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
                <Link to={`/reservations/${reservation.reservation_id}/edit`}><button className="btn btn-primary mb-2">Edit</button></Link>
                <button data-reservation-id-cancel={reservation.reservation_id} onClick={() =>handleCancel(reservation.reservation_id)} className="btn btn-primary mb-2">Cancel</button>
                {reservation.status === "booked" && <Link to={`/reservations/${reservation.reservation_id}/seat`}><button className="btn btn-primary mb-2">Seat</button></Link>}
                
              </tr>
            );
          })}
        </tbody>
      </table>)
    }
  }
  }
  return (
    <div>
    {reservationsTemplate(reservations)}
    {/* <ErrorAlert error={reservationsTableError} /> */}
    </div>
  )
}
  
export default ReservationsTable;
