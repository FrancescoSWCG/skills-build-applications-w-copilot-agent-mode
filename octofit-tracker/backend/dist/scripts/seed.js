"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabaseData = seedDatabaseData;
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
const user_1 = __importDefault(require("../models/user"));
const team_1 = __importDefault(require("../models/team"));
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const workout_1 = __importDefault(require("../models/workout"));
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabaseData() {
    const connection = await (0, database_1.connectToDatabase)();
    console.log('Seed the octofit_db database with test data');
    await Promise.all([
        user_1.default.deleteMany({}),
        team_1.default.deleteMany({}),
        activity_1.default.deleteMany({}),
        leaderboard_1.default.deleteMany({}),
        workout_1.default.deleteMany({}),
    ]);
    const users = await user_1.default.insertMany([
        {
            name: 'Ada Lovelace',
            email: 'ada@example.com',
            role: 'captain',
            fitnessLevel: 'advanced',
        },
        {
            name: 'Linus Torvalds',
            email: 'linus@example.com',
            role: 'member',
            fitnessLevel: 'intermediate',
        },
    ]);
    const teams = await team_1.default.insertMany([
        {
            name: 'Rocket Squad',
            members: [users[0]._id, users[1]._id],
            focus: 'endurance',
            weeklyGoal: '5 runs',
        },
        {
            name: 'Velocity Crew',
            members: [users[0]._id],
            focus: 'strength',
            weeklyGoal: '3 strength sessions',
        },
    ]);
    const activities = await activity_1.default.insertMany([
        {
            user: users[0]._id,
            type: 'run',
            durationMinutes: 32,
            distanceKm: 5.4,
            calories: 410,
        },
        {
            user: users[1]._id,
            type: 'workout',
            durationMinutes: 45,
            distanceKm: 0,
            calories: 320,
        },
        {
            user: users[0]._id,
            type: 'cycle',
            durationMinutes: 60,
            distanceKm: 18,
            calories: 520,
        },
    ]);
    const leaderboard = await leaderboard_1.default.insertMany([
        {
            user: users[0]._id,
            score: 98,
            streak: 7,
        },
        {
            user: users[1]._id,
            score: 91,
            streak: 4,
        },
    ]);
    const workouts = await workout_1.default.insertMany([
        {
            title: 'Morning Mobility',
            difficulty: 'easy',
            durationMinutes: 20,
            focus: 'mobility',
        },
        {
            title: 'HIIT Circuit',
            difficulty: 'hard',
            durationMinutes: 30,
            focus: 'cardio',
        },
        {
            title: 'Core Stability',
            difficulty: 'medium',
            durationMinutes: 25,
            focus: 'core',
        },
    ]);
    console.log('Database seeding complete');
    return {
        users: users.length,
        teams: teams.length,
        activities: activities.length,
        leaderboard: leaderboard.length,
        workouts: workouts.length,
    };
}
if (require.main === module) {
    seedDatabaseData()
        .then(() => mongoose_1.default.disconnect())
        .catch((error) => {
        console.error('Error seeding database:', error);
        process.exit(1);
    });
}
