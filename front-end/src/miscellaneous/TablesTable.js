import React from "react";
import uniqid from "uniqid";
import { finishTable, updateToFinished } from "../utils/api";
import { useHistory } from "react-router-dom";

function TablesTable({ tables }) {
  const history = useHistory();

  async function finishHandler(table, tableId) {
    const abortController = new AbortController();
    try {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      await finishTable(table, tableId);
      await updateToFinished({status: "finished"}, table.reservation_id)
      history.go(0);
    }
  } catch(error) {
    console.error(error)
    
  }
    return () => abortController.abort();
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Table Name</th>
          <th>Capacity</th>
          <th>Availability</th>
        </tr>
      </thead>
      <tbody>
        {tables.map((table) => {
          return (
            <tr key={uniqid()}>
              <td key={uniqid()}>{table.table_name}</td>
              <td key={uniqid()}>{table.capacity}</td>
              <td key={uniqid()} data-table-id-status={`${table.table_id}`}>
                {table.reservation_id ? "occupied" : "free"}
              </td>
              <td key={uniqid()}>
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
  );
}

export default TablesTable;
