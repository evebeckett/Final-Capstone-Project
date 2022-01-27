import React, {useState} from "react";
import uniqid from "uniqid";

function TablesTable({ tables }) {

  const [reservationId, setReservationId] = useState(null)

  function availability (reservation_id) {
    setReservationId(Number(reservation_id));
    if (typeof reservationId === "number") {
      return <p>Occupied</p>
    } else {
      return <p>Free</p>
    }
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
              <td key={uniqid()} data-table-id-status={table.table_id}> {table.reservation_id ? "occupied" : "free"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TablesTable;