import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function App() {
  const [rating, setRating] = useState(5);

  return (
    <View style={styles.container}>
      {/* Sản phẩm */}
      <View style={styles.productBox}>
        <Image
          source={{ uri: "https://via.placeholder.com/60" }}
          style={{ width: 60, height: 60, marginRight: 10 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.productTitle}>USB Bluetooth Music Receiver</Text>
          <Text style={{ fontSize: 12 }}>
            HX-001 - Biến loa thường thành loa bluetooth
          </Text>
        </View>
      </View>

      {/* Đánh giá */}
      <Text style={styles.satisfaction}>Cực kỳ hài lòng</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity key={i} onPress={() => setRating(i)}>
            <Icon
              name="star"
              size={32}
              color={i <= rating ? "#FFD700" : "#ccc"}
              style={{ marginHorizontal: 4 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Nút thêm hình ảnh */}
      <TouchableOpacity style={styles.addImage}>
        <Icon name="camera" size={20} color="#000" />
        <Text style={{ marginLeft: 8 }}>Thêm hình ảnh</Text>
      </TouchableOpacity>

      {/* Ô nhập ý kiến */}
      <TextInput
        style={styles.input}
        placeholder="Hãy chia sẻ những điều mà bạn thích về sản phẩm"
        multiline
      />

      {/* Link */}
      <Text style={{ color: "blue", marginBottom: 20 }}>
        https://meet.google.com/msg-qlw-zpp
      </Text>

      {/* Nút gửi */}
      <TouchableOpacity style={styles.sendBtn}>
        <Text style={{ color: "#fff", fontSize: 16 }}>Gửi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  productBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  productTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },
  satisfaction: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 8,
  },
  stars: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  addImage: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  sendBtn: {
    backgroundColor: "#1976d2",
    padding: 12,
    alignItems: "center",
    borderRadius: 6,
  },
});