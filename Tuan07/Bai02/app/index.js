import { Stack, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Screen1() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
      />
      
      <View style={styles.notepadContainer}>
        <Ionicons name="document-text" size={100} color="#FFD700" />
      </View>

      <Text style={styles.title}>MANAGE YOUR</Text>
      <Text style={styles.title}>TASK</Text>

      <View style={styles.notepadContainer}>
        <Ionicons name="document-text" size={100} color="#FFD700" />
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/screen2')}
      >
        <Text style={styles.buttonText}>GET STARTED →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  notepadContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B5CF6',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#00BCD4',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    position: 'absolute',
    bottom: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});