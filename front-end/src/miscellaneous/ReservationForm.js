import React, { useState } from "react";


function ReservationForm({
  handleSubmit,
  handleCancel,
  initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "1",
  },
}){

  const [reservationData, setReservationData] = useState(initialState);
 

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
    [event.target.name]: Number(event.target.value.trim())
  });
}

function handlePhoneChange(event) {

  setReservationData({
    ...reservationData,

    [event.target.name]: event.target.value.replace(/[^0-9]/g, '').trim()
})
}

  
    return (
      <div>
        <form onSubmit={(event) => handleSubmit(event, reservationData)}>
        <div className="form-group col-md-6">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={handleChange}
            value={reservationData.first_name}
            required
          ></input>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={handleChange}
            value={reservationData.last_name}
            required
          ></input>
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="reservationDate">Reservation Date:</label>
          <input
            type="date"
            name="reservation_date"
            placeholder="0000/00/00"
            onChange={handleChange}
            value={reservationData.reservation_date}
            required
          ></input>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="reservationTime">Reservation Time:</label>
          <input
            type="time"
            name="reservation_time"
            placeholder="00:00"
            onChange={handleChange}
            value={reservationData.reservation_time}
            required
          ></input>
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            name="mobile_number"
            placeholder="(xxx) xxx-xxxx"
            onChange={handlePhoneChange}
            value={reservationData.mobile_number}
            required
          ></input>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="numberOfPeople">Number of People:</label>
          <input type="number" 
          min="1" 
          name="people" 
          placeholder="1" 
          onChange={handleNumberChange} 
          value={reservationData.people}
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
      
    
    </div>
    
  
  );
}

export default ReservationForm;
