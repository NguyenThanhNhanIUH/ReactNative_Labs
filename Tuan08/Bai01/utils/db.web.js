// Web fallback for DB: use localStorage to persist tasks for demo purposes.
const STORAGE_KEY = 'tasks_v1';

const read = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.warn('[db.web] read error', e);
    return [];
  }
};

const write = (arr) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch (e) {
    console.warn('[db.web] write error', e);
  }
};

export const initDB = async () => {
  const cur = read();
  if (!cur) write([]);
};

export const getTasks = async () => {
  const rows = read();
  // ensure numeric id and sort desc
  return rows.sort((a,b)=> (b.id||0) - (a.id||0));
};

let nextId = Date.now();

export const addTask = async (title) => {
  const rows = read();
  const item = { id: ++nextId, title, completed: 0, remote_id: null, updated_at: Date.now(), dirty: 1 };
  rows.unshift(item);
  write(rows);
  return item;
};

export const updateTask = async (id, fields = {}) => {
  const rows = read();
  const idx = rows.findIndex(r => r.id === id || String(r.id) === String(id));
  if (idx === -1) return;
  rows[idx] = { ...rows[idx], ...fields };
  write(rows);
};

export const deleteTask = async (id) => {
  let rows = read();
  rows = rows.filter(r => !(r.id === id || String(r.id) === String(id)));
  write(rows);
};

export const getDirtyTasks = async () => {
  const rows = read();
  return rows.filter(r => r.dirty === 1 || r.dirty === true);
};

export const findByRemoteId = async (remote_id) => {
  const rows = read();
  return rows.find(r => r.remote_id === remote_id) || null;
};

// Minimal runSql mimic for compatibility (not a real SQL engine)
export const runSql = async (sql, params=[]) => {
  // Provide no-op compatibility
  console.warn('[db.web] runSql called - no-op for web fallback', sql, params);
  return { rows: { _array: [] }, insertId: null };
};

export default null;
