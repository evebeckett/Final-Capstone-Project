import ReservationForm from "../miscellaneous/ReservationForm";
import { useHistory } from "react-router-dom";
import {createReservation} from "../utils/api";
import React, { useState } from "react";

function Reservations(){
    const history = useHistory();
    const [reservationErrors, setReservationsErrors] = useState([]);
    
    function handleCancel(event) {
        event.preventDefault();
        history.goBack();
      }

    async function handleSubmit(event, reservationData) {
        event.preventDefault();
        const abortController = new AbortController();
        console.log(reservationData, "reservationData")
        try {
          await createReservation({
            ...reservationData,
            people: Number(reservationData.people),
          });
          let resDate = reservationData["reservation_date"];
    
          history.push(`/dashboard?date=${resDate}`);
        } catch (error) {
          console.error(error);
          setReservationsErrors(error.message);
          return;
        }
        return () => abortController.abort();
      }
      return (
          
          <div>
            {/* { reservationErrors.length === 0 ? null : <ul >{reservationErrors.map((r) => (<li className="alert alert-danger" key={r}>{r}</li>))}</ul> } */}
            <h1>Create a reservation</h1>
            <ReservationForm 
            handleSubmit={handleSubmit} handleCancel={handleCancel}/>

          </div>
      )
}
  export default Reservations;