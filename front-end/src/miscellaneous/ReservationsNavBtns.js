import React from "react";
import {useHistory} from "react-router-dom";
import {previous, next, today} from "../utils/date-time";

function ReservationsNavBtns({ date }) {

let history = useHistory();

return (
<div>
<button className="btn btn-primary" type="button" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
<button className="btn btn-primary" type="button" onClick={() => history.push(`/dashboard?date=${today(date)}`)}>Today</button>
<button className="btn btn-primary" type="button"onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
</div>
)
}

export default ReservationsNavBtns;