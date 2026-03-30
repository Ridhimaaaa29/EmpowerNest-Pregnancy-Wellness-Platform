const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Create new user with hashed password
  static async create(email, password, name, phoneNumber = null, dateOfBirth = null) {
    try {
      // Hash password with salt rounds = 10
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const query = `
        INSERT INTO users (email, password, name, phoneNumber, dateOfBirth) 
        VALUES (?, ?, ?, ?, ?)
      `;
      
      const [result] = await pool.query(query, [
        email,
        hashedPassword,
        name,
        phoneNumber,
        dateOfBirth
      ]);
      
      return {
        id: result.insertId,
        email,
        name,
        phoneNumber,
        dateOfBirth
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email already registered');
      }
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    try {
      const query = 'SELECT * FROM users WHERE email = ?';
      const [rows] = await pool.query(query, [email]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Find user by ID (excludes password)
  static async findById(userId) {
    try {
      const query = `
        SELECT id, email, name, phoneNumber, dateOfBirth, role, createdAt, updatedAt 
        FROM users 
        WHERE id = ?
      `;
      const [rows] = await pool.query(query, [userId]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Verify password using bcryptjs
  static async verifyPassword(plainPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw error;
    }
  }

  // Update user profile
  static async update(userId, updates) {
    try {
      const allowedFields = ['name', 'phoneNumber', 'dateOfBirth'];
      const updateData = {};
      
      allowedFields.forEach(field => {
        if (updates[field] !== undefined) {
          updateData[field] = updates[field];
        }
      });

      if (Object.keys(updateData).length === 0) {
        return await this.findById(userId);
      }

      const fields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
      const values = Object.values(updateData);
      
      const query = `UPDATE users SET ${fields} WHERE id = ?`;
      await pool.query(query, [...values, userId]);
      
      return await this.findById(userId);
    } catch (error) {
      throw error;
    }
  }

  // Delete user
  static async delete(userId) {
    try {
      const query = 'DELETE FROM users WHERE id = ?';
      const [result] = await pool.query(query, [userId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Get all users (admin only)
  static async getAll(limit = 10, offset = 0) {
    try {
      const query = `
        SELECT id, email, name, phoneNumber, dateOfBirth, role, createdAt 
        FROM users 
        LIMIT ? OFFSET ?
      `;
      const [rows] = await pool.query(query, [limit, offset]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
