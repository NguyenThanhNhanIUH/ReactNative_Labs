import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('tasks.db');

export const runSql = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        params,
        (_, result) => resolve(result),
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });

export const initDB = async () => {
  // Create table with fields to support syncing
  await runSql(
    `CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      completed INTEGER DEFAULT 0,
      remote_id INTEGER,
      updated_at INTEGER,
      dirty INTEGER DEFAULT 1
    );`
  );
};

export const getTasks = async () => {
  const res = await runSql('SELECT * FROM tasks ORDER BY id DESC');
  return res.rows._array;
};

export const addTask = async (title) => {
  const now = Date.now();
  const res = await runSql('INSERT INTO tasks (title, completed, updated_at, dirty) VALUES (?, 0, ?, 1)', [title, now]);
  return { id: res.insertId, title, completed: 0, updated_at: now, dirty: 1 };
};

export const updateTask = async (id, fields = {}) => {
  const allowed = ['title', 'completed', 'remote_id', 'updated_at', 'dirty'];
  const set = [];
  const params = [];
  Object.keys(fields).forEach(k => {
    if (allowed.includes(k)) {
      set.push(`${k} = ?`);
      params.push(fields[k]);
    }
  });
  if (set.length === 0) return;
  params.push(id);
  const sql = `UPDATE tasks SET ${set.join(', ')} WHERE id = ?`;
  await runSql(sql, params);
};

export const deleteTask = async (id) => {
  await runSql('DELETE FROM tasks WHERE id = ?', [id]);
};

export const getDirtyTasks = async () => {
  const res = await runSql('SELECT * FROM tasks WHERE dirty = 1');
  return res.rows._array;
};

export const findByRemoteId = async (remote_id) => {
  const res = await runSql('SELECT * FROM tasks WHERE remote_id = ? LIMIT 1', [remote_id]);
  return res.rows._array[0];
};

export default db;
