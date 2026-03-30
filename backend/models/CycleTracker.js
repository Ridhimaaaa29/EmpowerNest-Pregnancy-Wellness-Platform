const pool = require('../config/database');

class CycleTracker {
  // Create cycle entry
  static async create(userId, cycleData) {
    try {
      const {
        lastPeriodDate,
        cycleLength = 28,
        periodLength = 5,
        regularCycle = true,
        symptoms = null,
        flow,
        notes
      } = cycleData;

      if (!lastPeriodDate) {
        throw new Error('lastPeriodDate is required');
      }

      const query = `
        INSERT INTO cycle_entries 
        (userId, lastPeriodDate, cycleLength, periodLength, regularCycle, symptoms, flow, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const symptomsJson = symptoms ? JSON.stringify(symptoms) : null;

      const [result] = await pool.query(query, [
        userId,
        lastPeriodDate,
        cycleLength,
        periodLength,
        regularCycle,
        symptomsJson,
        flow,
        notes
      ]);

      return {
        id: result.insertId,
        userId,
        lastPeriodDate,
        cycleLength,
        periodLength,
        regularCycle,
        symptoms,
        flow,
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
        SELECT * FROM cycle_entries 
        WHERE userId = ? 
        ORDER BY createdAt DESC
      `;
      const [rows] = await pool.query(query, [userId]);

      // Parse JSON symptoms
      return rows.map(row => ({
        ...row,
        symptoms: row.symptoms ? (typeof row.symptoms === 'string' ? JSON.parse(row.symptoms) : row.symptoms) : null
      }));
    } catch (error) {
      throw error;
    }
  }

  // Get latest entry for a user
  static async getLatestByUserId(userId) {
    try {
      const query = `
        SELECT * FROM cycle_entries 
        WHERE userId = ? 
        ORDER BY createdAt DESC 
        LIMIT 1
      `;
      const [rows] = await pool.query(query, [userId]);

      if (rows.length === 0) return null;

      return {
        ...rows[0],
        symptoms: rows[0].symptoms ? (typeof rows[0].symptoms === 'string' ? JSON.parse(rows[0].symptoms) : rows[0].symptoms) : null
      };
    } catch (error) {
      throw error;
    }
  }

  // Get entry by ID
  static async getById(entryId, userId) {
    try {
      const query = `
        SELECT * FROM cycle_entries 
        WHERE id = ? AND userId = ?
      `;
      const [rows] = await pool.query(query, [entryId, userId]);

      if (rows.length === 0) return null;

      return {
        ...rows[0],
        symptoms: rows[0].symptoms ? (typeof rows[0].symptoms === 'string' ? JSON.parse(rows[0].symptoms) : rows[0].symptoms) : null
      };
    } catch (error) {
      throw error;
    }
  }

  // Update cycle entry
  static async update(entryId, userId, updates) {
    try {
      const allowedFields = [
        'lastPeriodDate',
        'cycleLength',
        'periodLength',
        'regularCycle',
        'symptoms',
        'flow',
        'notes'
      ];

      const updateData = {};

      allowedFields.forEach(field => {
        if (updates[field] !== undefined) {
          if (field === 'symptoms') {
            updateData[field] = updates[field] ? JSON.stringify(updates[field]) : null;
          } else {
            updateData[field] = updates[field];
          }
        }
      });

      if (Object.keys(updateData).length === 0) {
        return await this.getById(entryId, userId);
      }

      const fields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
      const values = Object.values(updateData);

      const query = `
        UPDATE cycle_entries 
        SET ${fields} 
        WHERE id = ? AND userId = ?
      `;

      await pool.query(query, [...values, entryId, userId]);

      return await this.getById(entryId, userId);
    } catch (error) {
      throw error;
    }
  }

  // Delete cycle entry
  static async delete(entryId, userId) {
    try {
      const query = `
        DELETE FROM cycle_entries 
        WHERE id = ? AND userId = ?
      `;
      const [result] = await pool.query(query, [entryId, userId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Calculate cycle predictions
  static async predictNextCycle(userId) {
    try {
      const latestEntry = await this.getLatestByUserId(userId);

      if (!latestEntry) {
        return null;
      }

      const lastDate = new Date(latestEntry.lastPeriodDate);
      const cycleLength = latestEntry.cycleLength || 28;
      const periodLength = latestEntry.periodLength || 5;

      // Calculate next period date
      const nextPeriodDate = new Date(lastDate);
      nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);

      // Calculate fertile window (typically days 12-16 of a 28-day cycle)
      const fertileWindowStart = new Date(lastDate);
      const fertileWindowEnd = new Date(lastDate);
      fertileWindowStart.setDate(fertileWindowStart.getDate() + 12);
      fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 16);

      // Calculate ovulation date (typically 14 days before next period)
      const ovulationDate = new Date(nextPeriodDate);
      ovulationDate.setDate(ovulationDate.getDate() - 14);

      return {
        nextPeriodDate,
        fertileWindowStart,
        fertileWindowEnd,
        ovulationDate,
        cycleLength,
        periodLength
      };
    } catch (error) {
      throw error;
    }
  }

  // Get cycle statistics
  static async getStatistics(userId) {
    try {
      const query = `
        SELECT 
          COUNT(*) as totalCycles,
          AVG(cycleLength) as averageCycleLength,
          AVG(periodLength) as averagePeriodLength,
          MIN(cycleLength) as minCycleLength,
          MAX(cycleLength) as maxCycleLength,
          COUNT(CASE WHEN regularCycle = true THEN 1 END) as regularCycles
        FROM cycle_entries 
        WHERE userId = ?
      `;
      const [rows] = await pool.query(query, [userId]);

      if (rows.length === 0) return null;

      const stats = rows[0];
      return {
        totalCycles: stats.totalCycles,
        averageCycleLength: Math.round(stats.averageCycleLength || 0),
        averagePeriodLength: Math.round(stats.averagePeriodLength || 0),
        minCycleLength: stats.minCycleLength,
        maxCycleLength: stats.maxCycleLength,
        regularCycles: stats.regularCycles
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CycleTracker;
