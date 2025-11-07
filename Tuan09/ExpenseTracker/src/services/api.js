import axios from 'axios';

// URL mặc định - có thể thay đổi bởi người dùng
let API_URL = 'https://676ad1e5863eaa5ac0de2bdb.mockapi.io/api/expense_tracker';

// Lấy API URL hiện tại
export const getApiUrl = () => API_URL;

// Cập nhật API URL
export const setApiUrl = (newUrl) => {
  API_URL = newUrl;
};

// Lấy tất cả transactions từ API
export const fetchTransactionsFromAPI = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching from API:', error);
    throw error;
  }
};

// Thêm transaction lên API
export const addTransactionToAPI = async (transaction) => {
  try {
    const response = await axios.post(API_URL, transaction);
    return response.data;
  } catch (error) {
    console.error('Error adding to API:', error);
    throw error;
  }
};

// Xóa transaction từ API
export const deleteTransactionFromAPI = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting from API:', error);
    throw error;
  }
};

// Cập nhật transaction trên API
export const updateTransactionOnAPI = async (id, transaction) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, transaction);
    return response.data;
  } catch (error) {
    console.error('Error updating API:', error);
    throw error;
  }
};

// Xóa TẤT CẢ transactions từ API
export const clearAllDataFromAPI = async () => {
  try {
    // Lấy tất cả data hiện tại
    const allData = await fetchTransactionsFromAPI();
    
    // Xóa từng item
    const deletePromises = allData.map(item => deleteTransactionFromAPI(item.id));
    await Promise.all(deletePromises);
    
    return true;
  } catch (error) {
    console.error('Error clearing API data:', error);
    throw error;
  }
};

// Đồng bộ toàn bộ dữ liệu từ SQLite lên API
// Bước 1: Xóa hết data trên API
// Bước 2: Upload toàn bộ data từ SQLite lên API
export const syncToAPI = async (transactions) => {
  try {
    // Xóa hết data cũ trên API
    await clearAllDataFromAPI();
    
    // Upload toàn bộ data mới lên
    const uploadPromises = transactions.map(transaction => {
      // Loại bỏ id và isDeleted khi sync lên API
      const { id, isDeleted, ...transactionData } = transaction;
      return addTransactionToAPI(transactionData);
    });
    
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Error syncing to API:', error);
    throw error;
  }
};
