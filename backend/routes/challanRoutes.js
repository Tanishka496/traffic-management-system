const express = require("express");
const router = express.Router();
const challanController = require("../controllers/challanController");

router.get("/", challanController.listChallans);
router.post("/", challanController.createChallan);

// Keep compatibility with older frontend calls that still use /add.
router.post("/add", challanController.createChallan);

module.exports = router;