import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createNewTable } from "../utils/api";
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function TablesForm () {
    
    const initialFormObject = {
        table_name: "",
        capacity:"",
        reservation_id: null,
    }
    const history = useHistory();
    
    const [newTable, setNewTable] = useState(initialFormObject);

    const [error, setError] = useState(null)
     
    function handleChange (event) {
        setNewTable({
            ...newTable,
        
            // Trimming any whitespace
            [event.target.name]: event.target.value.trim()
          });
    }

    function handleNumberChange(event) {
      setNewTable({
        ...newTable,
    
        // Trimming any whitespace
        [event.target.name]: parseInt(event.target.value.trim())
      });
    }

    function handleSubmit (event) {
        const abortController = new AbortController();
        event.preventDefault();
        setError(null);
        createNewTable(newTable)
        .then(() => history.push(`/dashboard`)).catch(setError)
    
    return () => abortController.abort();

    }

    return (
        <div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group col-md-6">
          <label htmlFor="tableName">Table Name</label>
          <input
            type="text"
            name="table_name"
            placeholder="Table Name"
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            onChange={handleNumberChange}
            required
          ></input>
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
      <ErrorAlert error={error} />
    </div>
    
  
    )
}

export default TablesForm;