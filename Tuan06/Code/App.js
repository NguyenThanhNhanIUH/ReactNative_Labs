//Bai01
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const data = {
//   name: 'Điện Thoại Vsmart Joy 3 - Hàng chính hãng',
//   price: '1.790.000 đ',
//   oldPrice: '1.790.000 đ',
//   provider: 'Cung cấp bởi Tiki Tradding',
//   colors: [
//     {
//       name: 'Xanh',
//       code: '#00BCD4',
//       image: require('./assets/images/CyanPhone.PNG'),
//     },
//     {
//       name: 'Đỏ',
//       code: '#F44336',
//       image: require('./assets/images/RedPhone.PNG'),
//     },
//     {
//       name: 'Đen',
//       code: '#000000',
//       image: require('./assets/images/BlackPhone.PNG'),
//     },
//     {
//       name: 'Trắng',
//       code: '#FFFFFF',
//       image: require('./assets/images/WhitePhone.PNG'),
//     },
//   ],
// };

// // ----------------- Screen 1 -----------------
// const Screen1 = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Image source={data.colors[0].image} style={styles.phoneImage} />
//       <Text style={styles.title}>{data.name}</Text>
//       <Text style={[styles.price, { color: 'red', fontWeight: 'bold' }]}>
//         {data.price}
//       </Text>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate('Chọn màu')}>
//         <Text style={styles.buttonText}>4 MÀU - CHỌN LOẠI</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.button, { backgroundColor: 'red', marginTop: 10 }]}
//         onPress={() => Alert.alert('Thông báo', 'Đã mua sản phẩm thành công!')}>
//         <Text style={styles.buttonText}>CHỌN MUA</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// // ----------------- Screen 2-3 -----------------
// const Screen2_3 = ({ navigation }) => {
//   const [selected, setSelected] = useState(null);

//   return (
//     <View style={styles.container}>
//       {/* Ảnh điện thoại */}
//       <Image
//         source={
//           selected !== null ? data.colors[selected].image : data.colors[0].image
//         }
//         style={styles.phoneImage}
//       />

//       {/* Nếu chọn màu thì hiện thêm thông tin */}
//       {selected !== null && (
//         <>
//           <Text style={styles.title}>{data.name}</Text>
//           <Text style={styles.provider}>{data.provider}</Text>

//           <Text style={[styles.price, { color: 'red', fontWeight: 'bold' }]}>
//             {' '}
//             {data.price}
//           </Text>
//         </>
//       )}

//       {/* Chọn màu */}
//       <Text style={styles.subTitle}>Chọn một màu bên dưới:</Text>
//       <View style={styles.colorList}>
//         {data.colors.map((c, i) => (
//           <TouchableOpacity
//             key={i}
//             style={[
//               styles.colorBox,
//               {
//                 backgroundColor: c.code,
//                 borderWidth: selected === i ? 3 : 0,
//               },
//             ]}
//             onPress={() => setSelected(i)}
//           />
//         ))}
//       </View>

//       {/* Nút XONG */}
//       {selected !== null && (
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate('Hoàn Thành', { selected })}>
//           <Text style={styles.buttonText}>XONG</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// // ----------------- Screen 4 -----------------
// const Screen4 = ({ route }) => {
//   const selected = route.params?.selected ?? 0;
//   const [bought, setBought] = useState(false); // trạng thái đã mua

//   return (
//     <View style={styles.container}>
//       <Image source={data.colors[selected].image} style={styles.phoneImage} />
//       <Text style={styles.title}>{data.name}</Text>
//       <Text style={{ fontSize: 14 }}>Màu: {data.colors[selected].name}</Text>
//       <Text style={styles.provider}>{data.provider}</Text>
//       <Text style={[styles.price, { color: 'red', fontWeight: 'bold' }]}>
//         {data.price}
//       </Text>

