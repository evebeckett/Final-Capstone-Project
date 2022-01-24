import React, {useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import {updateTablesList} from "../utils/api"

function SeatingForm({ tableList }) {

    let history = useHistory();
    const [reservationId, setReservationId] =useState(null);
    const [tableId, setTableId] = useState();
  
    const [errors, setErrors] = useState(null);

    
    const {reservation_id} = useParams()
  

    async function handleSubmit(event){
        event.preventDefault();
        const abortController = new AbortController();
      
        try{
            await updateTablesList({ "reservation_id": Number(reservationId)}, Number(tableId))
            history.push("/dashboard")
        } catch(error){
            console.log(error)
            setErrors(error.message);
            return;
        }
        return () => abortController.abort();
    }

    function handleChange (event) {
        
        setTableId(event.target.value)
        setReservationId(reservation_id)
        
    }

  return (
      <div>
          <form onSubmit={handleSubmit}>
              <select
              name="table_id" 
              onChange={handleChange}>
                 { tableList.map((table, index) => {
                     return (
                        <option value={table.table_id} key={index}>{table.table_name} - {table.capacity}</option>
                     )
                  }) }
              </select>
              <button type="submit" className="btn-btn-primary">Submit</button>
              <button type="button" className="btn btn-primary" onClick={() => history.goBack()}>Cancel</button>
          </form>
      </div>
  )
}

export default SeatingForm;
