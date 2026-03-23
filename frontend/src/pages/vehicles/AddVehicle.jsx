import { useState } from "react";
import { addVehicle } from "../../services/vehicleService";

function AddVehicle({ onAdded }) {
  const [form, setForm] = useState({
    vehicle_number: "",
    owner_name: "",
    vehicle_type: "",
    driver_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addVehicle({
      ...form,
      driver_id: form.driver_id === "" ? null : Number(form.driver_id),
    });

    setForm({
      vehicle_number: "",
      owner_name: "",
      vehicle_type: "",
      driver_id: "",
    });

    if (onAdded) onAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="driver-form">
      <div className="field">
        <label htmlFor="vehicle_number">Vehicle Number</label>
        <input
          id="vehicle_number"
          name="vehicle_number"
          value={form.vehicle_number}
          onChange={handleChange}
          placeholder="MH12AB1234"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="owner_name">Owner Name</label>
        <input
          id="owner_name"
          name="owner_name"
          value={form.owner_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="vehicle_type">Vehicle Type</label>
        <input
          id="vehicle_type"
          name="vehicle_type"
          value={form.vehicle_type}
          onChange={handleChange}
          placeholder="Car / Bike"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="driver_id">Driver ID (Optional)</label>
        <input
          id="driver_id"
          name="driver_id"
          value={form.driver_id}
          onChange={handleChange}
          type="number"
          min="1"
        />
      </div>

      <button type="submit" className="submit-btn">Add Vehicle</button>
    </form>
  );
}

export default AddVehicle;
