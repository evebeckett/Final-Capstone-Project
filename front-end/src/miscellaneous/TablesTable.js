import React from "react";

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
            <tr>
              <td>{table.table_name}</td>
              <td>{table.capacity}</td>
              <td data-table-id-status={table.table_id}>Include Availability</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ReservationsTable;