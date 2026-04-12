const officerModel = require("../models/officerModel");

exports.getOfficers = (_req, res) => {
  officerModel.getOfficers((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching officers", error: err.message });
    }

    return res.json(result);
  });
};
