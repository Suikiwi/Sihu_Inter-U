import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { loginUser } from "../api"; // 

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const token = await loginUser(email, password);
      if (token) {
        Alert.alert("Bienvenido", "Inicio de sesión exitoso");
        router.replace("/"); // o /home si ya tienes esa pantalla
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Credenciales inválidas o cuenta no activada.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#2B0057" },
  title: { fontSize: 28, color: "white", marginBottom: 20, textAlign: "center" },
  input: { backgroundColor: "white", marginBottom: 15, padding: 10, borderRadius: 5 },
  button: { backgroundColor: "#8A4FFF", padding: 15, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "bold" },
});
