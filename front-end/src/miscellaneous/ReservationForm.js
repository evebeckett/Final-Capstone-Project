import React from "react";
import {useHistory} from "react-router-dom"

function ReservationForm() {

  const history = useHistory();
  
  async function handleSubmit() {
    try {

    } catch (e) {
      console.log(e);
      
    }
  }

  return (
    <div>
      <form>
        <div class="form-group col-md-6">
          <label for="firstName">First Name</label>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            required
          ></input>
        </div>
        <div class="form-group col-md-6">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            required
          ></input>
        </div>

        <div class="form-group col-md-6">
          <label for="reservationDate">Reservation Date</label>
          <input
            type="date"
            name="reservation_date"
            placeholder="0000/00/00"
            required
          ></input>
        </div>
        <div class="form-group col-md-6">
          <label for="reservationTime">Reservation Time</label>
          <input
            type="time"
            name="reservation_time"
            placeholder="00:00"
            required
          ></input>
        </div>

        <div class="form-group col-md-6">
          <label for="mobileNumber">Mobile Number</label>
          <input
            type="tel"
            name="mobile_number"
            placeholder="(xxx) xxx-xxxx"
            required
          ></input>
        </div>
        <div class="form-group col-md-6">
          <label for="numberOfPeople">Number of People</label>
          <input type="number" min="1" name="people" placeholder="1" required></input>
        </div>11

        <div>
          <button type="submit" class="btn btn-primary" onClick = {handleSubmit}>
            Submit
          </button>
          <button type="button" class="btn btn-primary" onClick={() => history.goBack()}>
            Cancel
          </button>
        </div>
        
      </form>
    </div>
  );
}

export default ReservationForm;
