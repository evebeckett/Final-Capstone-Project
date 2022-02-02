import React, { useState, useEffect } from "react";
import ReservationForm from "../miscellaneous/ReservationForm";
import {useParams, useHistory} from "react-router-dom";
import {readReservation, updateReservation} from "../utils/api"

function Edit() {


  const {reservation_id} = useParams()
  const [reservation, setReservation] = useState()
;
  const[reservationErrors, setReservationErrors] = useState();
  const history = useHistory();

function loadReservation() {
    const abortController = new AbortController();
        setReservationErrors([]);
        readReservation( Number(reservation_id), abortController.signal)
          .then(setReservation)
          .catch((errors)=>{
              console.error(errors)
              setReservationErrors([errors])
        })
        return () => abortController.abort();
}

useEffect((loadReservation), [reservation_id])
    
 
function handleCancel(event) {
    history.go(1);
  }

async function handleSubmit(event, reservationData) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await updateReservation({
        ...reservationData,
        people: Number(reservationData.people),
      });
      let resDate = reservationData["reservation_date"];

      history.push(`/dashboard?date=${resDate}`);
    } catch (error) {
      console.error(error);
      setReservationErrors([error.message]);
      return;
    }
    return () => abortController.abort();
  }
  return (
    <main>
      <h1>Edit Reservation</h1>
      <div>
            { reservationErrors.length === 0 ? null : <ul >{reservationErrors.map((r) => (<li className="alert alert-danger" key={r}>{r}</li>))}</ul> }
            <h1>Edit a reservation</h1>
            <ReservationForm handleSubmit={handleSubmit} initialState={reservation} handleCancel={handleCancel}/>
          </div>
    </main>
  );
}

export default Edit;
