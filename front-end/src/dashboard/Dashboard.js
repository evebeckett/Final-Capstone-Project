import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsTable from "../miscellaneous/ReservationsTable";
import ReservationsNavBtns from "../miscellaneous/ReservationsNavBtns";
import TablesTable from "../miscellaneous/TablesTable";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setError);

    listTables(abortController.signal).then(setTables).catch(setError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ReservationsNavBtns date={date} />
      <ErrorAlert error={error} />
      <ReservationsTable reservations={reservations} />
      <TablesTable tables={tables} />
    </main>
  );
}

export default Dashboard;
