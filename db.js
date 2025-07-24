// db.js
const Database = require('better-sqlite3');
const db = new Database('tasks.db');

// Create table on startup
db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_str_id TEXT UNIQUE,
    description TEXT NOT NULL,
    estimated_time_minutes INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

module.exports = db;