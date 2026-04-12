import { useEffect, useState } from "react";
import { addChallan } from "../../services/challanService";
import { getVehicles } from "../../services/vehicleService";
import { getViolations } from "../../services/violationService";
import { getOfficers } from "../../services/officerService";

function CreateChallan({ onCreated }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [vehicles, setVehicles] = useState([]);
  const [violations, setViolations] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [form, setForm] = useState({
    vehicle_id: "",
    violation_id: "",
    officer_id: "",
    status: "Pending",
  });
  const hasAllOptions = vehicles.length > 0 && violations.length > 0 && officers.length > 0;

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [vehiclesRes, violationsRes, officersRes] = await Promise.all([
          getVehicles(),
          getViolations(),
          getOfficers(),
        ]);
        setVehicles(vehiclesRes.data);
        setViolations(violationsRes.data);
        setOfficers(officersRes.data);
      } catch (_error) {
        setFeedback({
          type: "error",
          message: "Could not load vehicle/violation/officer options.",
        });
      }
    };

    loadOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });

    try {
      await addChallan({
        ...form,
        vehicle_id: Number(form.vehicle_id),
        violation_id: Number(form.violation_id),
        officer_id: Number(form.officer_id),
      });

      setForm({
        vehicle_id: "",
        violation_id: "",
        officer_id: "",
        status: "Pending",
      });
      setFeedback({ type: "success", message: "Challan created successfully." });
      if (onCreated) onCreated();
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Could not create challan. Check the IDs and try again.";
      setFeedback({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="driver-form">
      <div className="field">
        <label htmlFor="vehicle_id">Vehicle ID</label>
        <select
          id="vehicle_id"
          value={form.vehicle_id}
          onChange={(e) => setForm({ ...form, vehicle_id: e.target.value })}
          required
        >
          <option value="">Select vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
              {vehicle.vehicle_id} - {vehicle.vehicle_number}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="violation_id">Violation ID</label>
        <select
          id="violation_id"
          value={form.violation_id}
          onChange={(e) => setForm({ ...form, violation_id: e.target.value })}
          required
        >
          <option value="">Select violation</option>
          {violations.map((violation) => (
            <option key={violation.violation_id} value={violation.violation_id}>
              {violation.violation_id} - {violation.violation_type}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="officer_id">Officer ID</label>
        <select
          id="officer_id"
          value={form.officer_id}
          onChange={(e) => setForm({ ...form, officer_id: e.target.value })}
          required
        >
          <option value="">Select officer</option>
          {officers.map((officer) => (
            <option key={officer.officer_id} value={officer.officer_id}>
              {officer.officer_id} - {officer.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
      </div>
      <button className="submit-btn" type="submit" disabled={isSubmitting || !hasAllOptions}>
        {isSubmitting ? "Creating..." : "Create Challan"}
      </button>
      {!hasAllOptions ? (
        <p className="error-text">
          Missing reference data. Ensure at least one vehicle, violation, and officer exists.
        </p>
      ) : null}
      {feedback.message ? (
        <p className={feedback.type === "error" ? "error-text" : "success-text"}>
          {feedback.message}
        </p>
      ) : null}
    </form>
  );
}

export default CreateChallan;
