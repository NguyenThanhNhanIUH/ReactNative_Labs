// Simple simulated cloud API (in-memory) for demo and testing
let nextId = 1;
const cloudTasks = [];

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const pushTasksToCloud = async (tasks) => {
  // Simulate network delay
  await delay(500);
  const created = [];
  for (const t of tasks) {
    // If task has remote_id, update it; else create new
    if (t.remote_id) {
      const idx = cloudTasks.findIndex(c => c.id === t.remote_id);
      if (idx >= 0) {
        cloudTasks[idx] = { ...cloudTasks[idx], title: t.title, completed: t.completed, updated_at: Date.now() };
        created.push({ ...cloudTasks[idx] });
      } else {
        // remote_id not found -> create new
        const newItem = { id: nextId++, title: t.title, completed: t.completed, updated_at: Date.now() };
        cloudTasks.push(newItem);
        created.push(newItem);
      }
    } else {
      const newItem = { id: nextId++, title: t.title, completed: t.completed, updated_at: Date.now() };
      cloudTasks.push(newItem);
      created.push(newItem);
    }
  }
  console.log('[api] pushed', created);
  return created;
};

export const fetchAllFromCloud = async () => {
  await delay(400);
  // Return a shallow copy
  return cloudTasks.slice();
};

// Backwards compatible default
export const syncTasks = async (tasks) => {
  return pushTasksToCloud(tasks);
};