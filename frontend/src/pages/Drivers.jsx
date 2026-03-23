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
    <section className="drivers-module">
      <div className="page-header">
        <h1>Driver Management</h1>
        <p className="drivers-subtitle">Register and manage driver records</p>
      </div>

      <div className="module-card form-card">
        <DriverForm onDriverAdded={handleDriverAdded} />
      </div>

      <div className="module-card records-card">
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

          {!isLoading && drivers.length > 0 ? (
            <div className="table-wrapper">
              <table className="drivers-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>License Number</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map((driver) => (
                    <tr key={driver.id ?? driver.driver_id}>
                      <td>{driver.id ?? driver.driver_id}</td>
                      <td>{driver.name}</td>
                      <td>{driver.license_number}</td>
                      <td>{driver.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
      </div>
    </section>
  );
}

export default Drivers;