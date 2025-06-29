import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

// GET /api/health - 시스템 상태 확인
export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    // Supabase 연결 테스트
    const { data, error } = await supabase
      .from('customers')
      .select('count')
      .limit(1);

    if (error) {
      console.error('데이터베이스 연결 오류:', error);
      return NextResponse.json({
        status: 'error',
        database: {
          supabase: false,
          message: '데이터베이스 연결에 실패했습니다.',
        },
      });
    }

    return NextResponse.json({
      status: 'ok',
      database: {
        supabase: true,
        message: '데이터베이스 연결이 정상입니다.',
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('헬스체크 오류:', error);
    return NextResponse.json(
      {
        status: 'error',
        database: {
          supabase: false,
          message: '시스템 상태 확인 중 오류가 발생했습니다.',
        },
      },
      { status: 500 }
    );
  }
} 