import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, TextInput, RefreshControl } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TransactionItem from './src/components/TransactionItem';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import TrashScreen from './src/screens/TrashScreen';
import StatisticsScreen from './src/screens/StatisticsScreen';
import SyncScreen from './src/screens/SyncScreen';
import { initDatabase, getTransactions, getStatistics, deleteTransaction } from './src/services/database';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'add', 'trash', 'statistics', 'sync'
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'income', 'expense'
  const [refreshing, setRefreshing] = useState(false);
  const [statistics, setStatistics] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalTransactions: 0,
    balance: 0,
  });

  // Khởi tạo database khi app load
  useEffect(() => {
    initDB();
  }, []);

  const initDB = async () => {
    try {
      await initDatabase();
      console.log('Database initialized');
      loadData();
    } catch (error) {
      console.error('Error initializing database:', error);
      Alert.alert('Lỗi', 'Không thể khởi tạo database');
    }
  };

  const loadData = async () => {
    try {
      const [txData, statsData] = await Promise.all([
        getTransactions(),
        getStatistics(),
      ]);
      setTransactions(txData);
      setStatistics(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // Xử lý pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Lọc transactions theo search query và filter type
  const filteredTransactions = transactions.filter(transaction => {
    // Lọc theo search query
    const matchSearch = !searchQuery || transaction.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Lọc theo type
    const matchType = filterType === 'all' || transaction.type === filterType;
    
    return matchSearch && matchType;
  });

  // Navigation helper
  const [currentParams, setCurrentParams] = useState(null);
  
  const navigation = {
    navigate: (screen, params) => {
      setCurrentScreen(screen);
      setCurrentParams(params || null);
    },
    goBack: () => {
      setCurrentScreen('home');
      setCurrentParams(null); // Clear params khi quay lại
      loadData(); // Reload data khi quay lại
    }
  };

  // Xử lý khi click vào item để edit
  const handleItemPress = (item) => {
    console.log('Clicked item to edit:', item);
    navigation.navigate('add', { item });
  };

  // Xử lý khi long press để xóa
  const handleItemLongPress = async (item) => {
    try {
      await deleteTransaction(item.id);
      Alert.alert('Đã xóa', 'Giao dịch đã được chuyển vào thùng rác');
      loadData();
    } catch (error) {
      console.error('Error deleting:', error);
      Alert.alert('Lỗi', 'Không thể xóa giao dịch');
    }
  };

  // Nếu đang ở màn hình Sync
  if (currentScreen === 'sync') {
    return (
      <SafeAreaProvider>
        <SyncScreen navigation={navigation} />
      </SafeAreaProvider>
    );
  }

  // Nếu đang ở màn hình Statistics
  if (currentScreen === 'statistics') {
    return (
      <SafeAreaProvider>
        <StatisticsScreen navigation={navigation} />
      </SafeAreaProvider>
    );
  }

  // Nếu đang ở màn hình Trash
  if (currentScreen === 'trash') {
    return (
      <SafeAreaProvider>
        <TrashScreen navigation={navigation} />
      </SafeAreaProvider>
    );
  }

  // Nếu đang ở màn hình Add
  if (currentScreen === 'add') {
    return (
      <SafeAreaProvider>
        <AddTransactionScreen navigation={navigation} route={{ params: currentParams }} />
      </SafeAreaProvider>
    );
  }

  // Màn hình Home
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar style="light" />
        
        {/* Header - Tiêu đề */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.statsIconButton}
            onPress={() => navigation.navigate('statistics')}
          >
            <Text style={styles.statsIconText}>📊</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>EXPENSE TRACKER</Text>
          <TouchableOpacity 
            style={styles.trashButton}
            onPress={() => navigation.navigate('trash')}
          >
            <Text style={styles.trashIcon}>🗑️</Text>
          </TouchableOpacity>
        </View>

        {/* Nội dung chính */}
        <ScrollView 
          style={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#6200EA']}
              tintColor="#6200EA"
            />
          }
        >
          {/* Thống kê tổng quan */}
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Tổng quan tài chính</Text>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Tổng thu</Text>
                <Text style={[styles.statValue, styles.income]}>
                  {formatCurrency(statistics.totalIncome)}
                </Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Tổng chi</Text>
                <Text style={[styles.statValue, styles.expense]}>
                  {formatCurrency(statistics.totalExpense)}
                </Text>
              </View>
            </View>
            <View style={styles.balanceCard}>
              <Text style={styles.balanceLabel}>Số dư</Text>
              <Text style={[styles.balanceValue, { color: statistics.balance >= 0 ? '#4CAF50' : '#F44336' }]}>
                {formatCurrency(statistics.balance)}
              </Text>
            </View>
          </View>

          {/* Nút hành động */}
          <View style={styles.actionButtons}>
            {/* Nút Add - Chuyển sang màn hình thêm */}
            <TouchableOpacity 
              style={[styles.button, styles.addButton]}
              onPress={() => navigation.navigate('add')}
            >
              <Text style={styles.buttonText}>➕ Add</Text>
            </TouchableOpacity>
            
            {/* Nút Sync */}
            <TouchableOpacity 
              style={[styles.button, styles.syncButton]}
              onPress={() => navigation.navigate('sync')}
            >
              <Text style={styles.buttonText}>🔄 Đồng bộ</Text>
            </TouchableOpacity>
          </View>

          {/* Thanh tìm kiếm */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm giao dịch..."
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

          {/* Thanh filter theo loại */}
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.filterButton, filterType === 'all' && styles.filterButtonActive]}
              onPress={() => setFilterType('all')}
            >
              <Text style={[styles.filterText, filterType === 'all' && styles.filterTextActive]}>
                Tất cả
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filterType === 'income' && styles.filterButtonActive]}
              onPress={() => setFilterType('income')}
            >
              <Text style={[styles.filterText, filterType === 'income' && styles.filterTextActive]}>
                Thu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filterType === 'expense' && styles.filterButtonActive]}
              onPress={() => setFilterType('expense')}
            >
              <Text style={[styles.filterText, filterType === 'expense' && styles.filterTextActive]}>
                Chi
              </Text>
            </TouchableOpacity>
          </View>

          {/* Danh sách giao dịch */}
          <View style={styles.transactionSection}>
            <Text style={styles.sectionTitle}>
              Giao dịch gần đây {searchQuery && `(${filteredTransactions.length})`}
            </Text>
            
            {filteredTransactions.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>
                  {searchQuery ? 'Không tìm thấy giao dịch' : 'Chưa có giao dịch nào'}
                </Text>
                <Text style={styles.emptySubText}>
                  {searchQuery ? 'Thử từ khóa khác' : 'Nhấn "Add" để bắt đầu'}
                </Text>
              </View>
            ) : (
              filteredTransactions.map((transaction) => (
                <TransactionItem 
                  key={transaction.id} 
                  item={transaction} 
                  onPress={handleItemPress}
                  onLongPress={handleItemLongPress}
                />
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#6200EA',
    paddingVertical: 20,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  statsIconButton: {
    padding: 8,
  },
  statsIconText: {
    fontSize: 24,
  },
  trashButton: {
    padding: 8,
  },
  trashIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  income: {
    color: '#4CAF50',
  },
  expense: {
    color: '#F44336',
  },
  balanceCard: {
    backgroundColor: '#E8EAF6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EA',
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  addButton: {
    backgroundColor: '#6200EA',
  },
  syncButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
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
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    gap: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  filterButtonActive: {
    backgroundColor: '#6200EA',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
  },
  transactionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    elevation: 1,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
  },
});
