import * as SQLite from 'expo-sqlite';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const db = SQLite.openDatabase('tasks.db');

export default function AddTaskScreen({ navigation, route }) {
  const [taskTitle, setTaskTitle] = useState('');

  const addTask = () => {
    if (taskTitle.trim()) {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO tasks (title, completed) VALUES (?, 0)',
          [taskTitle],
          (_, result) => {
            if (route.params?.onGoBack) {
              route.params.onGoBack();
            }
            navigation.goBack();
          }
        );
      });
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

      <Image
        source={require('../assets/notes.png')}
        style={styles.image}
        resizeMode="contain"
      />
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
  image: {
    width: '100%',
    height: 200,
    marginTop: 40,
  },
});