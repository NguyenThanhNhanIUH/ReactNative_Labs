//Bai02
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const API_URL = 'https://68ce42f86dc3f350777e7a83.mockapi.io/products';

// ----------------- Screen 1 -----------------
const Screen1 = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        setData(json[0]); // lấy sản phẩm đầu tiên
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <View style={styles.container}>
      <Image source={{ uri: data.colors[0].image }} style={styles.phoneImage} />
      <Text style={styles.title}>{data.name}</Text>
      <Text style={[styles.price, { color: 'red', fontWeight: 'bold' }]}>
        {data.price}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Chọn màu', { data })}>
        <Text style={styles.buttonText}>4 MÀU - CHỌN LOẠI</Text>
      </TouchableOpacity>
    </View>
  );
};

// ----------------- Screen 2-3 -----------------
const Screen2_3 = ({ navigation, route }) => {
  const { data } = route.params;
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            selected !== null
              ? data.colors[selected].image
              : data.colors[0].image,
        }}
        style={styles.phoneImage}
      />

      {selected !== null && (
        <>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.provider}>{data.provider}</Text>
          <Text style={[styles.price, { color: 'red', fontWeight: 'bold' }]}>
            {data.price}
          </Text>
        </>
      )}

      <Text style={styles.subTitle}>Chọn một màu bên dưới:</Text>
      <View style={styles.colorList}>
        {data.colors.map((c, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.colorBox,
              {
                backgroundColor: c.code,
                borderWidth: selected === i ? 3 : 0,
              },
            ]}
            onPress={() => setSelected(i)}
          />
        ))}
      </View>

      {selected !== null && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Hoàn Thành', { data, selected })}>
          <Text style={styles.buttonText}>XONG</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// ----------------- Screen 4 -----------------
const Screen4 = ({ route }) => {
  const { data, selected } = route.params;
  const [bought, setBought] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: data.colors[selected].image }}
        style={styles.phoneImage}
      />
      <Text style={styles.title}>{data.name}</Text>
      <Text style={{ fontSize: 14 }}>Màu: {data.colors[selected].name}</Text>
      <Text style={styles.provider}>{data.provider}</Text>
      <Text style={[styles.price, { color: 'red', fontWeight: 'bold' }]}>
        {data.price}
      </Text>

      {!bought ? (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red', marginTop: 10 }]}
          onPress={() => setBought(true)}>
          <Text style={styles.buttonText}>CHỌN MUA</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold' }}>
              ✓
            </Text>
          </View>
          <Text
            style={{
              marginTop: 10,
              fontSize: 16,
              fontWeight: 'bold',
              color: 'green',
            }}>
            Mua thành công
          </Text>
        </View>
      )}
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Trang chủ" component={Screen1} />
        <Stack.Screen name="Chọn màu" component={Screen2_3} />
        <Stack.Screen name="Hoàn Thành" component={Screen4} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ----------------- Styles -----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    padding: 20,
  },
  phoneImage: { width: 200, height: 300, resizeMode: 'contain' },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  provider: { fontSize: 12, marginBottom: 5 },
  price: { fontSize: 18, color: 'red', marginBottom: 10 },
  subTitle: { fontSize: 14, marginVertical: 10 },
  colorList: { flexDirection: 'row', marginBottom: 20 },
  colorBox: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 5,
    borderColor: 'blue',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});
