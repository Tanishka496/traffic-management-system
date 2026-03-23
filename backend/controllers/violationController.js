const ViolationModel = require('../models/violationModel');

exports.addViolation = (req, res) => {
  const { violation_type, fine_amount } = req.body;
  ViolationModel.addViolation(violation_type, fine_amount, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Violation added successfully" });
  });
};

exports.getAllViolations = (req, res) => {
  ViolationModel.getAllViolations((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

exports.updateViolation = (req, res) => {
  const { id } = req.params;
  const { violation_type, fine_amount } = req.body;
  ViolationModel.updateViolation(id, violation_type, fine_amount, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Violation updated successfully" });
  });
};

exports.deleteViolation = (req, res) => {
  const { id } = req.params;
  ViolationModel.deleteViolation(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Violation deleted successfully" });
  });
};