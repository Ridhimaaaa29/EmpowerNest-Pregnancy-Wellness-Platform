const express = require('express');
const router = express.Router();
const pregnancyController = require('../controllers/pregnancyController');
const { authenticateToken } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// Pregnancy entry management
router.post('/', pregnancyController.createEntry);
router.get('/', pregnancyController.getAllEntries);
router.get('/progress', pregnancyController.getProgress);
router.get('/metrics', pregnancyController.getHealthMetrics);
router.get('/latest', pregnancyController.getLatestEntry);
router.get('/milestone/:week', pregnancyController.getMilestone);
router.get('/:id', pregnancyController.getEntryById);
router.put('/:id', pregnancyController.updateEntry);
router.delete('/:id', pregnancyController.deleteEntry);

module.exports = router;
