import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm({
  handleSubmit,
  handleCancel,
  initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "0",
  },
}){

  const [reservationData, setReservationData] = useState(initialState);
  const [reserveError, setReserveError] = useState();
  const history = useHistory();

  function updateReservationData(){
      if(initialState.reservation_id !== reservationData.reservation_id){
        setReservationData({...initialState, reservation_date: initialState.reservation_date.substring(0,10)})
      }
  }

  useEffect(updateReservationData, [initialState, reservationData.reservation_id]);


function handleChange(event) {
  
  setReservationData({
    ...reservationData,
    
    // Trimming any whitespace
    [event.target.name]: event.target.value.trim()
  });
}

function handleNumberChange(event) {
  setReservationData({
    ...reservationData,

    // Trimming any whitespace
    [event.target.name]: parseInt(event.target.value.trim())
  });
}

function handlePhoneChange(event) {

  setReservationData({
    ...reservationData,

    [event.target.name]: event.target.value.replace(/[^0-9]/g, '').trim()
})
}

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
    
   
  //   fetchJson(url,options).then(() => history.push(`/dashboard?date=${resDate}`)).catch(setReserveError)
    
  //   return () => abortController.abort();
  // }

  

    return (
      <div>
        <form onSubmit={(event) => handleSubmit(event, reservationData)}>
        <div className="form-group col-md-6">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="reservationDate">Reservation Date</label>
          <input
            type="date"
            name="reservation_date"
            placeholder="0000/00/00"
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="reservationTime">Reservation Time</label>
          <input
            type="time"
            name="reservation_time"
            placeholder="00:00"
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="text"
            name="mobile_number"
            placeholder="(xxx) xxx-xxxx"
            onChange={handlePhoneChange}
            required
          ></input>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="numberOfPeople">Number of People</label>
          <input type="number" 
          min="1" 
          name="people" 
          placeholder="1" 
          onChange={handleNumberChange} 
          required></input>
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
              type="cancel"
              className="btn btn-danger mb-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
        </div>
        
      </form>
      {/* <ErrorAlert error={reserveError} /> */}
    </div>
    
  
  );
}

export default ReservationForm;
