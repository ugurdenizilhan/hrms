import axios from 'axios';
import { User, Employee, Department, LeaveRequest } from '../models';
import { removeStorageItem } from '../utils';
// API configuration
const API_URL = 'http://localhost:3001/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock Data
const mockUsers = [
  { id: 1, firstName: 'Ahmet', lastName: 'Yılmaz', email: 'admin@example.com', password: 'admin123', role: 'admin' }
];

// Set authentication token
export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Authentication service
export const authService = {
  login: async (email: string, password: string) => {
    try {
      // Mock response for testing - mobil uygulama için gerçek API olmadan çalışır
      const mockUser = mockUsers.find(user => user.email === email && user.password === password);
      if (mockUser) {
        return { token: 'mock-jwt-token-12345', user: mockUser };
      }
      
      // Gerçek API çağrısı - sunucu varsa çalışır
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Mock auth service error', error);
      throw error;
    }
  },
  logout: () => {
    setAuthToken('');
    removeStorageItem('token');
  },
};

// User service
export const userService = {
  getCurrentUser: async () => {
    const response = await api.get<User>('/users/me');
    return response.data;
  },
  getUsers: async () => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },
  getUserById: async (id: number) => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },
  createUser: async (user: Omit<User, 'id'>) => {
    const response = await api.post<User>('/users', user);
    return response.data;
  },
  updateUser: async (id: number, user: Partial<User>) => {
    const response = await api.put<User>(`/users/${id}`, user);
    return response.data;
  },
  deleteUser: async (id: number) => {
    await api.delete(`/users/${id}`);
  },
};

// Employee service
export const employeeService = {
  getEmployees: async () => {
    const response = await api.get<Employee[]>('/employees');
    return response.data;
  },
  getEmployeeById: async (id: number) => {
    const response = await api.get<Employee>(`/employees/${id}`);
    return response.data;
  },
  createEmployee: async (employee: Omit<Employee, 'id'>) => {
    const response = await api.post<Employee>('/employees', employee);
    return response.data;
  },
  updateEmployee: async (id: number, employee: Partial<Employee>) => {
    const response = await api.put<Employee>(`/employees/${id}`, employee);
    return response.data;
  },
  deleteEmployee: async (id: number) => {
    await api.delete(`/employees/${id}`);
  },
};

// Department service
export const departmentService = {
  getDepartments: async () => {
    const response = await api.get<Department[]>('/departments');
    return response.data;
  },
  getDepartmentById: async (id: number) => {
    const response = await api.get<Department>(`/departments/${id}`);
    return response.data;
  },
  createDepartment: async (department: Omit<Department, 'id'>) => {
    const response = await api.post<Department>('/departments', department);
    return response.data;
  },
  updateDepartment: async (id: number, department: Partial<Department>) => {
    const response = await api.put<Department>(`/departments/${id}`, department);
    return response.data;
  },
  deleteDepartment: async (id: number) => {
    await api.delete(`/departments/${id}`);
  },
};

// Leave request service
export const leaveRequestService = {
  getLeaveRequests: async () => {
    const response = await api.get<LeaveRequest[]>('/leave-requests');
    return response.data;
  },
  getLeaveRequestById: async (id: number) => {
    const response = await api.get<LeaveRequest>(`/leave-requests/${id}`);
    return response.data;
  },
  createLeaveRequest: async (leaveRequest: Omit<LeaveRequest, 'id' | 'status' | 'approvedBy'>) => {
    const response = await api.post<LeaveRequest>('/leave-requests', leaveRequest);
    return response.data;
  },
  approveLeaveRequest: async (id: number, managerId: number) => {
    const response = await api.put<LeaveRequest>(`/leave-requests/${id}/approve`, { managerId });
    return response.data;
  },
  rejectLeaveRequest: async (id: number, managerId: number) => {
    const response = await api.put<LeaveRequest>(`/leave-requests/${id}/reject`, { managerId });
    return response.data;
  },
};
