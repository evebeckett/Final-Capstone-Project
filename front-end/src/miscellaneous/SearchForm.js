import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";

function SearchForm({setReservationsByPhone}) {
  let history = useHistory();


  const [searchErrors, setSearchErrors] = useState(null);

  
  const [phone, setPhone] = useState("")
  
  

  async function handleFind(event) {
     
    event.preventDefault();
   
    const abortController = new AbortController();
    setSearchErrors(null);
   
    listReservations({mobile_number: phone})
    .then(setReservationsByPhone)
    .catch(setSearchErrors);
    
    
    
    return () => abortController.abort();
    
  }

  function handleChange(event) {
    event.preventDefault();
    setPhone(event.target.value.replace(/[^0-9]/g, '').trim());
  }

  

  return (
    <div>  
      <form onSubmit={handleFind}>
      <div className="form-group col-md-6">
          <label htmlFor="searchByPhone">Search by Phone: </label>
          <input
            type="text"
            name="mobile_number"
            placeholder="Enter a customer's phone number"
            onChange={handleChange}
           
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Find
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
      </form>
      <ErrorAlert error={searchErrors} />
    </div>
  );
}

export default SearchForm;
