import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Screen3() {
  const router = useRouter();

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

      <Text style={styles.title}>ADD YOUR JOB</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Input your job"
          placeholderTextColor="#666"
        />

        <TouchableOpacity style={styles.finishButton}>
          <Text style={styles.finishButtonText}>FINISH →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.notepadContainer}>
        <Ionicons name="document-text" size={100} color="#FFD700" />
      </View>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
  },
  inputContainer: {
    gap: 15,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  finishButton: {
    backgroundColor: '#00BCD4',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notepadContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
});