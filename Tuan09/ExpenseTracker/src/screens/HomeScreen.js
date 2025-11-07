import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionItem from '../components/TransactionItem';
import StatisticsCard from '../components/StatisticsCard';
import {
  getTransactions,
  deleteTransaction,
  getStatistics,
} from '../services/database';
import { syncToAPI, deleteTransactionFromAPI } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalTransactions: 0,
    balance: 0,
  });
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [transactionsData, statsData] = await Promise.all([
        getTransactions(),
        getStatistics(),
      ]);
      setTransactions(transactionsData);
      setStatistics(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Lỗi', 'Không thể tải dữ liệu');
    }
  }, []);

  useEffect(() => {
    loadData();
    
    // Reload khi quay lại màn hình
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation, loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const handleDelete = async (id) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa giao dịch này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTransaction(id);
              await loadData();
              Alert.alert('Thành công', 'Đã xóa giao dịch');
            } catch (error) {
              console.error('Error deleting transaction:', error);
              Alert.alert('Lỗi', 'Không thể xóa giao dịch');
            }
          },
        },
      ]
    );
  };

  const handleEdit = (transaction) => {
    navigation.navigate('AddTransaction', { transaction });
  };

  const handleSync = async () => {
    try {
      Alert.alert('Đồng bộ', 'Đang đồng bộ dữ liệu lên server...');
      const unsyncedTransactions = transactions.filter(t => !t.synced);
      
      if (unsyncedTransactions.length === 0) {
        Alert.alert('Thông báo', 'Tất cả dữ liệu đã được đồng bộ');
        return;
      }

      await syncToAPI(unsyncedTransactions);
      await loadData();
      Alert.alert('Thành công', `Đã đồng bộ ${unsyncedTransactions.length} giao dịch`);
    } catch (error) {
      console.error('Error syncing:', error);
      Alert.alert('Lỗi', 'Không thể đồng bộ dữ liệu. Kiểm tra kết nối mạng.');
    }
  };

  const renderHeader = () => (
    <>
      <StatisticsCard statistics={statistics} />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.actionButton, styles.addButton]}
          onPress={() => navigation.navigate('AddTransaction')}
        >
          <Text style={styles.buttonText}>+ Thêm giao dịch</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.syncButton]}
          onPress={handleSync}
        >
          <Text style={styles.buttonText}>🔄 Đồng bộ</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Giao dịch gần đây</Text>
    </>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Chưa có giao dịch nào</Text>
      <Text style={styles.emptySubText}>Nhấn "Thêm giao dịch" để bắt đầu</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EXPENSE TRACKER</Text>
      </View>
      
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
    paddingVertical: 20,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addButton: {
    backgroundColor: '#6200EA',
  },
  syncButton: {
    backgroundColor: '#03A9F4',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
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

export default HomeScreen;
