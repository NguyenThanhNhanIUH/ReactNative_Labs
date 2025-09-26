import React, { useState } from "react";
import {View,Text,TextInput,Pressable,StyleSheet,TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <Text style={styles.title}>LOGIN</Text>

      {/* Ô nhập Name */}
      <View style={styles.inputContainer}>
        <Ionicons name="person" size={20} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Ô nhập Password */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#333"
          />
        </TouchableOpacity>
      </View>

      {/* Nút Login */}
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </Pressable>

      {/* Quên mật khẩu */}
      <Text style={styles.forgot}>Forgot your password?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6a623", // nền vàng-cam
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginBottom: 25,
    paddingBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgot: {
    marginTop: 15,
    textAlign: "center",
    color: "black",
  },
});
