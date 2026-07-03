"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const db = mongoose_1.default.connection;
mongoose_1.default
    .connect(connectionString)
    .then(() => {
    console.log('Connected to octofit_db');
})
    .catch((error) => {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
});
db.on('error', console.error.bind(console, 'connection error:'));
const connectToDatabase = async () => {
    if (mongoose_1.default.connection.readyState === 1) {
        return mongoose_1.default.connection;
    }
    await mongoose_1.default.connect(connectionString);
    return mongoose_1.default.connection;
};
exports.connectToDatabase = connectToDatabase;
exports.default = db;
