const PregnancyEntry = require('../models/PregnancyEntrySequelize');
const User = require('../models/UserSequelize');

// Helper function to calculate pregnancy progress from due date
function calculateProgressFromDueDate(dueDate) {
  const due = new Date(dueDate);
  const today = new Date();
  const timeDiff = due.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const weekNumber = Math.max(1, Math.min(40, 40 - Math.floor(daysLeft / 7)));
  const dayNumber = ((daysLeft % 7) + 7) % 7;
  const currentTrimester = weekNumber <= 13 ? 1 : weekNumber <= 26 ? 2 : 3;

  return { weekNumber, dayNumber, currentTrimester, daysLeft };
}

// Helper to get milestones for a week
function getMilestones(weekNumber) {
  const milestones = {
    1: "Pregnancy confirmed. Embryo is the size of a grain of rice.",
    4: "Heart begins to beat. Embryo is now about 1/4 inch long.",
    8: "All major organs have started forming. Baby is about 1 inch long.",
    12: "First trimester ends. Baby's features are forming.",
    16: "Baby can hear. Weighs about 3.5 ounces.",
    20: "Half way there! Baby should be moving noticeably.",
    24: "Third trimester begins. Baby's eyes are forming.",
    28: "Baby weighs nearly 2 pounds.",
    32: "Most organs are mature. Baby weighs about 4 pounds.",
    36: "Baby is getting into position for birth.",
    40: "Full term. Baby is ready to be born!"
  };

  return milestones[weekNumber] || `Week ${weekNumber} of pregnancy`;
}

// Create new pregnancy entry
const createEntry = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { dueDate, currentTrimester, weekNumber, dayNumber, weight, bloodPressure, notes } = req.body;

    if (!dueDate) {
      return res.status(400).json({ error: 'dueDate is required' });
    }

    let calcTrimester = currentTrimester;
    let calcWeek = weekNumber;
    let calcDay = dayNumber;

    if (!calcTrimester || !calcWeek) {
      const progress = calculateProgressFromDueDate(dueDate);
      calcTrimester = progress.currentTrimester;
      calcWeek = progress.weekNumber;
      calcDay = progress.dayNumber;
    }

    const entry = await PregnancyEntry.create({
      userId,
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
    const entries = await PregnancyEntry.findAll({ where: { userId } });

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
    const entry = await PregnancyEntry.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });

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

    const entry = await PregnancyEntry.findOne({
      where: { id, userId }
    });

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
    const { dueDate, currentTrimester, weekNumber, dayNumber, weight, bloodPressure, notes } = req.body;

    const entry = await PregnancyEntry.findOne({
      where: { id, userId }
    });

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    await entry.update({
      dueDate: dueDate || entry.dueDate,
      currentTrimester: currentTrimester !== undefined ? currentTrimester : entry.currentTrimester,
      weekNumber: weekNumber || entry.weekNumber,
      dayNumber: dayNumber !== undefined ? dayNumber : entry.dayNumber,
      weight: weight || entry.weight,
      bloodPressure: bloodPressure || entry.bloodPressure,
      notes: notes || entry.notes
    });

    res.status(200).json({
      message: 'Pregnancy entry updated successfully',
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

    const entry = await PregnancyEntry.findOne({
      where: { id, userId }
    });

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    await entry.destroy();

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
    const latest = await PregnancyEntry.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });

    if (!latest) {
      return res.status(404).json({ 
        error: 'No pregnancy data found. Please add your pregnancy information first.' 
      });
    }

    const progress = calculateProgressFromDueDate(latest.dueDate);
    const milestone = getMilestones(progress.weekNumber);

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
    const entries = await PregnancyEntry.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });

    if (entries.length === 0) {
      return res.status(404).json({ 
        error: 'No pregnancy data found.' 
      });
    }

    const latest = entries[0];
    const metrics = {
      weight: latest.weight,
      bloodPressure: latest.bloodPressure,
      lastUpdated: latest.updatedAt,
      currentWeek: latest.weekNumber,
      dueDate: latest.dueDate
    };

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

    const milestone = getMilestones(weekNumber);

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
