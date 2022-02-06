import ReservationForm from "../miscellaneous/ReservationForm";
import { useHistory, useParams} from "react-router-dom";
import {readReservation, updateReservation} from "../utils/api";
import React, { useState, useEffect} from "react";
import ErrorAlert from "../layout/ErrorAlert";
import {formatAsDate} from "../utils/date-time"

function Edit(){
    const history = useHistory();
    const [reservationErrors, setReservationErrors] = useState(null);
    const [reservation, setReservation] = useState(null);
    const {reservation_id} = useParams();
    
    function loadReservation() {
       
        const abortController = new AbortController();
        setReservationErrors(null);
       
        readReservation(reservation_id, abortController.signal)
          .then(setReservation)
          .catch((error)=>{
              setReservationErrors(error)
        })
        return () => abortController.abort();
      }

    useEffect(loadReservation, [reservation_id]);

    function handleCancel() {
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
          setReservationErrors(error);
          return;
        }
        return () => abortController.abort();
      }
       if (reservation) {
           reservation.reservation_date = formatAsDate(reservation.reservation_date)
       }
      return (
          
          <div>
            
            <h1>Edit a reservation</h1>
            {reservation && <ReservationForm 

            handleSubmit={handleSubmit} 
            initialState={reservation} 
            handleCancel={handleCancel}/>}
             <ErrorAlert error={reservationErrors} />
          </div>
      )
     
}

export default Edit;
