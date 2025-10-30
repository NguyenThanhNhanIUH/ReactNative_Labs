import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Screen2() {
  const router = useRouter();

  const tasks = [
    { id: '1', text: 'To check email', completed: true },
    { id: '2', text: 'UI task web page', completed: true },
    { id: '3', text: 'Learn javascript basic', completed: true },
    { id: '4', text: 'Learn HTML Advance', completed: true },
    { id: '5', text: 'Medical App UI', completed: true },
    { id: '6', text: 'Learn Java', completed: true },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Ionicons name="person-circle" size={40} color="#666" />
          </View>
          <View>
            <Text style={styles.profileName}>Hi Twinkle</Text>
            <Text style={styles.profileSubtitle}>Have agrate day a head</Text>
          </View>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#666"
        />
      </View>

      {tasks.map((task) => (
        <TouchableOpacity 
          key={task.id}
          style={styles.taskItem}
          onPress={() => router.push('/screen3')}
        >
          <View style={styles.taskLeft}>
            <View style={styles.checkbox}>
              <Ionicons name="checkmark" size={16} color="#fff" />
            </View>
            <Text style={styles.taskText}>{task.text}</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="pencil" size={20} color="#FF0000" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('/screen3')}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  taskText: {
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#00BCD4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});