import { useState } from "react";
import AddDriver from "./drivers/AddDriver";
import DriverList from "./drivers/DriverList";

function Drivers() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDriverAdded = async () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <section className="module-card drivers-module">
      <div className="page-header">
        <h1>Driver Management</h1>
        <p className="drivers-subtitle">Register and manage driver records</p>
      </div>

      <div className="module-card form-card">
        <AddDriver onDriverAdded={handleDriverAdded} />
      </div>

      <div className="module-card records-card">
        <div className="list-header">
          <h3>Active Driver Records</h3>
          <span className="pill-count">Auto refresh enabled</span>
        </div>

        <DriverList refreshKey={refreshKey} />
      </div>
    </section>
  );
}

export default Drivers;