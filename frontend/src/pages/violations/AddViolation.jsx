import { useState } from "react";
import { addViolation } from "../../services/violationService";

export default function AddViolation() {
  const [violation_type, setViolationType] = useState("");
  const [fine_amount, setFineAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addViolation({ violation_type, fine_amount });
      setMessage("Violation added successfully!");
      setViolationType("");
      setFineAmount("");
    } catch (err) {
      setMessage("Error adding violation.");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Add Violation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Violation Type:</label><br />
          <input
            type="text"
            value={violation_type}
            onChange={(e) => setViolationType(e.target.value)}
            placeholder="e.g. No Helmet"
            required
          />
        </div>
        <br />
        <div>
          <label>Fine Amount (₹):</label><br />
          <input
            type="number"
            value={fine_amount}
            onChange={(e) => setFineAmount(e.target.value)}
            placeholder="e.g. 300"
            required
          />
        </div>
        <br />
        <button type="submit">Add Violation</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}