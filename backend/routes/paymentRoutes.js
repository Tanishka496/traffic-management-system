const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/", paymentController.createPayment);
router.get("/", paymentController.listPayments);
router.get("/report", paymentController.paymentReport);

module.exports = router;
