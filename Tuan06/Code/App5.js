//Bai05
import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

// ----- Screens -----
function HomeScreen() {
  return (
    <View style={styles.center}>
      <Ionicons name="home-outline" size={40} color="#2f6fd8" />
      <Text style={styles.title}>Welcome to Home</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.center}>
      <Ionicons name="person-circle-outline" size={60} color="#2f6fd8" />
      <Text style={styles.title}>Nguyễn Văn A</Text>
      <Text style={{ color: "#666" }}>Email: nguyenvana@example.com</Text>
    </View>
  );
}

function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notif, setNotif] = useState(true);

  // dark mode đổi theme
  const backgroundColor = darkMode ? "#000" : "#fff";
  const textColor = darkMode ? "#fff" : "#000";

  return (
    <View style={[styles.screen, { backgroundColor }]}>
      <View style={styles.option}>
        <Text style={[styles.optText, { color: textColor }]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
      <View style={styles.option}>
        <Text style={[styles.optText, { color: textColor }]}>Notifications</Text>
        <Switch value={notif} onValueChange={setNotif} />
      </View>
    </View>
  );
}

// ----- Main App -----
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerActiveTintColor: "#2f6fd8",
          drawerLabelStyle: { fontSize: 16 },
          headerStyle: { backgroundColor: "#2f6fd8" },
          headerTintColor: "#fff",
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// ----- Styles -----
const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  screen: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },
  optText: { fontSize: 16 },
});
