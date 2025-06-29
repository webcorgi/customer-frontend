export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCustomerDto {
  name: string;
  email: string;
  phone?: string | undefined;
}

export interface UpdateCustomerDto {
  name?: string;
  email?: string;
  phone?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
} 