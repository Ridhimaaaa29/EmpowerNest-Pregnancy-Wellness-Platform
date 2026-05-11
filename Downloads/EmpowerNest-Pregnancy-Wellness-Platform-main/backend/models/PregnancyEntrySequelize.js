const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./UserSequelize');

const PregnancyEntry = sequelize.define('PregnancyEntry', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  currentTrimester: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  weekNumber: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  dayNumber: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  weight: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  bloodPressure: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'pregnancy_entries',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Define association
PregnancyEntry.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = PregnancyEntry;
