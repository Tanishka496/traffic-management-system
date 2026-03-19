const express = require("express");
const cors = require("cors");

const vehicleRoutes = require("./routes/VehicleRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", vehicleRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});