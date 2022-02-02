import React, { useState } from "react";
import ReservationForm from "../miscellaneous/ReservationForm";
import {useParams} from "react-router-dom";


function Edit() {


  const {reservation_id} = useParams()
  const [initialFormData, setInitialFormData] = useState({});


    
 

  return (
    <main>
      <h1>Edit Reservation</h1>
      <div>
          <ReservationForm initialFormData={initialFormData} />
      </div>
    </main>
  );
}

export default Edit;
