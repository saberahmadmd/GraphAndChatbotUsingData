const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'sample_data.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error opening database:', err);
  } else {
    console.log('🔗 Connected to SQLite database at', dbPath);
  }
});

function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS lubricant_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        year INTEGER NOT NULL,
        category TEXT NOT NULL,
        value REAL NOT NULL,
        type TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('❌ Error creating table:', err);
        reject(err);
      } else {
        console.log('🗄️  Database table initialized (lubricant_data)');
        resolve();
      }
    });
  });
}

module.exports = { db, initializeDatabase };