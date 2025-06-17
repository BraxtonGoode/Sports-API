// scripts/seed.js
require('dotenv').config();
const mongoDb = require('../DB/connect'); // Adjust path as needed
const { ObjectId } = require('mongodb'); // To create ObjectIds if needed for relationships

const users = [
    { username: 'admin', password: 'Password123!', role: 'admin' }, // Hash this password in real script!
    { username: 'user1', password: 'User1Pass!', role: 'user' },
];

const basketballTeams = [
    {
        name: 'Lakers',
        record: '60-22',
        location: 'Los Angeles, CA',
        players: ['LeBron James', 'Anthony Davis'],
        colors: ['Purple', 'Gold'],
        headCoach: 'Coach Ham',
        streak: 'Win 3'
    },
    {
        name: 'Warriors',
        record: '50-32',
        location: 'San Francisco, CA',
        players: ['Stephen Curry', 'Klay Thompson'],
        colors: ['Blue', 'Gold'],
        headCoach: 'Steve Kerr',
        streak: 'Loss 1'
    }
];

const seedDb = async () => {
    try {
        await mongoDb.initDb(); // Initialize DB connection

        const db = mongoDb.getDb();

        // Optional: Clear existing data
        //console.log('Clearing existing data...');
       // await db.collection('users').deleteMany({});
       // await db.collection('Basketball').deleteMany({});
       // await db.collection('Volleyball').deleteMany({});
        // ... clear other collections

        // Seed Users (remember to hash passwords in a real scenario!)
        console.log('Seeding users...');
        await db.collection('users').insertMany(users);

        // Seed Basketball Teams
        console.log('Seeding Basketball teams...');
        await db.collection('Basketball').insertMany(basketballTeams);

        // Seed Volleyball Teams (add your volleyball data here)
        console.log('Seeding Volleyball teams...');
        // await db.collection('Volleyball').insertMany(volleyballTeamsData);

        console.log('Database seeded successfully!');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        // You might want to close the DB connection here if it's not managed elsewhere
        // mongoDb.closeDb(); // Assuming you have a close method
        process.exit(); // Exit the script
    }
};

seedDb();