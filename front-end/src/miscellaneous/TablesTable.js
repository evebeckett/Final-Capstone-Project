import React from "react";
import uniqid from "uniqid";

function ReservationsTable({ tables }) {
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
              <td key={uniqid()} data-table-id-status={table.table_id}>Include Availability</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ReservationsTable;