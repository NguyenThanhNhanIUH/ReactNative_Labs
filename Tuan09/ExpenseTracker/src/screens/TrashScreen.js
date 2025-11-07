import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDeletedTransactions, restoreTransaction } from '../services/database';

const TrashScreen = ({ navigation }) => {
  const [deletedItems, setDeletedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDeletedItems();
  }, []);

  const loadDeletedItems = async () => {
    try {
      const items = await getDeletedTransactions();
      setDeletedItems(items);
    } catch (error) {
      console.error('Error loading deleted items:', error);
      Alert.alert('Lỗi', 'Không thể tải danh sách đã xóa');
    }
  };

  // Xử lý pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await loadDeletedItems();
    setRefreshing(false);
  };

  // Lọc deleted items theo search query
  const filteredItems = deletedItems.filter(item => {
    if (!searchQuery) return true;
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleRestore = async (item) => {
    Alert.alert(
      'Khôi phục',
      `Bạn có muốn khôi phục "${item.title}"?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Khôi phục',
          onPress: async () => {
            try {
              await restoreTransaction(item.id);
              Alert.alert('Thành công', 'Đã khôi phục giao dịch');
              loadDeletedItems();
            } catch (error) {
              console.error('Error restoring:', error);
              Alert.alert('Lỗi', 'Không thể khôi phục');
            }
          }
        }
      ]
    );
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const renderItem = ({ item }) => {
    const isIncome = item.type === 'income';
    
    // Xử lý long press để khôi phục
    const handleLongPress = () => {
      Alert.alert(
        'Khôi phục giao dịch',
        `Bạn có muốn khôi phục "${item.title}"?`,
        [
          {
            text: 'Hủy',
            style: 'cancel'
          },
          {
            text: 'Khôi phục',
            onPress: () => handleRestore(item)
          }
        ]
      );
    };
    
    return (
      <TouchableOpacity 
        style={styles.itemContainer}
        onLongPress={handleLongPress}
        activeOpacity={0.7}
      >
        <View style={[
          styles.indicator,
          { backgroundColor: isIncome ? '#4CAF50' : '#F44336' }
        ]} />
        
        <View style={styles.itemContent}>
          <View style={styles.topRow}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={[
              styles.typeBadge,
              { backgroundColor: isIncome ? '#E8F5E9' : '#FFEBEE' }
            ]}>
              <Text style={[
                styles.typeText,
                { color: isIncome ? '#4CAF50' : '#F44336' }
              ]}>
                {isIncome ? 'Thu' : 'Chi'}
              </Text>
            </View>
          </View>
          
          <Text style={[
            styles.amount,
            { color: isIncome ? '#4CAF50' : '#F44336' }
          ]}>
            {isIncome ? '+' : '-'} {formatMoney(item.amount)}
          </Text>
          
          <Text style={styles.date}>📅 {formatDate(item.createdAt)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {searchQuery ? 'Không tìm thấy' : 'Thùng rác trống'}
      </Text>
      <Text style={styles.emptySubText}>
        {searchQuery ? 'Thử từ khóa khác' : 'Các giao dịch đã xóa sẽ hiện ở đây'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thùng rác</Text>
        <View style={{ width: 80 }} />
      </View>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm trong thùng rác..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#6200EA']}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#6200EA',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 80,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  clearIcon: {
    fontSize: 20,
    color: '#999',
    paddingHorizontal: 8,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: 'hidden',
    opacity: 0.7,
  },
  indicator: {
    width: 5,
  },
  itemContent: {
    flex: 1,
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 13,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
  },
});

export default TrashScreen;
