import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getApiUrl, setApiUrl, syncToAPI } from '../services/api';
import { getTransactions } from '../services/database';

const SyncScreen = ({ navigation }) => {
  const [apiUrl, setLocalApiUrl] = useState('');
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    // Load API URL hiện tại
    setLocalApiUrl(getApiUrl());
  }, []);

  const handleSaveApiUrl = () => {
    if (!apiUrl.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập API URL');
      return;
    }

    // Validate URL
    if (!apiUrl.startsWith('http://') && !apiUrl.startsWith('https://')) {
      Alert.alert('Lỗi', 'URL phải bắt đầu bằng http:// hoặc https://');
      return;
    }

    setApiUrl(apiUrl);
    Alert.alert('Thành công', 'Đã lưu API URL mới');
  };

  const handleSync = async () => {
    Alert.alert(
      'Xác nhận đồng bộ',
      'Thao tác này sẽ:\n\n1. Xóa TẤT CẢ dữ liệu trên API\n2. Upload toàn bộ dữ liệu từ SQLite lên API\n\nBạn có chắc muốn tiếp tục?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đồng bộ',
          style: 'destructive',
          onPress: performSync
        }
      ]
    );
  };

  const performSync = async () => {
    setSyncing(true);
    try {
      // Lấy tất cả transactions từ SQLite (không bao gồm đã xóa)
      const transactions = await getTransactions();
      
      if (transactions.length === 0) {
        Alert.alert('Thông báo', 'Không có dữ liệu để đồng bộ');
        setSyncing(false);
        return;
      }

      // Đồng bộ lên API
      await syncToAPI(transactions);
      
      Alert.alert(
        'Thành công', 
        `Đã đồng bộ ${transactions.length} giao dịch lên API`
      );
    } catch (error) {
      console.error('Sync error:', error);
      Alert.alert(
        'Lỗi đồng bộ', 
        error.message || 'Không thể đồng bộ dữ liệu. Vui lòng kiểm tra API URL và thử lại.'
      );
    } finally {
      setSyncing(false);
    }
  };

  const showApiStructure = () => {
    Alert.alert(
      'Cấu trúc Table API',
      'API phải hỗ trợ các trường sau:\n\n' +
      '• title (string): Tiêu đề giao dịch\n' +
      '• amount (number): Số tiền\n' +
      '• createdAt (string): Ngày tạo (ISO format)\n' +
      '• type (string): Loại giao dịch ("income" hoặc "expense")\n\n' +
      'Ví dụ MockAPI URL:\n' +
      'https://[project-id].mockapi.io/api/expense_tracker',
      [{ text: 'OK' }]
    );
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
        <Text style={styles.headerTitle}>Đồng bộ dữ liệu</Text>
        <View style={{ width: 80 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Hướng dẫn */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📌 Hướng dẫn đồng bộ</Text>
          <Text style={styles.infoText}>
            1. Tạo API endpoint trên MockAPI.io{'\n'}
            2. Nhập URL API vào ô bên dưới{'\n'}
            3. Nhấn "Lưu API URL"{'\n'}
            4. Nhấn "Đồng bộ ngay" để upload dữ liệu
          </Text>
        </View>

        {/* Cấu trúc API */}
        <TouchableOpacity 
          style={styles.structureCard}
          onPress={showApiStructure}
        >
          <Text style={styles.structureTitle}>📋 Xem cấu trúc Table API</Text>
          <Text style={styles.structureSubtitle}>Nhấn để xem chi tiết</Text>
        </TouchableOpacity>

        {/* API URL Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>API URL</Text>
          <TextInput
            style={styles.input}
            placeholder="https://your-project.mockapi.io/api/expense_tracker"
            placeholderTextColor="#999"
            value={apiUrl}
            onChangeText={setLocalApiUrl}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveApiUrl}
          >
            <Text style={styles.saveButtonText}>💾 Lưu API URL</Text>
          </TouchableOpacity>
        </View>

        {/* Sync Button */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thao tác đồng bộ</Text>
          <TouchableOpacity
            style={[styles.syncButton, syncing && styles.syncButtonDisabled]}
            onPress={handleSync}
            disabled={syncing}
          >
            {syncing ? (
              <View style={styles.syncingContainer}>
                <ActivityIndicator color="#fff" size="small" />
                <Text style={styles.syncButtonText}>Đang đồng bộ...</Text>
              </View>
            ) : (
              <Text style={styles.syncButtonText}>🔄 Đồng bộ ngay</Text>
            )}
          </TouchableOpacity>
          
          <View style={styles.warningCard}>
            <Text style={styles.warningIcon}>⚠️</Text>
            <Text style={styles.warningText}>
              Lưu ý: Thao tác này sẽ xóa TOÀN BỘ dữ liệu cũ trên API và thay thế bằng dữ liệu từ SQLite
            </Text>
          </View>
        </View>

        {/* Thông tin hiện tại */}
        <View style={styles.currentInfoCard}>
          <Text style={styles.currentInfoTitle}>ℹ️ API đang sử dụng</Text>
          <Text style={styles.currentInfoUrl}>{getApiUrl()}</Text>
        </View>
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
  infoCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 22,
  },
  structureCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  structureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 4,
  },
  structureSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  syncButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 16,
  },
  syncButtonDisabled: {
    backgroundColor: '#9E9E9E',
  },
  syncingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  syncButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  warningCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  warningIcon: {
    fontSize: 20,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    color: '#E65100',
    lineHeight: 20,
  },
  currentInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  currentInfoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  currentInfoUrl: {
    fontSize: 13,
    color: '#6200EA',
    fontFamily: 'monospace',
  },
});

export default SyncScreen;
