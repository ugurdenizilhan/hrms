import axios from 'axios';
import { User, Employee, Department, LeaveRequest, UserRole, LeaveRequestStatus } from '../models';
import { removeStorageItem } from '../utils';
// API configuration - Localhost yerine mock API kullan
const API_URL = 'https://hrms-mock-api.example.com/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock Data - model yapısına uygun şekilde güncellendi
const mockUsers: User[] = [
  { id: 1, firstName: 'Ahmet', lastName: 'Yılmaz', email: 'admin@example.com', role: UserRole.ADMIN }
];

const mockEmployees: Employee[] = [
  { id: 1, userId: 1, departmentId: 1, position: 'Developer', hireDate: '2023-01-15', salary: 15000 },
  { id: 2, userId: 2, departmentId: 2, position: 'Designer', hireDate: '2022-11-20', salary: 12000 }
];

const mockDepartments: Department[] = [
  { id: 1, name: 'Yazılım', managerId: 1 },
  { id: 2, name: 'Tasarım', managerId: 1 }
];

const mockLeaveRequests: LeaveRequest[] = [
  { id: 1, employeeId: 1, startDate: '2024-05-10', endDate: '2024-05-15', reason: 'Tatil', status: LeaveRequestStatus.PENDING }
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
      // Mock login - hiçbir gerçek API çağrısı yapmadan direkt mock veri döndür
      // Not: burada password kontrolü için mockUsers'tan veri aranıyor
      const mockUser = mockUsers.find(user => user.email === email);
      
      // Normalde password kontrolü backend'de yapılır, burada simüle ediyoruz
      if (mockUser && (password === 'admin123' || password === 'password')) {
        console.log('Mock login başarılı:', mockUser);
        return { token: 'mock-jwt-token-12345', user: mockUser };
      }
      
      // Hatalı giriş durumunda
      throw new Error('Geçersiz kullanıcı adı veya şifre');
    } catch (error) {
      console.error('Login hatası:', error);
      throw error;
    }
  },
  
  logout: () => {
    setAuthToken('');
    removeStorageItem('token');
  },
  
  getCurrentUser: () => {
    // Mock veri döndür
    return Promise.resolve(mockUsers[0]);
  }
};

// User service
export const userService = {
  getCurrentUser: async () => {
    // Mock veri döndür
    return mockUsers[0];
  },
  getUsers: async () => {
    // Mock veri döndür
    return mockUsers;
  },
  getUserById: async (id: number) => {
    const user = mockUsers.find(u => u.id === id);
    if (!user) throw new Error('Kullanıcı bulunamadı');
    return user;
  },
  createUser: async (user: Omit<User, 'id'>) => {
    // Simülasyon: Yeni kullanıcı oluştur
    const newUser = { ...user, id: mockUsers.length + 1 };
    mockUsers.push(newUser as User);
    return newUser as User;
  },
  updateUser: async (id: number, user: Partial<User>) => {
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) throw new Error('Kullanıcı bulunamadı');
    
    mockUsers[index] = { ...mockUsers[index], ...user };
    return mockUsers[index];
  },
  deleteUser: async (id: number) => {
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) throw new Error('Kullanıcı bulunamadı');
    
    mockUsers.splice(index, 1);
    return;
  },
};

// Employee service
export const employeeService = {
  getEmployees: async () => {
    // Mock veri döndür
    return mockEmployees;
  },
  getEmployeeById: async (id: number) => {
    const employee = mockEmployees.find(e => e.id === id);
    if (!employee) throw new Error('Çalışan bulunamadı');
    return employee;
  },
  createEmployee: async (employee: Omit<Employee, 'id'>) => {
    const newEmployee = { ...employee, id: mockEmployees.length + 1 };
    mockEmployees.push(newEmployee as Employee);
    return newEmployee as Employee;
  },
  updateEmployee: async (id: number, employee: Partial<Employee>) => {
    const index = mockEmployees.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Çalışan bulunamadı');
    
    mockEmployees[index] = { ...mockEmployees[index], ...employee };
    return mockEmployees[index];
  },
  deleteEmployee: async (id: number) => {
    const index = mockEmployees.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Çalışan bulunamadı');
    
    mockEmployees.splice(index, 1);
  }
};

// Department service
export const departmentService = {
  getDepartments: async () => {
    return mockDepartments;
  },
  getDepartmentById: async (id: number) => {
    const department = mockDepartments.find(d => d.id === id);
    if (!department) throw new Error('Departman bulunamadı');
    return department;
  },
  createDepartment: async (department: Omit<Department, 'id'>) => {
    const newDepartment = { ...department, id: mockDepartments.length + 1 };
    mockDepartments.push(newDepartment as Department);
    return newDepartment as Department;
  },
  updateDepartment: async (id: number, department: Partial<Department>) => {
    const index = mockDepartments.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Departman bulunamadı');
    
    mockDepartments[index] = { ...mockDepartments[index], ...department };
    return mockDepartments[index];
  },
  deleteDepartment: async (id: number) => {
    const index = mockDepartments.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Departman bulunamadı');
    
    mockDepartments.splice(index, 1);
  }
};

// Leave request service
export const leaveRequestService = {
  getLeaveRequests: async () => {
    return mockLeaveRequests;
  },
  getLeaveRequestById: async (id: number) => {
    const leaveRequest = mockLeaveRequests.find(lr => lr.id === id);
    if (!leaveRequest) throw new Error('İzin talebi bulunamadı');
    return leaveRequest;
  },
  createLeaveRequest: async (leaveRequest: Omit<LeaveRequest, 'id' | 'status' | 'approvedBy'>) => {
    const newLeaveRequest: LeaveRequest = { 
      ...leaveRequest, 
      id: mockLeaveRequests.length + 1,
      status: LeaveRequestStatus.PENDING
    };
    mockLeaveRequests.push(newLeaveRequest);
    return newLeaveRequest;
  },
  approveLeaveRequest: async (id: number, managerId: number) => {
    const index = mockLeaveRequests.findIndex(lr => lr.id === id);
    if (index === -1) throw new Error('İzin talebi bulunamadı');
    
    mockLeaveRequests[index] = { 
      ...mockLeaveRequests[index], 
      status: LeaveRequestStatus.APPROVED,
      approvedBy: managerId
    };
    return mockLeaveRequests[index];
  },
  rejectLeaveRequest: async (id: number, managerId: number) => {
    const index = mockLeaveRequests.findIndex(lr => lr.id === id);
    if (index === -1) throw new Error('İzin talebi bulunamadı');
    
    mockLeaveRequests[index] = { 
      ...mockLeaveRequests[index], 
      status: LeaveRequestStatus.REJECTED,
      approvedBy: managerId
    };
    return mockLeaveRequests[index];
  }
};
