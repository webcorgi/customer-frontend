import { Customer, CreateCustomerDto, UpdateCustomerDto } from '@/types/customer';

// 백엔드 NestJS API 서버 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://useless-elnora-webcorgi-31ba9f1c.koyeb.app';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new ApiError(response.status, errorData.error || errorData.message || `HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, error instanceof Error ? error.message : 'Network error');
  }
}

export const customerApi = {
  // 모든 고객 조회
  async getAll(): Promise<Customer[]> {
    return apiRequest<Customer[]>('/customers');
  },

  // 특정 고객 조회
  async getById(id: string): Promise<Customer> {
    return apiRequest<Customer>(`/customers/${id}`);
  },

  // 고객 생성
  async create(data: CreateCustomerDto): Promise<Customer> {
    return apiRequest<Customer>('/customers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 고객 수정
  async update(id: string, data: UpdateCustomerDto): Promise<Customer> {
    return apiRequest<Customer>(`/customers/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // 고객 삭제
  async delete(id: string): Promise<void> {
    return apiRequest<void>(`/customers/${id}`, {
      method: 'DELETE',
    });
  },
};

export const healthApi = {
  // 시스템 상태 확인
  async check(): Promise<{ status: string; database: { supabase: boolean; message: string } }> {
    return apiRequest<{ status: string; database: { supabase: boolean; message: string } }>('/health');
  },
}; 