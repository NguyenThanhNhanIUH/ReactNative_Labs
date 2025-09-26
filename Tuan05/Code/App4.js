// Bài 4
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://68ce42f86dc3f350777e7a83.mockapi.io/electric';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text numberOfLines={2} style={styles.name}>
        {item.name}
      </Text>
      <Text style={styles.price}>{item.price} đ</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Icon
            key={i}
            name="star"
            size={14}
            color={i <= item.rating ? '#FFD700' : '#ccc'}
            style={{ marginRight: 2 }}
          />
        ))}
      </View>
      <Text style={{ fontSize: 12, color: '#555' }}>
       
      </Text>
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
          placeholder="sản phẩm radom :))))"
          placeholderTextColor="#666"
        />
        <TouchableOpacity>
          <Icon name="shopping-cart" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Danh sách sản phẩm */}
      {loading ? (
        <ActivityIndicator size="large" color="#00BFFF" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ padding: 10 }}
          showsVerticalScrollIndicator={false}
        />
      )}

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

