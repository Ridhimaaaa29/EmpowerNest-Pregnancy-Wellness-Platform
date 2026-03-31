const express = require('express');
const router = express.Router();
const healthRiskController = require('../controllers/healthRiskController');
const { authenticateToken } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// Health risk assessment routes
router.post('/', healthRiskController.createAssessment);
router.get('/latest', healthRiskController.getLatestAssessment);
router.get('/', healthRiskController.getAllAssessments);
router.get('/:id', healthRiskController.getAssessmentById);
router.put('/:id', healthRiskController.updateAssessment);
router.delete('/:id', healthRiskController.deleteAssessment);

module.exports = router;
