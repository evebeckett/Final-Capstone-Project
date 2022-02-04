import ReservationForm from "../miscellaneous/ReservationForm";
import { useHistory } from "react-router-dom";
import {createReservation} from "../utils/api";
import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert"

function Reservations(){
    const history = useHistory();
    const [reservationErrors, setReservationsErrors] = useState(null);
    
    function handleCancel(event) {
        event.preventDefault();
        history.goBack();
      }

    async function handleSubmit(event, reservationData) {
        event.preventDefault();
        const abortController = new AbortController();
        
        try {
          await createReservation({
            ...reservationData,
            people: Number(reservationData.people),
          });
          let resDate = reservationData["reservation_date"];
    
          history.push(`/dashboard?date=${resDate}`);
        } catch (error) {
          console.error(error);
          setReservationsErrors(error);
          return;
        }
        return () => abortController.abort();
      }
      return (
          
          <div>
            
            <h1>Create a reservation</h1>
            <ReservationForm 
            handleSubmit={handleSubmit} handleCancel={handleCancel} />
            <ErrorAlert error={reservationErrors} />
          </div>
      )
}
  export default Reservations;