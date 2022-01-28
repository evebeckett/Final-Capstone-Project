import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateTablesList } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import uniqid from "uniqid";
import { updateToSeated } from "../utils/api";

function SeatingForm({ tableList }) {
  let history = useHistory();

  const [tableId, setTableId] = useState(0);

  const [errors, setErrors] = useState(null);

  const { reservation_id } = useParams();

  function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    setErrors(null);
    updateTablesList({ reservation_id: reservation_id }, tableId)
      .then(() => updateToSeated({ status: "seated" }, tableId))
      .then(() => history.push("/dashboard"))
      .catch(setErrors);

    return () => abortController.abort();
  }

  function handleChange(event) {
    event.preventDefault();

    setTableId(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select value={tableId} name="table_id" onChange={handleChange}>
          <option value={0}>Please Select</option>
          {tableList.map((table) => {
            return (
              <option value={table.table_id} key={uniqid()}>
                {table.table_name} - {table.capacity}
              </option>
            );
          })}
        </select>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
      </form>
      <ErrorAlert error={errors} />
    </div>
  );
}

export default SeatingForm;
