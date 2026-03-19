
import React, { useEffect, useState } from "react";

const VehicleList = () => {

  const [vehicles, setVehicles] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  // Fetch vehicles from backend
  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://localhost:5000/vehicles");
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Search button click
  const handleSearch = () => {
    setSearch(searchInput);
  };

  // Filter vehicles
  const filteredVehicles = vehicles.filter((vehicle) => {
    return (
      vehicle.vehicle_number &&
      vehicle.vehicle_number
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  // 🎨 Styles
  const styles = {
    container: {
      width: "700px",
      margin: "40px auto",
      padding: "20px",
      borderRadius: "10px",
      backgroundColor: "#fff",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    },
    title: {
      textAlign: "center",
      marginBottom: "20px"
    },
    searchBox: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px"
    },
    input: {
      flex: 1,
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc"
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "#3498db",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse"
    },
    th: {
      backgroundColor: "#3498db",
      color: "white",
      padding: "10px"
    },
    td: {
      padding: "10px",
      border: "1px solid #ddd",
      textAlign: "center"
    }
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>Vehicle List</h2>

      <div style={styles.searchBox}>

        <input
          style={styles.input}
          type="text"
          placeholder="Enter Vehicle Number"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button style={styles.button} onClick={handleSearch}>
          Search
        </button>

      </div>

      <table style={styles.table}>

        <thead>
          <tr>
            <th style={styles.th}>Vehicle Number</th>
            <th style={styles.th}>Owner Name</th>
            <th style={styles.th}>Vehicle Type</th>
            <th style={styles.th}>Driver ID</th>
          </tr>
        </thead>

        <tbody>
          {filteredVehicles.map((vehicle) => (
            <tr key={vehicle.vehicle_id}>
              <td style={styles.td}>{vehicle.vehicle_number}</td>
              <td style={styles.td}>{vehicle.owner_name}</td>
              <td style={styles.td}>{vehicle.vehicle_type}</td>
              <td style={styles.td}>{vehicle.driver_id}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default VehicleList;

