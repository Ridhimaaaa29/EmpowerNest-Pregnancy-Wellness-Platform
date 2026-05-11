const pool = require('../config/database');

class HealthRisk {
  // Create health risk assessment
  static async create(userId, assessmentData) {
    try {
      const {
        age,
        weight,
        medicalConditions = [],
        riskScore = 0,
        riskLevel = 'low',
        insights = [],
        recommendations = []
      } = assessmentData;

      if (!age || !weight) {
        throw new Error('age and weight are required');
      }

      const query = `
        INSERT INTO health_risk 
        (userId, age, weight, medicalConditions, riskScore, riskLevel, insights, recommendations)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const conditionsJson = medicalConditions ? JSON.stringify(medicalConditions) : null;
      const insightsJson = insights ? JSON.stringify(insights) : null;
      const recommendationsJson = recommendations ? JSON.stringify(recommendations) : null;

      const [result] = await pool.query(query, [
        userId,
        age,
        weight,
        conditionsJson,
        riskScore,
        riskLevel,
        insightsJson,
        recommendationsJson
      ]);

      return {
        id: result.insertId,
        userId,
        age,
        weight,
        medicalConditions,
        riskScore,
        riskLevel,
        insights,
        recommendations,
        createdAt: new Date()
      };
    } catch (error) {
      throw error;
    }
  }

  // Get all assessments for a user
  static async getAllByUserId(userId) {
    try {
      const query = `
        SELECT * FROM health_risk 
        WHERE userId = ? 
        ORDER BY createdAt DESC
      `;
      const [rows] = await pool.query(query, [userId]);

      return rows.map(row => this._parseRow(row));
    } catch (error) {
      throw error;
    }
  }

  // Get latest assessment for a user
  static async getLatestByUserId(userId) {
    try {
      const query = `
        SELECT * FROM health_risk 
        WHERE userId = ? 
        ORDER BY createdAt DESC 
        LIMIT 1
      `;
      const [rows] = await pool.query(query, [userId]);

      if (rows.length === 0) return null;

      return this._parseRow(rows[0]);
    } catch (error) {
      throw error;
    }
  }

  // Get assessment by ID
  static async getById(assessmentId, userId) {
    try {
      const query = `
        SELECT * FROM health_risk 
        WHERE id = ? AND userId = ?
      `;
      const [rows] = await pool.query(query, [assessmentId, userId]);

      if (rows.length === 0) return null;

      return this._parseRow(rows[0]);
    } catch (error) {
      throw error;
    }
  }

  // Update assessment
  static async update(assessmentId, userId, updates) {
    try {
      const allowedFields = ['age', 'weight', 'medicalConditions', 'riskScore', 'riskLevel', 'insights', 'recommendations'];
      const updateData = {};

      allowedFields.forEach(field => {
        if (updates[field] !== undefined) {
          updateData[field] = updates[field];
        }
      });

      if (Object.keys(updateData).length === 0) {
        return await this.getById(assessmentId, userId);
      }

      const fields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
      const values = Object.values(updateData).map(val => 
        typeof val === 'object' ? JSON.stringify(val) : val
      );

      const query = `UPDATE health_risk SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ? AND userId = ?`;
      await pool.query(query, [...values, assessmentId, userId]);

      return await this.getById(assessmentId, userId);
    } catch (error) {
      throw error;
    }
  }

  // Delete assessment
  static async delete(assessmentId, userId) {
    try {
      const query = `DELETE FROM health_risk WHERE id = ? AND userId = ?`;
      const [result] = await pool.query(query, [assessmentId, userId]);

      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Parse database row (handle JSON fields)
  static _parseRow(row) {
    return {
      ...row,
      medicalConditions: row.medicalConditions ? 
        (typeof row.medicalConditions === 'string' ? JSON.parse(row.medicalConditions) : row.medicalConditions) : [],
      insights: row.insights ? 
        (typeof row.insights === 'string' ? JSON.parse(row.insights) : row.insights) : [],
      recommendations: row.recommendations ? 
        (typeof row.recommendations === 'string' ? JSON.parse(row.recommendations) : row.recommendations) : []
    };
  }
}

module.exports = HealthRisk;
