const express = require("express");
const cors = require("cors");
const app = express();

require("./config/db");
const challanRoutes = require("./routes/challanRoutes");
const driverRoutes = require("./routes/driverRoutes");
const violationRoutes = require("./routes/violationRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use(cors());

app.use(express.json());

app.use("/api/challan", challanRoutes);
app.use("/api/challans", challanRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/violations", violationRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Stop the other process or run with a different PORT.`);
    process.exit(1);
  }

  console.error("Server failed to start:", err.message);
  process.exit(1);
});