
import React, { useState } from "react";

const AddVehicle = () => {

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [driverId, setDriverId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vehicleData = {
      vehicle_number: vehicleNumber,
      owner_name: ownerName,
      vehicle_type: vehicleType,
      driver_id: driverId
    };

    try {
      const response = await fetch("http://localhost:5000/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(vehicleData)
      });

      if (response.ok) {
        alert("Vehicle Added Successfully!");

        setVehicleNumber("");
        setOwnerName("");
        setVehicleType("");
        setDriverId("");
      } else {
        alert("Error adding vehicle");
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 🎨 Styles
  const styles = {
    container: {
      width: "400px",
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
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #ccc"
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#3498db",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>Add Vehicle</h2>

      <form onSubmit={handleSubmit}>

        <input
          style={styles.input}
          type="text"
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="text"
          placeholder="Owner Name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="text"
          placeholder="Vehicle Type (Car/Bike)"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Driver ID"
          value={driverId}
          onChange={(e) => setDriverId(e.target.value)}
          required
        />

        <button style={styles.button} type="submit">
          Add Vehicle
        </button>

      </form>
    </div>
  );
};

export default AddVehicle;