//       {!bought ? (
//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: 'red', marginTop: 10 }]}
//           onPress={() => setBought(true)}>
//           <Text style={styles.buttonText}>CHỌN MUA</Text>
//         </TouchableOpacity>
//       ) : (
//         <View style={{ alignItems: 'center', marginTop: 20 }}>
//           {/* Vòng tròn xanh + dấu tích */}
//           <View
//             style={{
//               width: 60,
//               height: 60,
//               borderRadius: 30,
//               backgroundColor: 'green',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold' }}>
//               ✓
//             </Text>
//           </View>
//           {/* Dòng chữ mua thành công */}
//           <Text
//             style={{
//               marginTop: 10,
//               fontSize: 16,
//               fontWeight: 'bold',
//               color: 'green',
//             }}>
//             Mua thành công
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: true }}>
//         <Stack.Screen name="Trang chủ" component={Screen1} />
//         <Stack.Screen name="Chọn màu" component={Screen2_3} />
//         <Stack.Screen name="Hoàn Thành" component={Screen4} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// // ----------------- Styles -----------------
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ddd',
//     alignItems: 'center',
//     padding: 20,
//   },
//   phoneImage: { width: 200, height: 300, resizeMode: 'contain' },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginVertical: 10,
//     textAlign: 'center',
//   },
//   provider: { fontSize: 12, marginBottom: 5 },
//   price: { fontSize: 18, color: 'red', marginBottom: 10 },
//   subTitle: { fontSize: 14, marginVertical: 10 },
//   colorList: { flexDirection: 'row', marginBottom: 20 },
//   colorBox: {
//     width: 40,
//     height: 40,
//     margin: 5,
//     borderRadius: 5,
//     borderColor: 'blue',
//   },
//   button: {
//     backgroundColor: 'blue',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 8,
//   },
//   buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
// });


//Bai03
import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons as Icon } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

// ----- Screen Home -----
function HomeScreen() {
  const data = [
    { id: '1', name: 'iPhone 15 Pro Max' },
    { id: '2', name: 'Samsung Galaxy S24' },
    { id: '3', name: 'Xiaomi 14 Ultra' },
    { id: '4', name: 'Oppo Find N3' },
    { id: '5', name: 'Vivo X100 Pro' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách sản phẩm</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Icon name="phone-portrait-outline" size={24} color="#4A90E2" />
            <Text style={styles.item}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

// ----- Screen Search -----
function SearchScreen() {
  const [keyword, setKeyword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tìm kiếm</Text>
      <View style={styles.searchBox}>
        <Icon name="search-outline" size={20} color="#aaa" />
        <TextInput
          style={styles.input}
          placeholder="Nhập từ khóa..."
          value={keyword}
          onChangeText={setKeyword}
        />
      </View>
      <Text style={{ marginTop: 15, fontSize: 16, color: '#666' }}>
        Kết quả tìm kiếm cho:{' '}
        <Text style={{ fontWeight: 'bold', color: '#333' }}>{keyword}</Text>
      </Text>
    </View>
  );
}

// ----- Screen Profile -----
function ProfileScreen() {
  return (
    <View style={styles.profileContainer}>
      <Image
        source={{
          uri: 'https://i.pinimg.com/736x/19/27/46/192746d87d83a9ccdc624bcb32d56800.jpg',
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Mr.Cat Coding</Text>
      <Text style={styles.desc}>Mobile Developer</Text>
    </View>
  );
}

// ----- Main App -----
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 65,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: '#4A90E2',
          tabBarInactiveTintColor: '#aaa',
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Search') {
              iconName = 'search-outline';
            } else if (route.name === 'Profile') {
              iconName = 'person-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// ----- Styles -----
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', paddingTop: 40, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#333' },

  // Home
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  item: { marginLeft: 10, fontSize: 16, color: '#333' },

  // Search
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },

  // Profile

  profileContainer: {
    // flex: 1,
    paddingTop: 100,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f9f9f9',
    padding: 20,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#4A90E2',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  desc: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
});