const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Your working DB connection

// Route to create a new challan
router.post('/add', (req, res) => {
    const { vehicle_id, violation_id, officer_id, status } = req.body;
    const challan_date = new Date(); // Automatically sets today's date

    const query = "INSERT INTO challan (vehicle_id, violation_id, officer_id, challan_date, status) VALUES (?, ?, ?, ?, ?)";
    
    db.query(query, [vehicle_id, violation_id, officer_id, challan_date, status], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Challan created successfully!", id: result.insertId });
    });
});

module.exports = router;