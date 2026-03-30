const PregnancyTracker = require('../models/PregnancyTracker');

// Create new pregnancy entry
const createEntry = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { dueDate, currentTrimester, weekNumber, dayNumber, weight, bloodPressure, notes } = req.body;

    if (!dueDate) {
      return res.status(400).json({ error: 'dueDate is required' });
    }

    // Calculate trimester and week from due date if not provided
    let calcTrimester = currentTrimester;
    let calcWeek = weekNumber;
    let calcDay = dayNumber;

    if (!calcTrimester || !calcWeek) {
      const progress = await PregnancyTracker.calculateProgressFromDueDate(dueDate);
      calcTrimester = progress.currentTrimester;
      calcWeek = progress.weekNumber;
      calcDay = progress.dayNumber;
    }

    const entry = await PregnancyTracker.create(userId, {
      dueDate,
      currentTrimester: calcTrimester,
      weekNumber: calcWeek,
      dayNumber: calcDay,
      weight,
      bloodPressure,
      notes
    });

    res.status(201).json({
      message: 'Pregnancy entry created successfully',
      entry
    });
  } catch (error) {
    console.error('Create pregnancy entry error:', error);
    res.status(500).json({ error: error.message || 'Failed to create pregnancy entry' });
  }
};

// Get all entries
const getAllEntries = async (req, res) => {
  try {
    const userId = req.user.userId;
    const entries = await PregnancyTracker.getAllByUserId(userId);

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
    const entry = await PregnancyTracker.getLatestByUserId(userId);

    if (!entry) {
      return res.status(404).json({ error: 'No pregnancy entries found' });
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

    const entry = await PregnancyTracker.getById(id, userId);

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

    const updatedEntry = await PregnancyTracker.update(id, userId, updates);

    res.status(200).json({
      message: 'Pregnancy entry updated successfully',
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

    const deleted = await PregnancyTracker.delete(id, userId);

    if (!deleted) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.status(200).json({ message: 'Pregnancy entry deleted successfully' });
  } catch (error) {
    console.error('Delete entry error:', error);
    res.status(500).json({ error: error.message || 'Failed to delete entry' });
  }
};

// Get pregnancy progress
const getProgress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const latest = await PregnancyTracker.getLatestByUserId(userId);

    if (!latest) {
      return res.status(404).json({ 
        error: 'No pregnancy data found. Please add your pregnancy information first.' 
      });
    }

    const progress = await PregnancyTracker.calculateProgressFromDueDate(latest.dueDate);
    const milestone = await PregnancyTracker.getMilestones(progress.weekNumber);

    res.status(200).json({
      progress,
      currentMilestone: milestone
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: error.message || 'Failed to get progress' });
  }
};

// Get health metrics
const getHealthMetrics = async (req, res) => {
  try {
    const userId = req.user.userId;
    const metrics = await PregnancyTracker.getHealthMetrics(userId);

    if (!metrics) {
      return res.status(404).json({ 
        error: 'No pregnancy data found.' 
      });
    }

    res.status(200).json({ metrics });
  } catch (error) {
    console.error('Get health metrics error:', error);
    res.status(500).json({ error: error.message || 'Failed to get health metrics' });
  }
};

// Get milestone for a specific week
const getMilestone = async (req, res) => {
  try {
    const { week } = req.params;
    const weekNumber = parseInt(week, 10);

    if (isNaN(weekNumber) || weekNumber < 1 || weekNumber > 42) {
      return res.status(400).json({ error: 'Week must be between 1 and 42' });
    }

    const milestone = await PregnancyTracker.getMilestones(weekNumber);

    res.status(200).json({
      week: weekNumber,
      milestone
    });
  } catch (error) {
    console.error('Get milestone error:', error);
    res.status(500).json({ error: error.message || 'Failed to get milestone' });
  }
};

module.exports = {
  createEntry,
  getAllEntries,
  getLatestEntry,
  getEntryById,
  updateEntry,
  deleteEntry,
  getProgress,
  getHealthMetrics,
  getMilestone
};
