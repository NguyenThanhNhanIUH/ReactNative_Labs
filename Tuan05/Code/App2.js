// Bài 2
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const products = [
  {
    id: '1',
    name: 'Cáp chuyển USB 1',
    image: require('./assets/images/picture7.jpg'),
    price: '69.900 đ',
  },
  {
    id: '2',
    name: 'Cáp chuyển USB 2',
    image: require('./assets/images/picture8.jpg'),
    price: '69.900 đ',
  },
  {
    id: '3',
    name: 'Cáp chuyển USB 3',
    image: require('./assets/images/picture9.jpg'),
    price: '69.900 đ',
  },
  {
    id: '4',
    name: 'Cáp chuyển USB 4',
    image: require('./assets/images/picture10.jpg'),
    price: '69.900 đ',
  },
  {
    id: '5',
    name: 'Cáp chuyển USB 5',
    image: require('./assets/images/picture11.jpg'),
    price: '69.900 đ',
  },
  {
    id: '6',
    name: 'Cáp chuyển USB 6',
    image: require('./assets/images/picture12.jpg'),
    price: '69.900 đ',
  },
];

export default function App() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text numberOfLines={2} style={styles.name}>
        {item.name}
      </Text>
      <Text style={styles.price}>{item.price}</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Icon
            key={i}
            name="star"
            size={14}
            color="#FFD700"
            style={{ marginRight: 2 }}
          />
        ))}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Dây cáp usb"
          placeholderTextColor="#666"
        />
        <TouchableOpacity>
          <Icon name="shopping-cart" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ padding: 10 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity>
          <Icon name="bars" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="home" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="user" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00BFFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 35,
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 8,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 14,
    marginVertical: 5,
  },
  price: {
    color: 'red',
    fontWeight: 'bold',
  },
  stars: {
    flexDirection: 'row',
    marginTop: 4,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#00BFFF',
    paddingVertical: 10,
  },
});
