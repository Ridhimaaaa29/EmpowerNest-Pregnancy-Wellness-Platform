const CycleTracker = require('../models/CycleTracker');

// Create new cycle entry
const createEntry = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { lastPeriodDate, cycleLength, periodLength, regularCycle, symptoms, flow, notes } = req.body;

    if (!lastPeriodDate) {
      return res.status(400).json({ error: 'lastPeriodDate is required' });
    }

    const entry = await CycleTracker.create(userId, {
      lastPeriodDate,
      cycleLength,
      periodLength,
      regularCycle,
      symptoms,
      flow,
      notes
    });

    res.status(201).json({
      message: 'Cycle entry created successfully',
      entry
    });
  } catch (error) {
    console.error('Create cycle entry error:', error);
    res.status(500).json({ error: error.message || 'Failed to create cycle entry' });
  }
};

// Get all entries for logged-in user
const getAllEntries = async (req, res) => {
  try {
    const userId = req.user.userId;
    const entries = await CycleTracker.getAllByUserId(userId);

    res.status(200).json({
      entries: entries,
      count: entries.length
    });
  } catch (error) {
    console.error('Get all entries error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch entries' });
  }
};

// Get latest entry
const getLatestEntry = async (req, res) => {
  try {
    const userId = req.user.userId;
    const entry = await CycleTracker.getLatestByUserId(userId);

    if (!entry) {
      return res.status(404).json({ error: 'No cycle entries found' });
    }

    res.status(200).json({ entry });
  } catch (error) {
    console.error('Get latest entry error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch latest entry' });
  }
};

// Get entry by ID
const getEntryById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const entry = await CycleTracker.getById(id, userId);

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.status(200).json({ entry });
  } catch (error) {
    console.error('Get entry by ID error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch entry' });
  }
};

// Update entry
const updateEntry = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const updates = req.body;

    const updatedEntry = await CycleTracker.update(id, userId, updates);

    res.status(200).json({
      message: 'Cycle entry updated successfully',
      entry: updatedEntry
    });
  } catch (error) {
    console.error('Update entry error:', error);
    res.status(500).json({ error: error.message || 'Failed to update entry' });
  }
};

// Delete entry
const deleteEntry = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const deleted = await CycleTracker.delete(id, userId);

    if (!deleted) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.status(200).json({ message: 'Cycle entry deleted successfully' });
  } catch (error) {
    console.error('Delete entry error:', error);
    res.status(500).json({ error: error.message || 'Failed to delete entry' });
  }
};

// Get cycle predictions
const getPredictions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const predictions = await CycleTracker.predictNextCycle(userId);

    if (!predictions) {
      return res.status(404).json({ 
        error: 'No cycle data found. Please add your cycle information first.' 
      });
    }

    res.status(200).json({ predictions });
  } catch (error) {
    console.error('Get predictions error:', error);
    res.status(500).json({ error: error.message || 'Failed to get predictions' });
  }
};

// Get statistics
const getStatistics = async (req, res) => {
  try {
    const userId = req.user.userId;
    const statistics = await CycleTracker.getStatistics(userId);

    if (!statistics) {
      return res.status(404).json({ 
        error: 'No cycle data found. Please add your cycle information first.' 
      });
    }

    res.status(200).json({ statistics });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({ error: error.message || 'Failed to get statistics' });
  }
};

module.exports = {
  createEntry,
  getAllEntries,
  getLatestEntry,
  getEntryById,
  updateEntry,
  deleteEntry,
  getPredictions,
  getStatistics
};
