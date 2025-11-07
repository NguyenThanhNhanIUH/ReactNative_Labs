import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency } from '../utils/helpers';

const StatisticsCard = ({ statistics }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thống kê tài chính</Text>
      
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Tổng thu</Text>
          <Text style={[styles.statValue, styles.income]}>
            {formatCurrency(statistics.totalIncome)}
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Tổng chi</Text>
          <Text style={[styles.statValue, styles.expense]}>
            {formatCurrency(statistics.totalExpense)}
          </Text>
        </View>
      </View>
      
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Số dư</Text>
        <Text style={[
          styles.balanceValue,
          { color: statistics.balance >= 0 ? '#4CAF50' : '#F44336' }
        ]}>
          {formatCurrency(statistics.balance)}
        </Text>
      </View>
      
      <View style={styles.transactionCount}>
        <Text style={styles.countText}>
          Tổng giao dịch: {statistics.totalTransactions}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  title: {
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
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  income: {
    color: '#4CAF50',
  },
  expense: {
    color: '#F44336',
  },
  balanceContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  transactionCount: {
    alignItems: 'center',
  },
  countText: {
    fontSize: 13,
    color: '#999',
  },
});

export default StatisticsCard;
