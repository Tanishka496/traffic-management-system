const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.get("/summary", paymentController.dashboardSummary);

module.exports = router;
