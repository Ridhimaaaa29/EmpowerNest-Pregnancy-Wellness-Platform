const sequelize = require('./config/sequelize');
const User = require('./models/UserSequelize');
const CycleEntry = require('./models/CycleEntrySequelize');
const PregnancyEntry = require('./models/PregnancyEntrySequelize');

const initDatabase = async () => {
  try {
    console.log('🔄 Initializing database tables...');
    
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('✅ All tables created/updated successfully!');
    
    console.log('\n📊 Tables created:');
    console.log('  - users');
    console.log('  - cycle_entries');
    console.log('  - pregnancy_entries');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    process.exit(1);
  }
};

initDatabase();
