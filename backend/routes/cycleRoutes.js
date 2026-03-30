const express = require('express');
const router = express.Router();
const cycleController = require('../controllers/cycleController');
const { authenticateToken } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// Cycle entry management
router.post('/', cycleController.createEntry);
router.get('/', cycleController.getAllEntries);
router.get('/latest', cycleController.getLatestEntry);
router.get('/predictions', cycleController.getPredictions);
router.get('/statistics', cycleController.getStatistics);
router.get('/:id', cycleController.getEntryById);
router.put('/:id', cycleController.updateEntry);
router.delete('/:id', cycleController.deleteEntry);

module.exports = router;
