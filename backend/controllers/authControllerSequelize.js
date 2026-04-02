const User = require('../models/UserSequelize');
const jwt = require('jsonwebtoken');

const authControllerSequelize = {
  // Signup with Sequelize
  signup: async (req, res) => {
    try {
      const { email, password, confirmPassword, name, phoneNumber, dateOfBirth } = req.body;

      // Validate inputs
      if (!email || !password || !name) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Check password match
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }

      // Check if user exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ error: 'Email already registered' });
      }

      // Create user (password will be hashed by beforeCreate hook)
      const user = await User.create({
        email,
        password,
        name,
        phoneNumber,
        dateOfBirth
      });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Login with Sequelize
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate inputs
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }

      // Find user
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Verify password
      const isPasswordValid = await user.verifyPassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get user profile with Sequelize
  getProfile: async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Update user profile
  updateProfile: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { name, phoneNumber, dateOfBirth } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (name) user.name = name;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (dateOfBirth) user.dateOfBirth = dateOfBirth;

      await user.save();

      res.json({
        message: 'Profile updated successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phoneNumber: user.phoneNumber,
          dateOfBirth: user.dateOfBirth
        }
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Change password
  changePassword: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { oldPassword, newPassword, confirmPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'New passwords do not match' });
      }

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isOldPasswordValid = await user.verifyPassword(oldPassword);
      if (!isOldPasswordValid) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }

      user.password = newPassword;
      await user.save();

      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Logout
  logout: async (req, res) => {
    try {
      res.clearCookie('authToken');
      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = authControllerSequelize;
