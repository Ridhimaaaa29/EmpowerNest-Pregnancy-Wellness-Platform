const sequelize = require('./config/sequelize');
const User = require('./models/UserSequelize');
const bcrypt = require('bcryptjs');

const resetAndSeed = async () => {
  try {
    console.log('🗑️  Dropping existing tables...');
    await sequelize.drop();
    console.log('✅ Tables dropped');

    console.log('🌱 Syncing database...');
    await sequelize.sync({ force: true });
    console.log('✅ Database synced');

    // Create test users
    const testUsers = [
      {
        email: 'admin@empowernest.com',
        password: 'Admin@123',
        name: 'Admin User',
        phoneNumber: '9876543210',
        dateOfBirth: '1990-01-15',
        role: 'admin'
      },
      {
        email: 'user1@empowernest.com',
        password: 'User@123',
        name: 'Sarah Johnson',
        phoneNumber: '9876543211',
        dateOfBirth: '1995-05-20',
        role: 'user'
      }
    ];

    for (const userData of testUsers) {
      const user = await User.create(userData);
      console.log(`✅ Created user: ${user.email}`);
    }

    console.log('\n🎉 Database reset and seeding completed!');
    console.log('\n📝 Test Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email: admin@empowernest.com');
    console.log('Password: Admin@123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email: user1@empowernest.com');
    console.log('Password: User@123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

resetAndSeed();
