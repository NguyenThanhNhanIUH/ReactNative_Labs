import { Stack } from 'expo-router';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="taskList"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="addTask"
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}