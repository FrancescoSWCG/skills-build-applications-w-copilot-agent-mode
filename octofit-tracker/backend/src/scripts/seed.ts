import mongoose from 'mongoose';
import { connectToDatabase } from '../config/database';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import LeaderboardEntry from '../models/leaderboard';
import Workout from '../models/workout';

/**
 * Seed the octofit_db database with test data
 */
export async function seedDatabaseData() {
  const connection = await connectToDatabase();

  console.log('Seed the octofit_db database with test data');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
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

  const teams = await Team.insertMany([
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

  const activities = await Activity.insertMany([
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

  const leaderboard = await LeaderboardEntry.insertMany([
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

  const workouts = await Workout.insertMany([
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
    .then(() => mongoose.disconnect())
    .catch((error) => {
      console.error('Error seeding database:', error);
      process.exit(1);
    });
}
