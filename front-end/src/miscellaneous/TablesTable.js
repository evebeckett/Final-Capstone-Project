import React, {useState} from "react";
import uniqid from "uniqid";
import { finishTable, updateStatus } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert"

function TablesTable({ tables }) {
  const history = useHistory();
  const [error, setError] = useState(null);
  async function finishHandler(table, tableId) {
    const abortController = new AbortController();
  
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
    
      finishTable(table, tableId)
      .then(updateStatus({status: "finished"}, table.reservation_id))
      .then(()=> history.go(0))
      .catch(setError)
 
    }
  
    return () => abortController.abort();
  }

  return (
    <div>
    <table className="tables">
      <thead>
        <tr>
          <th className="tableCol">Table Name</th>
          <th className="tableCol">Capacity</th>
          <th className="tableCol">Availability</th>
        </tr>
      </thead>
      <tbody>
        {tables?.map((table) => {
          return (
            <tr key={uniqid()}>
              <td className="tableCol">{table.table_name}</td>
              <td className="tableCol">{table.capacity}</td>
              <td className="tableCol" data-table-id-status={table.table_id}>
                {table.reservation_id ? "occupied" : "free"}
              </td>
              <td>
                {table.reservation_id && (
                  <button
                    className="btn btn-primary mb-2"
                    data-table-id-finish={table.table_id}
                    type="button"
                    onClick={() => finishHandler(table, table.table_id)}
                  >
                    Finish
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <ErrorAlert error={error} />
    </div>
  );
}

export default TablesTable;
