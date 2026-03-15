const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const challanRoutes = require('./routes/challanRoutes');

const app = express();

app.use(cors()); // This allows the frontend to talk to the backend
app.use(express.json()); // This allows the server to read the form data

// Use your Challan Module routes
app.use('/api/challan', challanRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});