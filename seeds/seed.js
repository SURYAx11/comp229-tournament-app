// seeds/seed.js — optional sample data loader
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/userModel');
const Tournament = require('../models/tournamentModel');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/comp229_tournament';

async function seedData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected (Seed)');

    await User.deleteMany({});
    await Tournament.deleteMany({});

    const user = await User.create({
      firstname: 'Surya',
      lastname: 'Sreekumar',
      email: 'surya@example.com',
      password: 'Passw0rd!',
      role: 'manager'
    });

    await Tournament.create({
      name: 'Campus League',
      sport: 'Football',
      location: 'Toronto',
      startDate: new Date(),
      createdBy: user._id,
      isPublic: true,
      teams: [{ name: 'Team A' }, { name: 'Team B' }]
    });

    console.log('🌱 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
}

seedData();
