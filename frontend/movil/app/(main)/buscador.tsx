import React, { useState } from "react";
import { 
  View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet 
} from "react-native";

export default function BuscadorScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = () => {
    // 🔍 Aquí simulas resultados, luego lo conectas a tu API
    const mockData = [
      "Proyecto de Redes",
      "Automatización Industrial",
      "Desarrollo de Software",
      "UX/UI",
      "Inteligencia Artificial",
    ];

    const filtered = mockData.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscador</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe tu búsqueda..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultText}>🔎 {item}</Text>
          </View>
        )}
        ListEmptyComponent={
          query.length > 0 ? (
            <Text style={styles.noResults}>No se encontraron resultados</Text>
          ) : (
            <Text style={styles.noResults}>Empieza a escribir para buscar</Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A1A2E", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#8A4FFF", marginBottom: 20 },
  input: {
    backgroundColor: "#2E2E48",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#8A4FFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  resultItem: {
    backgroundColor: "#2E2E48",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  resultText: { color: "#fff", fontSize: 16 },
  noResults: { color: "#aaa", textAlign: "center", marginTop: 20 },
});
