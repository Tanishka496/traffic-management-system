const challanModel = require("../models/challanModel");

exports.createChallan = (req, res) => {
  challanModel.addChallan(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res
      .status(201)
      .json({ message: "Challan created successfully", id: result.insertId });
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
