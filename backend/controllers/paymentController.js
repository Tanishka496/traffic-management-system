const paymentModel = require("../models/paymentModel");

exports.createPayment = (req, res) => {
  const { challan_id, amount, payment_method } = req.body;

  if (!challan_id || !amount || !payment_method) {
    return res
      .status(400)
      .json({ message: "challan_id, amount and payment_method are required" });
  }

  paymentModel.addPayment(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res
      .status(201)
      .json({ message: "Payment recorded successfully", id: result.insertId });
  });
};

exports.listPayments = (_req, res) => {
  paymentModel.getPayments((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.json(result);
  });
};

exports.dashboardSummary = (_req, res) => {
  paymentModel.getDashboardSummary((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.json(result[0]);
  });
};
