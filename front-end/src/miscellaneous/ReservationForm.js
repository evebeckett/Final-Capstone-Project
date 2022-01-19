import React, { useState } from "react";
import {useHistory} from "react-router-dom";
const fetch = require("cross-fetch");
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function ReservationForm() {
  let initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number:"",
    reservation_date:"",
    reservation_time:"",
    people:""
  };
  const history = useHistory();
  const [newReservation, setNewReservation] = useState(initialFormData);

function handleChange(event) {
  setNewReservation({
    ...newReservation,

    // Trimming any whitespace
    [event.target.name]: event.target.value.trim()
  });
}

async function handleSubmit(event) {
  
    event.preventDefault();
    console.log(newReservation);
     const url = `${API_BASE_URL}/reservations`;
     const options = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({data: newReservation})
    };
    let resDate = newReservation["reservation_date"];
    
    history.push(`/dashboard?date=${resDate}`);
    return await fetch(url,options);

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
            type="tel"
            name="mobile_number"
            placeholder="(xxx) xxx-xxxx"
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="numberOfPeople">Number of People</label>
          <input type="number" 
          min="1" 
          name="people" 
          placeholder="1" 
          onChange={handleChange} 
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
    </div>
  );
}

export default ReservationForm;
