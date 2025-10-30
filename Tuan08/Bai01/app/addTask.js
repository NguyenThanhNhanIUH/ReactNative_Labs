import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as db from '../utils/db';
import { doSync } from '../utils/sync';

export default function AddTask() {
  const [taskTitle, setTaskTitle] = useState('');

  const addTask = async () => {
    if (taskTitle.trim()) {
      try {
        await db.initDB();
        await db.addTask(taskTitle);
        // Try sync in background
        doSync().catch(e => console.warn('Background sync failed', e));
      } catch (err) {
        console.error('Add failed', err);
      }
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADD YOUR JOB</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Input your job"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={addTask}
      >
        <Text style={styles.buttonText}>FINISH →</Text>
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>📝</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00bfff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    width: '100%',
    height: 200,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 72,
  },
});