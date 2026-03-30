const pool = require('../config/database');

class PregnancyTracker {
  // Create pregnancy entry
  static async create(userId, pregnancyData) {
    try {
      const {
        dueDate,
        currentTrimester,
        weekNumber,
        dayNumber,
        weight,
        bloodPressure,
        notes
      } = pregnancyData;

      if (!dueDate) {
        throw new Error('dueDate is required');
      }

      const query = `
        INSERT INTO pregnancy_entries 
        (userId, dueDate, currentTrimester, weekNumber, dayNumber, weight, bloodPressure, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const [result] = await pool.query(query, [
        userId,
        dueDate,
        currentTrimester,
        weekNumber,
        dayNumber,
        weight,
        bloodPressure,
        notes
      ]);

      return {
        id: result.insertId,
        userId,
        dueDate,
        currentTrimester,
        weekNumber,
        dayNumber,
        weight,
        bloodPressure,
        notes
      };
    } catch (error) {
      throw error;
    }
  }

  // Get all entries for a user
  static async getAllByUserId(userId) {
    try {
      const query = `
        SELECT * FROM pregnancy_entries 
        WHERE userId = ? 
        ORDER BY createdAt DESC
      `;
      const [rows] = await pool.query(query, [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get latest entry for a user
  static async getLatestByUserId(userId) {
    try {
      const query = `
        SELECT * FROM pregnancy_entries 
        WHERE userId = ? 
        ORDER BY createdAt DESC 
        LIMIT 1
      `;
      const [rows] = await pool.query(query, [userId]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Get entry by ID
  static async getById(entryId, userId) {
    try {
      const query = `
        SELECT * FROM pregnancy_entries 
        WHERE id = ? AND userId = ?
      `;
      const [rows] = await pool.query(query, [entryId, userId]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Update pregnancy entry
  static async update(entryId, userId, updates) {
    try {
      const allowedFields = [
        'dueDate',
        'currentTrimester',
        'weekNumber',
        'dayNumber',
        'weight',
        'bloodPressure',
        'notes'
      ];

      const updateData = {};

      allowedFields.forEach(field => {
        if (updates[field] !== undefined) {
          updateData[field] = updates[field];
        }
      });

      if (Object.keys(updateData).length === 0) {
        return await this.getById(entryId, userId);
      }

      const fields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
      const values = Object.values(updateData);

      const query = `
        UPDATE pregnancy_entries 
        SET ${fields} 
        WHERE id = ? AND userId = ?
      `;

      await pool.query(query, [...values, entryId, userId]);

      return await this.getById(entryId, userId);
    } catch (error) {
      throw error;
    }
  }

  // Delete pregnancy entry
  static async delete(entryId, userId) {
    try {
      const query = `
        DELETE FROM pregnancy_entries 
        WHERE id = ? AND userId = ?
      `;
      const [result] = await pool.query(query, [entryId, userId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Calculate current trimester and week from due date
  static async calculateProgressFromDueDate(dueDate) {
    try {
      const due = new Date(dueDate);
      const today = new Date();

      // Pregnancy is 40 weeks (280 days)
      const pregnancyStart = new Date(due);
      pregnancyStart.setDate(pregnancyStart.getDate() - 280);

      // Days elapsed since pregnancy start
      const daysElapsed = Math.floor((today - pregnancyStart) / (1000 * 60 * 60 * 24));
      const weekNumber = Math.floor(daysElapsed / 7) + 1;
      const dayNumber = (daysElapsed % 7) + 1;

      // Determine trimester
      let trimester = 1;
      if (weekNumber > 13 && weekNumber <= 26) trimester = 2;
      if (weekNumber > 26) trimester = 3;

      // Days remaining
      const daysRemaining = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
      const weeksRemaining = Math.floor(daysRemaining / 7);

      return {
        weekNumber: Math.min(weekNumber, 40),
        dayNumber: Math.min(dayNumber, 7),
        currentTrimester: trimester,
        daysRemaining: Math.max(daysRemaining, 0),
        weeksRemaining: Math.max(weeksRemaining, 0),
        estimatedDueDate: due,
        pregnancyStatus: daysRemaining > 0 ? 'ongoing' : 'due'
      };
    } catch (error) {
      throw error;
    }
  }

  // Get pregnancy milestones based on week
  static async getMilestones(weekNumber) {
    try {
      const milestones = {
        1: 'Conception occurred',
        4: 'Missed period (pregnancy can be detected)',
        8: 'Heart begins to beat',
        12: 'End of first trimester',
        16: 'Baby can move, gender visible on ultrasound',
        20: 'Halfway through pregnancy, major organs formed',
        24: 'Baby can hear sounds',
        26: 'End of second trimester',
        28: 'Baby opens eyes',
        32: 'Baby\'s bones are fully formed',
        36: 'Baby moves into birthing position',
        40: 'Due date - baby ready for delivery'
      };

      return milestones[weekNumber] || 'Pregnancy progressing normally';
    } catch (error) {
      throw error;
    }
  }

  // Get health metrics (weight tracking)
  static async getHealthMetrics(userId) {
    try {
      const query = `
        SELECT 
          COUNT(*) as totalCheckups,
          AVG(weight) as averageWeight,
          MIN(weight) as minimumWeight,
          MAX(weight) as maximumWeight,
          COUNT(CASE WHEN bloodPressure IS NOT NULL THEN 1 END) as pressureReadings
        FROM pregnancy_entries 
        WHERE userId = ?
      `;
      const [rows] = await pool.query(query, [userId]);

      if (rows.length === 0) return null;

      const metrics = rows[0];
      return {
        totalCheckups: metrics.totalCheckups,
        averageWeight: metrics.averageWeight ? parseFloat(metrics.averageWeight).toFixed(1) : null,
        minimumWeight: metrics.minimumWeight,
        maximumWeight: metrics.maximumWeight,
        weightGain: metrics.maximumWeight && metrics.minimumWeight 
          ? (metrics.maximumWeight - metrics.minimumWeight).toFixed(1) 
          : null,
        pressureReadings: metrics.pressureReadings
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PregnancyTracker;
