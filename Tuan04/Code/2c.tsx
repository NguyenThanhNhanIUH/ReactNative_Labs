import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [quantity, setQuantity] = useState(1);
  const [coupon, setCoupon] = useState('');

  const price = 141800;
  const total = price * quantity;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Sản phẩm */}
      <View style={styles.card}>
        <Image
          // source={{ uri: 'https://
          style={styles.productImage}
        />
        <View style={styles.info}>
          <Text style={styles.title}>Nguyên hàm tích phân và ứng dụng</Text>
          <Text style={styles.supplier}>Cung cấp bởi Tiki Trading</Text>
          <Text style={styles.price}>{price.toLocaleString()} ₫</Text>

          {/* Số lượng */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.qtyBtn}>
              <Text>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.qtyBtn}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Mã giảm giá */}
      <View style={styles.couponContainer}>
        <TextInput
          placeholder="Mã giảm giá"
          value={coupon}
          onChangeText={setCoupon}
          style={styles.input}
        />
        <TouchableOpacity style={styles.applyBtn}>
          <Text style={styles.applyText}>Áp dụng</Text>
        </TouchableOpacity>
      </View>

      {/* Tổng tiền */}
      <View style={styles.totalContainer}>
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Tạm tính</Text>
          <Text style={styles.totalPrice}>{total.toLocaleString()} ₫</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.totalLabelBold}>Thành tiền</Text>
          <Text style={styles.totalPriceBold}>{total.toLocaleString()} ₫</Text>
        </View>
      </View>

      {/* Nút đặt hàng */}
      <TouchableOpacity style={styles.orderBtn}>
        <Text style={styles.orderText}>TIẾN HÀNH ĐẶT HÀNG</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  info: {
    flex: 1,
    paddingLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  supplier: {
    fontSize: 12,
    color: '#666',
    marginVertical: 4,
  },
  price: {
    color: '#e53935',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    width: 32,
    height: 32,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  qtyText: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  couponContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  applyBtn: {
    backgroundColor: '#0b74e5',
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginLeft: 10,
    borderRadius: 4,
  },
  applyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  totalLabel: {
    color: '#333',
  },
  totalPrice: {
    color: '#e53935',
  },
  totalLabelBold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalPriceBold: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#e53935',
  },
  orderBtn: {
    backgroundColor: '#e53935',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  orderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
