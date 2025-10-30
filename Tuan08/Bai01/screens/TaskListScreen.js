import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('tasks.db');

export default function TaskListScreen({ route, navigation }) {
  const { userName } = route.params;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER);'
      );
    });
    loadTasks();
  }, []);

  const loadTasks = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM tasks', [], (_, { rows: { _array } }) => {
        setTasks(_array);
      });
    });
  };

  const toggleTask = (id, completed) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE tasks SET completed = ? WHERE id = ?',
        [completed ? 0 : 1, id],
        () => loadTasks()
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi {userName}</Text>
        <Text style={styles.subGreeting}>Have agreat day a head!</Text>
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
                {item.completed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={[styles.taskText, item.completed && styles.completedTask]}>
                {item.title}
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.editButton}>✎</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask', { onGoBack: loadTasks })}
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
});