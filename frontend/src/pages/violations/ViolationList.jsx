import { useEffect, useState } from "react";
import { getViolations, deleteViolation } from "../../services/violationService";

export default function ViolationList() {
  const [violations, setViolations] = useState([]);

  const fetchViolations = async () => {
    const res = await getViolations();
    setViolations(res.data);
  };

  const handleDelete = async (id) => {
    await deleteViolation(id);
    fetchViolations();
  };

  useEffect(() => {
    fetchViolations();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Violation List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Violation Type</th>
            <th>Fine Amount (₹)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {violations.length === 0 ? (
            <tr>
              <td colSpan="4">No violations found</td>
            </tr>
          ) : (
            violations.map((v) => (
              <tr key={v.violation_id}>
                <td>{v.violation_id}</td>
                <td>{v.violation_type}</td>
                <td>{v.fine_amount}</td>
                <td>
                  <button onClick={() => handleDelete(v.violation_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}