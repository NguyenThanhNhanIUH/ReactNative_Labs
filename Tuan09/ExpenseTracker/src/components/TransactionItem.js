import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const TransactionItem = ({ item, onPress, onLongPress }) => {
  // item chứa: title, amount, createdAt, type (income/expense)
  const isIncome = item.type === 'income';
  
  // Format số tiền
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Format ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleLongPress = () => {
    // Hiển thị menu xóa
    Alert.alert(
      'Xóa giao dịch',
      `Bạn có chắc chắn muốn xóa "${item.title}"?`,
      [
        {
          text: 'Hủy',
          style: 'cancel'
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => onLongPress && onLongPress(item)
        }
      ]
    );
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress && onPress(item)}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      {/* Indicator màu bên trái */}
      <View style={[
        styles.indicator,
        { backgroundColor: isIncome ? '#4CAF50' : '#F44336' }
      ]} />
      
      {/* Nội dung chính */}
      <View style={styles.content}>
        {/* Phần trên: Title và Type */}
        <View style={styles.topRow}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
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

        {/* Phần giữa: Amount */}
        <Text style={[
          styles.amount,
          { color: isIncome ? '#4CAF50' : '#F44336' }
        ]}>
          {isIncome ? '+' : '-'} {formatMoney(item.amount)}
        </Text>

        {/* Phần dưới: Created At */}
        <Text style={styles.date}>
          📅 {formatDate(item.createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  indicator: {
    width: 5,
  },
  content: {
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
});

export default TransactionItem;
