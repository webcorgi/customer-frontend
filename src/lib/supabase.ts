import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabaseAdmin: SupabaseClient | null = null;
let _supabaseClient: SupabaseClient | null = null;

// 서버 사이드에서 사용할 관리자 클라이언트 (지연 초기화)
export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log('Supabase 환경변수 확인:', {
      urlExists: !!supabaseUrl,
      keyExists: !!supabaseServiceKey,
      url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'undefined'
    });

    if (!supabaseUrl || !supabaseServiceKey) {
      const error = `환경변수 누락: SUPABASE_URL=${!!supabaseUrl}, SUPABASE_SERVICE_ROLE_KEY=${!!supabaseServiceKey}`;
      console.error(error);
      throw new Error(error);
    }

    try {
      _supabaseAdmin = createClient(
        supabaseUrl,
        supabaseServiceKey,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        }
      );
      console.log('Supabase Admin 클라이언트 생성 성공');
    } catch (error) {
      console.error('Supabase Admin 클라이언트 생성 실패:', error);
      throw error;
    }
  }

  return _supabaseAdmin;
}

// 클라이언트 사이드에서 사용할 일반 클라이언트 (지연 초기화)
export function getSupabaseClient(): SupabaseClient {
  if (!_supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('SUPABASE_URL과 SUPABASE_ANON_KEY가 필요합니다. .env.local 파일을 확인하세요.');
    }

    _supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }

  return _supabaseClient;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCustomerData {
  name: string;
  email: string;
  phone?: string;
}

export interface UpdateCustomerData {
  name?: string;
  email?: string;
  phone?: string;
} 