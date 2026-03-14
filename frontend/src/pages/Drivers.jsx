import { useEffect, useState } from "react";
import { getDrivers } from "../services/driverServices";
import DriverForm from "../components/DriverForm";

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDrivers = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await getDrivers();
      setDrivers(res.data);
    } catch {
      setError("Unable to load driver records. Check whether the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadDrivers = async () => {
      await fetchDrivers();
    };

    loadDrivers();
  }, []);

  const handleDriverAdded = async () => {
    await fetchDrivers();
  };

  return (
    <section className="drivers-panel">
      <div className="drivers-header">
        <div>
          <p className="section-tag">Registry control</p>
          <h2>Driver Management</h2>
          <p className="drivers-subtitle">
            Keep driver details clean and up to date.
          </p>
        </div>
        <div className="pill-count">{drivers.length} registered drivers</div>
      </div>

      <div className="drivers-layout">
        <DriverForm onDriverAdded={handleDriverAdded} />

        <div className="list-panel">
          <div className="list-header">
            <h3>Active Driver Records</h3>
            {isLoading ? <span className="pill-count">Refreshing...</span> : null}
          </div>

          {error ? <p className="panel-error">{error}</p> : null}

          {!isLoading && drivers.length === 0 ? (
            <div className="empty-state">
              No records yet. Add your first driver.
            </div>
          ) : null}

          <div className="driver-grid">
            {drivers.map((driver) => (
              <article className="driver-card" key={driver.id ?? driver.driver_id}>
                <div className="driver-card-header">
                  <h4>{driver.name}</h4>
                  <span className="license-badge">{driver.license_number}</span>
                </div>
                <p className="driver-meta">Phone: {driver.phone}</p>
                <p className="driver-meta">Driver ID: #{driver.id ?? driver.driver_id}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Drivers;