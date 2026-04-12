const challanModel = require("../models/challanModel");

exports.createChallan = (req, res) => {
  const { vehicle_id, violation_id, officer_id } = req.body;

  if (!vehicle_id || !violation_id || !officer_id) {
    return res
      .status(400)
      .json({ message: "vehicle_id, violation_id and officer_id are required" });
  }

  challanModel.validateChallanReferences(req.body, (validationErr, validationResult) => {
    if (validationErr) {
      return res.status(500).json({ error: validationErr.message });
    }

    if (!validationResult.valid) {
      return res.status(400).json({ message: validationResult.message });
    }

    challanModel.addChallan(req.body, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      return res
        .status(201)
        .json({ message: "Challan created successfully", id: result.insertId });
    });
  });
};

exports.listChallans = (_req, res) => {
  challanModel.getChallans((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.json(result);
  });
};
