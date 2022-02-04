import React, { useState } from "react";
import ReservationsTable from "../miscellaneous/ReservationsTable";
import SearchForm from "../miscellaneous/SearchForm"


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Search() {

  
    const [reservationsByPhone, setReservationsByPhone] = useState();
 

  return (
    <main>
      <h1>Search by Phone</h1>
      <div className="d-md-flex mb-3">
      </div>
      
      
      <SearchForm  setReservationsByPhone={setReservationsByPhone} />
      <ReservationsTable reservations={reservationsByPhone} />
    
    </main>
  );
}

export default Search;
