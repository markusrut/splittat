// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

// Auth request/response types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Receipt types
export enum ReceiptStatus {
  Processing = 'Processing',
  Ready = 'Ready',
  Failed = 'Failed',
}

export interface ReceiptItem {
  id: string;
  name: string;
  price: number;
  quantity?: number;
}

export interface Receipt {
  id: string;
  userId: string;
  merchantName: string;
  date: string;
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  imageUrl: string;
  status: ReceiptStatus;
  items: ReceiptItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ReceiptListItem {
  id: string;
  merchantName: string;
  date: string;
  total: number;
  imageUrl: string;
  status: ReceiptStatus;
  createdAt: string;
}

export interface UpdateReceiptItemsRequest {
  items: Omit<ReceiptItem, 'id'>[];
}

// API Error type
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
