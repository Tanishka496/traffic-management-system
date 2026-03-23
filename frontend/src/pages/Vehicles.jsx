import { useState } from "react";
import AddVehicle from "./vehicles/AddVehicle";
import VehicleList from "./vehicles/VehicleList";

function Vehicles() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <section className="module-card">
      <h2>Vehicle Management</h2>
      <AddVehicle onAdded={() => setRefreshKey((prev) => prev + 1)} />
      <VehicleList refreshKey={refreshKey} />
    </section>
  );
}

export default Vehicles;
