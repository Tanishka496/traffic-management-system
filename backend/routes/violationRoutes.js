const express = require('express');
const router = express.Router();
const violationController = require('../controllers/violationController');

router.get('/', violationController.getAllViolations);
router.post('/', violationController.addViolation);
router.put('/:id', violationController.updateViolation);
router.delete('/:id', violationController.deleteViolation);

module.exports = router;