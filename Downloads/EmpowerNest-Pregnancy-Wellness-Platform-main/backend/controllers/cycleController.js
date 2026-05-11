const CycleEntry = require('../models/CycleEntrySequelize');
const User = require('../models/UserSequelize');

// Create new cycle entry
const createEntry = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { lastPeriodDate, cycleLength, periodLength, regularCycle, symptoms, flow, notes } = req.body;

    if (!lastPeriodDate) {
      return res.status(400).json({ error: 'lastPeriodDate is required' });
    }

    const entry = await CycleEntry.create({
      userId,
      lastPeriodDate,
      cycleLength: cycleLength || 28,
      periodLength: periodLength || 5,
      regularCycle: regularCycle !== undefined ? regularCycle : true,
      symptoms: symptoms,
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
    const entries = await CycleEntry.findAll({ where: { userId } });

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
    const entry = await CycleEntry.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });

    if (!entry) {
      return res.status(404).json({ message: 'No cycle entries found' });
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
    
    const entry = await CycleEntry.findOne({
      where: { id, userId }
    });

    if (!entry) {
      return res.status(404).json({ error: 'Cycle entry not found' });
    }

    res.status(200).json({ entry });
  } catch (error) {
    console.error('Get entry error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch entry' });
  }
};

// Update entry
const updateEntry = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const { lastPeriodDate, cycleLength, periodLength, regularCycle, symptoms, flow, notes } = req.body;

    const entry = await CycleEntry.findOne({
      where: { id, userId }
    });

    if (!entry) {
      return res.status(404).json({ error: 'Cycle entry not found' });
    }

    await entry.update({
      lastPeriodDate: lastPeriodDate || entry.lastPeriodDate,
      cycleLength: cycleLength || entry.cycleLength,
      periodLength: periodLength || entry.periodLength,
      regularCycle: regularCycle !== undefined ? regularCycle : entry.regularCycle,
      symptoms: symptoms || entry.symptoms,
      flow: flow || entry.flow,
      notes: notes || entry.notes
    });

    res.status(200).json({
      message: 'Cycle entry updated successfully',
      entry
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

    const entry = await CycleEntry.findOne({
      where: { id, userId }
    });

    if (!entry) {
      return res.status(404).json({ error: 'Cycle entry not found' });
    }

    await entry.destroy();

    res.status(200).json({ message: 'Cycle entry deleted successfully' });
  } catch (error) {
    console.error('Delete entry error:', error);
    res.status(500).json({ error: error.message || 'Failed to delete entry' });
  }
};

// Get predictions (simple calculation)
const getPredictions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const latestEntry = await CycleEntry.findOne({
      where: { userId },
      order: [['lastPeriodDate', 'DESC']]
    });

    if (!latestEntry) {
      return res.status(404).json({ message: 'No cycle data available for predictions' });
    }

    const cycleLength = latestEntry.cycleLength || 28;
    const periodLength = latestEntry.periodLength || 5;
    const lastPeriodDate = new Date(latestEntry.lastPeriodDate);
    
    const nextPeriodDate = new Date(lastPeriodDate.getTime() + cycleLength * 24 * 60 * 60 * 1000);
    const ovulationDate = new Date(lastPeriodDate.getTime() + (cycleLength / 2) * 24 * 60 * 60 * 1000);

    res.status(200).json({
      lastPeriodDate,
      nextPeriodDate,
      ovulationDate,
      cycleLength
    });
  } catch (error) {
    console.error('Get predictions error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch predictions' });
  }
};

// Get statistics
const getStatistics = async (req, res) => {
  try {
    const userId = req.user.userId;
    const entries = await CycleEntry.findAll({ where: { userId } });

    if (entries.length === 0) {
      return res.status(200).json({ message: 'No cycle data available', stats: {} });
    }

    const cycleLengths = entries
      .filter(e => e.cycleLength)
      .map(e => e.cycleLength);
    
    const averageCycleLength = cycleLengths.length > 0
      ? cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length
      : 28;

    res.status(200).json({
      totalEntries: entries.length,
      averageCycleLength: Math.round(averageCycleLength),
      lastEntry: entries[entries.length - 1],
      entries
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch statistics' });
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
