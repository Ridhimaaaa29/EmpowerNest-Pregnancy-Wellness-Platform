const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./UserSequelize');

const CycleEntry = sequelize.define('CycleEntry', {
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
  lastPeriodDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  cycleLength: {
    type: DataTypes.INTEGER,
    defaultValue: 28
  },
  periodLength: {
    type: DataTypes.INTEGER,
    defaultValue: 5
  },
  regularCycle: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  symptoms: {
    type: DataTypes.JSON,
    allowNull: true
  },
  flow: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'cycle_entries',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Define association
CycleEntry.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = CycleEntry;
