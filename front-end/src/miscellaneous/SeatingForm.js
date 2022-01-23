import React from "react";
import {useHistory} from "react-router-dom";

function SeatingForm({ tableList }) {

    let history = useHistory();
    
  function handleSubmit() {
    //delete the reservation from list
    //change table # to occupied on Table List
    //navigate to dashboard
  };

  return (
      <div>
          <form onSubmit={handleSubmit}>
              <select
              name="table_id">
                 { tableList.map((table) => {
                     return (
                        <option value={table.table_id}>{table.table_name} - {table.capacity}</option>
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
