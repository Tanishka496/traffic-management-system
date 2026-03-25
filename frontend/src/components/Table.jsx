function Table({ columns, rows, emptyMessage = "No records found." }) {
  if (!rows.length) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="drivers-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={
                row.id ||
                row.challan_id ||
                row.payment_id ||
                row.vehicle_id ||
                row.violation_id ||
                index
              }
            >
              {columns.map((column) => (
                <td key={column.key}>{row[column.key] ?? "-"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
