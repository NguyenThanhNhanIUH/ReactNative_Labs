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