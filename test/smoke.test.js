import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Placeholder smoke tests so `npm test` runs green until real coverage lands.
// The "run tests before proposing a fix" constraint (loop-constraints.md) needs
// a test command that actually executes — this is that minimum. Replace as the
// project grows.

test('package.json is valid and names the project', () => {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  assert.equal(pkg.name, 'looper-engineering');
});

test('loop scaffold core files are present', () => {
  for (const f of ['LOOP.md', 'STATE.md', 'loop-constraints.md', 'loop-budget.md']) {
    assert.ok(readFileSync(join(root, f), 'utf8').length > 0, `${f} should exist and be non-empty`);
  }
});
