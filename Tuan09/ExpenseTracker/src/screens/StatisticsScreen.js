import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { getMonthlyStatistics } from '../services/database';

const StatisticsScreen = ({ navigation }) => {
  const [monthlyData, setMonthlyData] = useState([]);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    loadMonthlyStats();
  }, []);

  const loadMonthlyStats = async () => {
    try {
      const data = await getMonthlyStatistics();
      setMonthlyData(data);
    } catch (error) {
      console.error('Error loading monthly statistics:', error);
    }
  };

  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K`;
    }
    return amount.toString();
  };

  const formatMonth = (monthString) => {
    // Format từ '2025-11' thành 'T11/25'
    const [year, month] = monthString.split('-');
    return `T${month}/${year.slice(2)}`;
  };

  // Chuẩn bị dữ liệu cho biểu đồ
  const chartData = {
    labels: monthlyData.length > 0 
      ? monthlyData.map(item => formatMonth(item.month))
      : ['T01', 'T02', 'T03', 'T04', 'T05', 'T06'],
    datasets: [
      {
        data: monthlyData.length > 0 
          ? monthlyData.map(item => item.income || 0)
          : [0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Green for income
        strokeWidth: 2,
      },
      {
        data: monthlyData.length > 0 
          ? monthlyData.map(item => item.expense || 0)
          : [0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`, // Red for expense
        strokeWidth: 2,
      }
    ],
    legend: ['Thu nhập', 'Chi tiêu']
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(98, 0, 234, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 0,
    formatYLabel: formatCurrency,
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#e0e0e0',
      strokeWidth: 1,
    },
    propsForLabels: {
      fontSize: 10,
    },
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
        <Text style={styles.headerTitle}>Thống kê</Text>
        <View style={{ width: 80 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>📊 Biểu đồ thu chi theo tháng</Text>
        <Text style={styles.sectionSubtitle}>6 tháng gần nhất</Text>

        {/* Line Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Biểu đồ đường</Text>
          <LineChart
            data={chartData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            withInnerLines={true}
            withOuterLines={true}
            withVerticalLines={true}
            withHorizontalLines={true}
            withDots={true}
            withShadow={false}
            fromZero={true}
          />
        </View>

        {/* Bar Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Biểu đồ cột</Text>
          <BarChart
            data={chartData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
            withInnerLines={true}
            showBarTops={false}
            fromZero={true}
            showValuesOnTopOfBars={false}
          />
        </View>

        {/* Chi tiết theo tháng */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Chi tiết theo tháng</Text>
          {monthlyData.length > 0 ? (
            monthlyData.map((item, index) => (
              <View key={index} style={styles.monthItem}>
                <Text style={styles.monthLabel}>{formatMonth(item.month)}</Text>
                <View style={styles.monthDetails}>
                  <View style={styles.amountRow}>
                    <Text style={styles.incomeLabel}>Thu:</Text>
                    <Text style={styles.incomeAmount}>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(item.income || 0)}
                    </Text>
                  </View>
                  <View style={styles.amountRow}>
                    <Text style={styles.expenseLabel}>Chi:</Text>
                    <Text style={styles.expenseAmount}>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(item.expense || 0)}
                    </Text>
                  </View>
                  <View style={styles.amountRow}>
                    <Text style={styles.balanceLabel}>Chênh lệch:</Text>
                    <Text style={[
                      styles.balanceAmount,
                      { color: (item.income - item.expense) >= 0 ? '#4CAF50' : '#F44336' }
                    ]}>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format((item.income || 0) - (item.expense || 0))}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Chưa có dữ liệu thống kê</Text>
              <Text style={styles.emptySubText}>Thêm giao dịch để xem thống kê</Text>
            </View>
          )}
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  monthItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 12,
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200EA',
    marginBottom: 8,
  },
  monthDetails: {
    gap: 6,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  incomeLabel: {
    fontSize: 14,
    color: '#666',
  },
  incomeAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  expenseLabel: {
    fontSize: 14,
    color: '#666',
  },
  expenseAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F44336',
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  balanceAmount: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
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

export default StatisticsScreen;
