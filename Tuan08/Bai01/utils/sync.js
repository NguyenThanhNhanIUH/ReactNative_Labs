import { fetchAllFromCloud, pushTasksToCloud } from './api';
import * as db from './db';

// High-level sync: push local dirty tasks, then pull cloud tasks and merge
export const doSync = async () => {
  try {
    await db.initDB();
    // 1) push local dirty tasks
    const dirty = await db.getDirtyTasks();
    if (dirty.length > 0) {
      // Map local rows to push format
      const toPush = dirty.map(d => ({
        title: d.title,
        completed: d.completed,
        remote_id: d.remote_id || null,
        local_id: d.id,
      }));

      const pushed = await pushTasksToCloud(toPush);

      // pushed[] correspond to created/updated remote tasks; try to mark local as synced
      for (let i = 0; i < pushed.length; i++) {
        const remote = pushed[i];
        const local = dirty[i];
        if (local) {
          await db.updateTask(local.id, { remote_id: remote.id, dirty: 0, updated_at: remote.updated_at });
        }
      }
    }

    // 2) fetch all cloud tasks and merge into local DB
    const cloud = await fetchAllFromCloud();
    for (const c of cloud) {
      const existing = await db.findByRemoteId(c.id);
      if (!existing) {
        // insert into local via addTask-like call and mark not dirty
        // we preserve remote_id and updated_at
        const item = await db.addTask(c.title);
        // update item to set remote_id, dirty=0, updated_at
        await db.updateTask(item.id, { remote_id: c.id, dirty: 0, updated_at: c.updated_at || Date.now() });
      } else {
        // Optionally update local if cloud is newer
        // For demo, we'll skip complex conflict resolution
      }
    }

    return true;
  } catch (err) {
    console.error('[sync] failed', err);
    return false;
  }
};

export default { doSync };
