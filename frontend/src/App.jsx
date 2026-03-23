import ChallanForm from './ChallanForm';
import "./App.css";
import Drivers from "./pages/Drivers";
import AddViolation from "./pages/violations/AddViolation";
import ViolationList from "./pages/violations/ViolationList";
import { useState } from "react";
import AddVehicle from "./pages/vehicles/AddVehicle";
import VehicleList from "./pages/vehicles/VehicleList";

function App() {
  const [vehicleRefreshKey, setVehicleRefreshKey] = useState(0);

  return (
    <main className="app-shell">
      <section className="module-card">
        <h2>Challan Module</h2>
        <ChallanForm />
      </section>

      <section>
        <Drivers />
      </section>

      <section className="module-card">
        <h2>Violation Module</h2>
        <AddViolation />
        <ViolationList />
      </section>

      <section className="module-card">
        <h2>Vehicle Module</h2>
        <AddVehicle onAdded={() => setVehicleRefreshKey((prev) => prev + 1)} />
        <VehicleList refreshKey={vehicleRefreshKey} />
      </section>
    </main>
  );
}

export default App;
