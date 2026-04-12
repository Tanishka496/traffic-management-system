const express = require("express");
const router = express.Router();
const officerController = require("../controllers/officerController");

router.get("/", officerController.getOfficers);

module.exports = router;
