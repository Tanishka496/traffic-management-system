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
    <div className="module-card">
      <h2>Add Violation</h2>
      <form onSubmit={handleSubmit} className="driver-form">
        <div className="field">
          <label>Violation Type:</label>
          <input
            type="text"
            value={violation_type}
            onChange={(e) => setViolationType(e.target.value)}
            placeholder="e.g. No Helmet"
            required
          />
        </div>
        <div className="field">
          <label>Fine Amount (Rs):</label>
          <input
            type="number"
            value={fine_amount}
            onChange={(e) => setFineAmount(e.target.value)}
            placeholder="e.g. 300"
            required
          />
        </div>
        <button className="submit-btn" type="submit">
          Add Violation
        </button>
      </form>
      {message && <p className="feedback success">{message}</p>}
    </div>
  );
}
