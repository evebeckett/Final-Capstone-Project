import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import {previous, next, today} from "../utils/date-time";

console.log("HELLO")
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  let history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div>
      <button className="btn btn-primary" type="button" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
      <button className="btn btn-primary" type="button" onClick={() => history.push(`/dashboard?date=${today(date)}`)}>Today</button>
      <button className="btn btn-primary" type="button"onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
      </div>
      <div>
      <ErrorAlert error={reservationsError} />
      
      </div>
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
        </tr>
      )
    })  }
        </tbody>
      </table>
      
    </main>
  );
}

export default Dashboard;
