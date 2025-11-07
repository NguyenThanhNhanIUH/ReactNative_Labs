import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addTransaction, updateTransaction } from '../services/database';

const AddTransactionScreen = ({ navigation, route }) => {
  // Kiểm tra có phải đang edit không
  const editingItem = route?.params?.item;
  const isEditing = !!editingItem;

  console.log('AddTransactionScreen - isEditing:', isEditing);
  console.log('AddTransactionScreen - editingItem:', editingItem);

  const [type, setType] = useState(editingItem?.type || 'expense');
  const [title, setTitle] = useState(editingItem?.title || '');
  const [amount, setAmount] = useState(editingItem?.amount?.toString() || '');

  // Sử dụng useRef để clear input
  const titleInputRef = useRef(null);
  const amountInputRef = useRef(null);

  const handleSave = async () => {
    // Validate
    if (!title.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên khoản chi');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập số tiền hợp lệ');
      return;
    }

    try {
      const transactionData = {
        title: title.trim(),
        amount: parseFloat(amount),
        type: type,
      };

      if (isEditing) {
        // Chế độ sửa - gọi UPDATE
        await updateTransaction(editingItem.id, transactionData);
        Alert.alert('Thành công', 'Đã cập nhật giao dịch', [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            }
          }
        ]);
      } else {
        // Chế độ thêm mới
        transactionData.createdAt = new Date().toISOString();
        await addTransaction(transactionData);
        
        Alert.alert('Thành công', 'Đã thêm giao dịch mới', [
          {
            text: 'OK',
            onPress: () => {
              // Clear input sử dụng useRef
              setTitle('');
              setAmount('');
              titleInputRef.current?.clear();
              amountInputRef.current?.clear();
              
              // Quay lại màn hình chính
              navigation.goBack();
            }
          }
        ]);
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
      Alert.alert('Lỗi', 'Không thể lưu giao dịch');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditing ? 'Sửa giao dịch' : 'Thêm giao dịch'}
        </Text>
        <View style={{ width: 80 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Loại giao dịch */}
        <View style={styles.section}>
          <Text style={styles.label}>Loại giao dịch</Text>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'income' && styles.typeButtonActive,
                type === 'income' && styles.incomeActive,
              ]}
              onPress={() => setType('income')}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  type === 'income' && styles.typeButtonTextActive,
                ]}
              >
                Thu nhập
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'expense' && styles.typeButtonActive,
                type === 'expense' && styles.expenseActive,
              ]}
              onPress={() => setType('expense')}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  type === 'expense' && styles.typeButtonTextActive,
                ]}
              >
                Chi tiêu
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tên khoản chi */}
        <View style={styles.section}>
          <Text style={styles.label}>Tên khoản chi</Text>
          <TextInput
            ref={titleInputRef}
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Nhập tên khoản chi (vd: Mua đồ ăn)"
            placeholderTextColor="#999"
          />
        </View>

        {/* Số tiền */}
        <View style={styles.section}>
          <Text style={styles.label}>Số tiền (VNĐ)</Text>
          <TextInput
            ref={amountInputRef}
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="Nhập số tiền"
            placeholderTextColor="#999"
          />
        </View>

        {/* Nút Save */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
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
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#DDD',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  typeButtonActive: {
    borderColor: 'transparent',
  },
  incomeActive: {
    backgroundColor: '#4CAF50',
  },
  expenseActive: {
    backgroundColor: '#F44336',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#6200EA',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 32,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddTransactionScreen;
