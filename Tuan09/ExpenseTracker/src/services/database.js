import * as SQLite from 'expo-sqlite';

// Sử dụng API mới của expo-sqlite cho SDK 54
let db;

const openDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('expense_tracker.db');
  }
  return db;
};

// Khởi tạo database
export const initDatabase = async () => {
  try {
    const database = await openDatabase();
    
    // Tạo bảng nếu chưa có
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        createdAt TEXT NOT NULL,
        type TEXT NOT NULL,
        isDeleted INTEGER DEFAULT 0
      );
    `);
    
    // Kiểm tra và thêm cột isDeleted nếu chưa có (cho database cũ)
    try {
      await database.execAsync(`
        ALTER TABLE transactions ADD COLUMN isDeleted INTEGER DEFAULT 0;
      `);
      console.log('Added isDeleted column to existing table');
    } catch (error) {
      // Cột đã tồn tại, không cần thêm
      console.log('isDeleted column already exists');
    }
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Thêm transaction
export const addTransaction = async (transaction) => {
  try {
    const database = await openDatabase();
    const result = await database.runAsync(
      'INSERT INTO transactions (title, amount, createdAt, type) VALUES (?, ?, ?, ?)',
      [transaction.title, transaction.amount, transaction.createdAt, transaction.type]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

// Lấy tất cả transactions (không bao gồm đã xóa)
export const getTransactions = async () => {
  try {
    const database = await openDatabase();
    const allRows = await database.getAllAsync(
      'SELECT * FROM transactions WHERE isDeleted = 0 ORDER BY createdAt DESC'
    );
    return allRows;
  } catch (error) {
    console.error('Error getting transactions:', error);
    throw error;
  }
};

// Xóa transaction (soft delete)
export const deleteTransaction = async (id) => {
  try {
    const database = await openDatabase();
    await database.runAsync('UPDATE transactions SET isDeleted = 1 WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

// Lấy danh sách đã xóa (Trash)
export const getDeletedTransactions = async () => {
  try {
    const database = await openDatabase();
    const allRows = await database.getAllAsync(
      'SELECT * FROM transactions WHERE isDeleted = 1 ORDER BY createdAt DESC'
    );
    return allRows;
  } catch (error) {
    console.error('Error getting deleted transactions:', error);
    throw error;
  }
};

// Khôi phục transaction từ trash
export const restoreTransaction = async (id) => {
  try {
    const database = await openDatabase();
    await database.runAsync('UPDATE transactions SET isDeleted = 0 WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error restoring transaction:', error);
    throw error;
  }
};

// Cập nhật transaction
export const updateTransaction = async (id, transaction) => {
  try {
    const database = await openDatabase();
    await database.runAsync(
      'UPDATE transactions SET title = ?, amount = ?, type = ? WHERE id = ?',
      [transaction.title, transaction.amount, transaction.type, id]
    );
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

// Lấy thống kê (không tính các item đã xóa)
export const getStatistics = async () => {
  try {
    const database = await openDatabase();
    const result = await database.getFirstAsync(`
      SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as totalIncome,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as totalExpense,
        COUNT(*) as totalTransactions
      FROM transactions
      WHERE isDeleted = 0
    `);
    
    return {
      totalIncome: result?.totalIncome || 0,
      totalExpense: result?.totalExpense || 0,
      totalTransactions: result?.totalTransactions || 0,
      balance: (result?.totalIncome || 0) - (result?.totalExpense || 0)
    };
  } catch (error) {
    console.error('Error getting statistics:', error);
    throw error;
  }
};

// Lấy thống kê theo tháng cho biểu đồ
export const getMonthlyStatistics = async () => {
  try {
    const database = await openDatabase();
    const result = await database.getAllAsync(`
      SELECT 
        strftime('%Y-%m', createdAt) as month,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense
      FROM transactions
      WHERE isDeleted = 0
      GROUP BY strftime('%Y-%m', createdAt)
      ORDER BY month DESC
      LIMIT 6
    `);
    
    return result.reverse(); // Đảo ngược để hiển thị từ cũ -> mới
  } catch (error) {
    console.error('Error getting monthly statistics:', error);
    throw error;
  }
};
