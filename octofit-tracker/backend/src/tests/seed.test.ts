import assert from 'node:assert/strict';
import test from 'node:test';
import { seedDatabaseData } from '../scripts/seed';

test('seedDatabaseData populates the expected collections', async () => {
  const result = await seedDatabaseData();

  assert.equal(result.users, 2);
  assert.equal(result.teams, 2);
  assert.equal(result.activities, 3);
  assert.equal(result.leaderboard, 2);
  assert.equal(result.workouts, 3);
});
