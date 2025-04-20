// Date utilities
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

export const formatDateTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleString();
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
};

// String utilities
export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const getFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};

// Number utilities
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('tr-TR', { 
    style: 'currency', 
    currency: 'TRY' 
  }).format(amount);
};

// Storage utilities with compatibility for different environments
// Safe localStorage implementation that works in any environment
const getStorage = () => {
  try {
    // Check if window is defined (browser environment)
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const getStorageItem = (key: string): string | null => {
  const storage = getStorage();
  if (storage) {
    try {
      return storage.getItem(key);
    } catch (e) {
      console.error('Storage error:', e);
    }
  }
  return null;
};

export const setStorageItem = (key: string, value: string): void => {
  const storage = getStorage();
  if (storage) {
    try {
      storage.setItem(key, value);
    } catch (e) {
      console.error('Storage error:', e);
    }
  }
};

export const removeStorageItem = (key: string): void => {
  const storage = getStorage();
  if (storage) {
    try {
      storage.removeItem(key);
    } catch (e) {
      console.error('Storage error:', e);
    }
  }
}; 