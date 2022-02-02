import { useHistory } from "react-router-dom";
import {createReservation} from "../utils/api";
import React, { useState } from "react";
import ReservationForm from "../miscellaneous/ReservationForm";
// const React = require("react");
// const ReservationForm = require("../miscellaneous/ReservationForm");

function Reservations() {
    
    // async function handleSubmit(event) {
    //     const abortController = new AbortController();
    //     event.preventDefault();
    //     setReserveError(null);
      
    //      const url = `${API_BASE_URL}/reservations`;
    //      const options = {
    //       method: "POST",
    //       headers: {"Content-Type": "application/json"},
    //       body: JSON.stringify({data: newReservation}),
    //       signal: abortController.signal,
    //     };
    //     let resDate = newReservation["reservation_date"];
        
       
    //     fetchJson(url,options).then(() => history.push(`/dashboard?date=${resDate}`)).catch(setReserveError)
        
    //     return () => abortController.abort();
    //   }

    //   function handleCancel(event) {
    //     event.preventDefault();
    //     history.goBack();
    //   }
    const history = useHistory();
    const [reservationErrors, setReservationsErrors] = useState([]);
    
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
          setReservationsErrors(error.message);
          return;
        }
        return () => abortController.abort();
      }
    return (
        <div>
        { reservationErrors.length === 0 ? null : <ul >{reservationErrors.map((r) => (<li className="alert alert-danger" key={r}>{r}</li>))}</ul> }
        <h1>Create a reservation</h1>
        <ReservationForm handleSubmit={handleSubmit} handleCancel={handleCancel}/>

      </div>
  )
  };
  
  export default Reservations;