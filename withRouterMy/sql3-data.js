const { resolve } = require("path");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("yourdatabase.db", (err) => {
  if (err) {
    return console.error(err.message);
  }

  console.log("Connect successfully");
});

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER NOT NULL
)`);

module.exports = {
  async getUsers() {
    try {
      const users = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM users`, [], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
      return users;
    } catch (err) {
      return null;
    }
  },

  async createUser(user) {
    const lastID = await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users (name, age) VALUES (?, ?)`,
        [user.name, user.age],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.changes);
          }
        }
      );
    });
    return { lastID, ...user };
  },

  async changeUser(id, updatedData) {
    const changes = await new Promise((resolve, reject) => {
      db.run(
        `UPDATE users SET name = ?, age = ? WHERE id = ?`,
        [updatedData.name, updatedData.age, id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.changes);
          }
        }
      );
    });

    if (changes === 0) {
      return null;
    }
    return this.getUserById(id);
  },

  async deleteUser(id) {
    const changes = await new Promise((resolve, reject) => {
      db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });

    return changes > 0;
  },

  async getUserById(id) {
    const user = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM users WHERE id = ?`, [id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    return user;
  },
};
