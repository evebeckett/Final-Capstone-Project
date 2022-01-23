import React, { useState, useEffect } from "react";
import SeatingForm from "../miscellaneous/SeatingForm";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables } from "../utils/api";


function Seating() {
    
    const [ tableList, setTableList ] = useState([])
    const [ tableListError, setTableListError] = useState(null)
    useEffect(loadSeating);
    

    function loadSeating() {

        const abortController = new AbortController();
    
        listTables(abortController.signal).then(setTableList).catch(setTableListError);
        return () => abortController.abort();
      }

    return (
        <div>
            <SeatingForm tableList={tableList}/>
            <ErrorAlert error={tableListError} />
        </div>
    );
  };
  
  export default Seating;