import { useEffect, useState } from "react";
import { getVehicles } from "../../services/vehicleService";

function VehicleList({ refreshKey }) {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const response = await getVehicles();
        setVehicles(response.data);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load vehicles");
      }
    };

    loadVehicles();
  }, [refreshKey]);

  if (error) {
    return <p className="panel-error">{error}</p>;
  }

  if (!vehicles.length) {
    return <p className="empty-state">No vehicles added yet.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="drivers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vehicle Number</th>
            <th>Owner Name</th>
            <th>Type</th>
            <th>Driver ID</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.vehicle_id}>
              <td>{vehicle.vehicle_id}</td>
              <td>{vehicle.vehicle_number}</td>
              <td>{vehicle.owner_name}</td>
              <td>{vehicle.vehicle_type}</td>
              <td>{vehicle.driver_id ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleList;
