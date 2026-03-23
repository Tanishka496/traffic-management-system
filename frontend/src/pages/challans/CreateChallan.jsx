import { useState } from "react";
import { addChallan } from "../../services/challanService";

function CreateChallan({ onCreated }) {
  const [form, setForm] = useState({
    vehicle_id: "",
    violation_id: "",
    officer_id: "",
    status: "Pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addChallan({
      ...form,
      vehicle_id: Number(form.vehicle_id),
      violation_id: Number(form.violation_id),
      officer_id: Number(form.officer_id),
    });

    setForm({ vehicle_id: "", violation_id: "", officer_id: "", status: "Pending" });
    if (onCreated) onCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="driver-form">
      <div className="field">
        <label htmlFor="vehicle_id">Vehicle ID</label>
        <input id="vehicle_id" value={form.vehicle_id} onChange={(e) => setForm({ ...form, vehicle_id: e.target.value })} required />
      </div>
      <div className="field">
        <label htmlFor="violation_id">Violation ID</label>
        <input id="violation_id" value={form.violation_id} onChange={(e) => setForm({ ...form, violation_id: e.target.value })} required />
      </div>
      <div className="field">
        <label htmlFor="officer_id">Officer ID</label>
        <input id="officer_id" value={form.officer_id} onChange={(e) => setForm({ ...form, officer_id: e.target.value })} required />
      </div>
      <div className="field">
        <label htmlFor="status">Status</label>
        <select id="status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
      </div>
      <button className="submit-btn" type="submit">Create Challan</button>
    </form>
  );
}

export default CreateChallan;
