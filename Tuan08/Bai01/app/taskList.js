import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as db from '../utils/db';
import { doSync } from '../utils/sync';

export default function TaskList() {
  const { userName } = useLocalSearchParams();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await db.initDB();
      await refresh();

      // Nếu chưa có dữ liệu, khởi tạo sample tasks để tiện demo
      try {
        const rows = await db.getTasks();
        if (!rows || rows.length === 0) {
          const samples = [
            'To check email',
            'UI task web page',
            'Learn javascript basic',
            'Learn HTML Advance',
            'Medical App UI',
            'Learn Java'
          ];
          for (const s of samples) {
            await db.addTask(s);
          }
          await refresh();
        }
      } catch (e) {
        console.warn('Seeding sample data failed', e);
      }

      // try background sync on start
      try {
        await doSync();
        await refresh();
      } catch (e) {
        console.warn('Initial sync failed', e);
      }
    })();
  }, []);

  const refresh = async () => {
    const rows = await db.getTasks();
    setTasks(rows);
  };

  const toggleTask = async (id, completed) => {
    setIsLoading(true);
    try {
      await db.updateTask(id, { completed: completed ? 0 : 1, dirty: 1, updated_at: Date.now() });
      await refresh();
      await handleSync();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSync = async () => {
    setIsLoading(true);
    try {
      await doSync();
      await refresh();
    } catch (err) {
      console.error('Sync error', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hi {userName}</Text>
          <Text style={styles.subGreeting}>Have a great day ahead!</Text>
        </View>

        <TouchableOpacity onPress={handleSync} style={{ padding: 10 }}>
          {isLoading ? <ActivityIndicator /> : <Text style={{ color: '#00bfff' }}>SYNC</Text>}
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
        />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.taskItem}
            onPress={() => toggleTask(item.id, item.completed)}
          >
            <View style={styles.taskContent}>
              <View style={[styles.checkbox, item.completed && styles.checked]}>
                {item.completed ? <Text style={styles.checkmark}>✓</Text> : null}
              </View>
              <Text style={[styles.taskText, item.completed && styles.completedTask]}>
                {item.title}
              </Text>
              {item.dirty ? <Text style={styles.syncPending}>↻</Text> : null}
            </View>
            <TouchableOpacity>
              <Text style={styles.editButton}>✎</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/addTask')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  searchContainer: {
    padding: 15,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  taskItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00bfff',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#00bfff',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  editButton: {
    fontSize: 20,
    color: '#00bfff',
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00bfff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff',
  },
  syncPending: {
    marginLeft: 10,
    color: '#ff9500',
    fontSize: 18,
  },
});