import express from 'express';
import './config/database';
import User from './models/user';
import Team from './models/team';
import Activity from './models/activity';
import LeaderboardEntry from './models/leaderboard';
import Workout from './models/workout';
import { seedDatabaseData } from './scripts/seed';

const app = express();
const port = Number(process.env.PORT || 8000);
const host = process.env.HOST || '0.0.0.0';
const codespaceName = process.env.CODESPACE_NAME?.trim();
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    apiBaseUrl,
  });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(users);
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find({}).populate('members').lean();
  res.json(teams);
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json(activities);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).populate('user').lean();
  res.json(leaderboard);
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json(workouts);
});

const startServer = async () => {
  try {
    await seedDatabaseData();
    app.listen(port, host, () => {
      console.log(`OctoFit backend listening on ${host}:${port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Error seeding database on startup:', error);
    process.exit(1);
  }
};

void startServer();

export { app, apiBaseUrl };