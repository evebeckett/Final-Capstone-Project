import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { fetchJson } from "../utils/api";
import Edit from "../edit/Edit"
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function ReservationForm({handleSubmit, handleCancel, initialFormData={
  first_name: "",
  last_name: "",
  mobile_number:"",
  reservation_date:"",
  reservation_time:"",
  people:0,
  status: "booked",
} }) {
 
  const history = useHistory();
  const [newReservation, setNewReservation] = useState(initialFormData);
  const [reserveError, setReserveError] = useState(null);
  const [reservationData, setReservationData] = useState(initialFormData);

  function updateReservationData(){
    if(initialFormData.reservation_id !== reservationData.reservation_id){
      setReservationData({...initialFormData, reservation_date: initialFormData.reservation_date.substring(0,10)})
    }
}

useEffect(updateReservationData, [initialFormData, reservationData.reservation_id]);
function handleChange(event) {
  setNewReservation({
    ...newReservation,

    // Trimming any whitespace
    [event.target.name]: event.target.value.trim()
  });
}

function handleNumberChange(event) {
  setNewReservation({
    ...newReservation,

    // Trimming any whitespace
    [event.target.name]: parseInt(event.target.value.trim())
  });
}

function handlePhoneChange(event) {

  setNewReservation({
    ...newReservation,

    [event.target.name]: event.target.value.replace(/[^0-9]/g, '').trim()
})
}



  

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
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
          <button type="button" className="btn btn-primary" onClick={() => history.goBack()}>
            Cancel
          </button>
        </div>
        
      </form>
      <ErrorAlert error={reserveError} />
    </div>
    
  
  );
}

export default ReservationForm;
