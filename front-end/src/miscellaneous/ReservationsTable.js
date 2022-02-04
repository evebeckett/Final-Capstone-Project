import React, {useState} from "react";
import uniqid from "uniqid";
import {Link, useHistory} from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import {updateStatus} from "../utils/api"

function ReservationsTable({ reservations }) {
 
  const [reservationsTableError, setReservationsTableError] = useState(null);

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
      return (
      <table className="col-xs-8 col-md-9 tables">
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
                <td>{reservation.last_name}</td>
                <td>{reservation.first_name}</td>
                <td>{reservation.mobile_number}</td>
                <td>{reservation.people}</td>
                <td>{reservation.reservation_time}</td>
                <td>{reservation.reservation_date}</td>
                <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
                <td className="resBtns btn-group">
                
                
                {reservation.status === "booked" && <Link to={`/reservations/${reservation.reservation_id}/seat`}><button className="btn btn-primary mb-2 resBtn">Seat</button></Link>}

                <Link to={`/reservations/${reservation.reservation_id}/edit`}><button className="btn btn-primary mb-2 resBtn">Edit</button></Link>
                <button id="cancelBtn" data-reservation-id-cancel={reservation.reservation_id} onClick={() =>handleCancel(reservation.reservation_id)} className="btn btn-primary mb-2 resBtn">Cancel</button>
                </td>
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
    <ErrorAlert error={reservationsTableError} /> 
    </div>
  )
}
  
export default ReservationsTable;
