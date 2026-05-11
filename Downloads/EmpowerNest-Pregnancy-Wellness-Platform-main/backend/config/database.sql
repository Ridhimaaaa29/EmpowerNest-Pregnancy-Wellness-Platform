-- EmpowerNest Database Setup
-- Run these commands in MySQL to create the database and tables

-- Create Database
CREATE DATABASE IF NOT EXISTS empowerNest;
USE empowerNest;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(20),
  dateOfBirth DATE,
  role ENUM('user', 'admin') DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX (email)
);

-- Cycle Entries Table
CREATE TABLE IF NOT EXISTS cycle_entries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  lastPeriodDate DATE NOT NULL,
  cycleLength INT NOT NULL DEFAULT 28,
  periodLength INT NOT NULL DEFAULT 5,
  regularCycle BOOLEAN DEFAULT true,
  symptoms JSON,
  flow VARCHAR(50),
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX (userId, createdAt)
);

-- Pregnancy Entries Table
CREATE TABLE IF NOT EXISTS pregnancy_entries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  dueDate DATE NOT NULL,
  currentTrimester INT,
  weekNumber INT,
  dayNumber INT,
  weight DECIMAL(5,2),
  bloodPressure VARCHAR(20),
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX (userId, createdAt)
);

-- Vaccinations Table
CREATE TABLE IF NOT EXISTS vaccinations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  vaccineName VARCHAR(255) NOT NULL,
  vaccinationDate DATE,
  dueDate DATE,
  status ENUM('pending', 'completed', 'missed') DEFAULT 'pending',
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX (userId, status)
);

-- Sleep Tracker Table
CREATE TABLE IF NOT EXISTS sleep_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  sleepDate DATE NOT NULL,
  durationHours DECIMAL(3,1),
  quality ENUM('poor', 'fair', 'good', 'excellent') DEFAULT 'fair',
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX (userId, sleepDate)
);

-- Daily Logs Table
CREATE TABLE IF NOT EXISTS daily_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  logDate DATE NOT NULL,
  mood VARCHAR(50),
  energy INT,
  symptoms JSON,
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX (userId, logDate)
);

-- Health Risk Assessment Table
CREATE TABLE IF NOT EXISTS health_risk (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  age INT,
  weight DECIMAL(5,2),
  medicalConditions JSON,
  riskScore DECIMAL(5,2),
  riskLevel VARCHAR(50),
  insights JSON,
  recommendations JSON,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX (userId, createdAt)
);

-- Print completion message
SELECT '✅ Database tables created successfully!' AS message;
