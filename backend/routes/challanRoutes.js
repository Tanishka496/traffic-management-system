const express = require('express');
const router = express.Router();
const challanController = require('../controllers/challanController');

router.post('/', challanController.createChallan);
router.post('/add', challanController.createChallan);
router.get('/', challanController.listChallans);

module.exports = router;