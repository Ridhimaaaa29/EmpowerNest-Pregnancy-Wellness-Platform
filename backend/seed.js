const sequelize = require('./config/sequelize');
const User = require('./models/UserSequelize');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Sync database
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced');

    // Check if admin user already exists
    const adminExists = await User.findOne({ where: { email: 'admin@empowernest.com' } });
    if (adminExists) {
      console.log('⏭️  Admin user already exists. Skipping seed data.');
      process.exit(0);
    }

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
      },
      {
        email: 'user2@empowernest.com',
        password: 'User@123',
        name: 'Emma Davis',
        phoneNumber: '9876543212',
        dateOfBirth: '1998-08-10',
        role: 'user'
      },
      {
        email: 'user3@empowernest.com',
        password: 'User@123',
        name: 'Jessica Smith',
        phoneNumber: '9876543213',
        dateOfBirth: '1992-03-25',
        role: 'user'
      }
    ];

    // Create users
    for (const userData of testUsers) {
      const user = await User.create(userData);
      console.log(`✅ Created user: ${user.email}`);
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    testUsers.forEach(user => {
      console.log(`Email: ${user.email}`);
      console.log(`Password: ${user.password}`);
      console.log(`Name: ${user.name}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

// Run seed
seedDatabase();
