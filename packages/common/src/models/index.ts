// User related models
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  HR_MANAGER = 'HR_MANAGER',
  EMPLOYEE = 'EMPLOYEE'
}

// Employee related models
export interface Employee {
  id: number;
  userId: number;
  departmentId: number;
  position: string;
  hireDate: string;
  salary: number;
}

// Department related models
export interface Department {
  id: number;
  name: string;
  managerId?: number;
}

// Leave request related models
export interface LeaveRequest {
  id: number;
  employeeId: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveRequestStatus;
  approvedBy?: number;
}

export enum LeaveRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
} 