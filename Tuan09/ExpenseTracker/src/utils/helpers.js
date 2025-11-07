export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getCurrentDate = () => {
  return new Date().toISOString();
};

export const INCOME_CATEGORIES = [
  'Lương',
  'Thưởng',
  'Đầu tư',
  'Kinh doanh',
  'Quà tặng',
  'Khác'
];

export const EXPENSE_CATEGORIES = [
  'Ăn uống',
  'Di chuyển',
  'Mua sắm',
  'Giải trí',
  'Hóa đơn',
  'Y tế',
  'Giáo dục',
  'Khác'
];
