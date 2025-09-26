//Bài 1
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Dữ liệu sản phẩm cục bộ (10 sản phẩm)
const products = [
  {
    id: '1',
    name: 'Cà nấu lẩu mini',
    shop: 'Shop Devang',
    image: require('./assets/images/product1.jpg'),
  },
  {
    id: '2',
    name: '1KG Khô Gà Bơ Tỏi',
    shop: 'LTD Food',
    image: require('./assets/images/product2.jpg'),
  },
  {
    id: '3',
    name: 'Xe Cân Cầu Đa Năng',
    shop: 'Thế Giới Đồ Chơi',
    image: require('./assets/images/product3.jpg'),
  },
  {
    id: '4',
    name: 'Đồ Chơi Dạng Mô Hình',
    shop: 'Thế Giới Đồ Chơi',
    image: require('./assets/images/product4.jpg'),
  },
  {
    id: '5',
    name: 'Lãnh Đạo Giản Đơn',
    shop: 'Minh Long Book',
    image: require('./assets/images/product5.jpg'),
  },
  {
    id: '6',
    name: 'Hiểu Lòng Con Trẻ',
    shop: 'Minh Long Book',
    image: require('./assets/images/product6.jpg'),
  },
  {
    id: '7',
    name: 'Sách Quản Lý Nhân Sự',
    shop: 'Minh Long Book',
    image: require('./assets/images/product1.jpg'),
  },
  {
    id: '8',
    name: 'Bộ Đồ Chơi Lego',
    shop: 'Thế Giới Đồ Chơi',
    image: require('./assets/images/product2.jpg'),
  },
  {
    id: '9',
    name: 'Cà Phê Sạch',
    shop: 'Shop Devang',
    image: require('./assets/images/product3.jpg'),
  },
  {
    id: '10',
    name: 'Sách Lập Trình JavaScript',
    shop: 'Minh Long Book',
    image: require('./assets/images/product4.jpg'),
  },
];

export default function App() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.shop}>{item.shop}</Text>
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>Chat</Text>
        <TouchableOpacity>
          <Icon name="shopping-cart" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 20 }}>
          <Icon name="bars" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
          <Icon name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'flex-end', paddingRight: 20 }}>
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00bfff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  shop: {
    color: 'gray',
  },
  btn: {
    backgroundColor: 'red',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 4,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  flatListContainer: {
    paddingBottom: 70, 
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00bfff',
    paddingVertical: 12,
  },
});