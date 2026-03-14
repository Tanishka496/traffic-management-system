import { useState } from "react";
import { addDriver } from "../services/driverServices";

const initialDriver = {
  name: "",
  license_number: "",
  phone: ""
};

function DriverForm({ onDriverAdded }) {
  const [driver, setDriver] = useState(initialDriver);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setDriver({ ...driver, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await addDriver(driver);
      setDriver(initialDriver);
      setStatus({ type: "success", message: "Driver record added successfully." });

      if (onDriverAdded) {
        await onDriverAdded();
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Could not add the driver.";

      setStatus({
        type: "error",
        message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-panel">
      <div className="form-header">
        <h3>Driver Registration Form</h3>
      </div>

      <form className="driver-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Driver name</label>
          <input
            id="name"
            name="name"
            placeholder="Enter full name"
            value={driver.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="license_number">License number</label>
          <input
            id="license_number"
            name="license_number"
            placeholder="Enter license number"
            value={driver.license_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            name="phone"
            placeholder="Enter contact number"
            value={driver.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button className="submit-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving record..." : "Add Driver"}
        </button>

        {status.message ? (
          <p className={`feedback ${status.type}`}>{status.message}</p>
        ) : null}
      </form>
    </div>
  );
}

export default DriverForm;