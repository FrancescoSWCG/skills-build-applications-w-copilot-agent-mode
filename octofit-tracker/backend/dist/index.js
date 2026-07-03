"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiBaseUrl = exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("./config/database");
const user_1 = __importDefault(require("./models/user"));
const team_1 = __importDefault(require("./models/team"));
const activity_1 = __importDefault(require("./models/activity"));
const leaderboard_1 = __importDefault(require("./models/leaderboard"));
const workout_1 = __importDefault(require("./models/workout"));
const seed_1 = require("./scripts/seed");
const app = (0, express_1.default)();
exports.app = app;
const port = Number(process.env.PORT || 8000);
const apiBaseUrl = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:${port}`;
exports.apiBaseUrl = apiBaseUrl;
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-backend',
        apiBaseUrl,
    });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await user_1.default.find({}).lean();
    res.json(users);
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await team_1.default.find({}).populate('members').lean();
    res.json(teams);
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await activity_1.default.find({}).lean();
    res.json(activities);
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await leaderboard_1.default.find({}).populate('user').lean();
    res.json(leaderboard);
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await workout_1.default.find({}).lean();
    res.json(workouts);
});
(0, seed_1.seedDatabaseData)()
    .then(() => {
    app.listen(port, () => {
        console.log(`OctoFit backend listening on port ${port}`);
        console.log(`API base URL: ${apiBaseUrl}`);
    });
})
    .catch((error) => {
    console.error('Error seeding database on startup:', error);
    process.exit(1);
});
