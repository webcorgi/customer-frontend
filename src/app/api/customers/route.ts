import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, CreateCustomerData } from '@/lib/supabase';

// GET /api/customers - 고객 목록 조회
export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('고객 조회 오류:', error);
      return NextResponse.json(
        { error: '고객 목록을 불러오는데 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('서버 오류:', error);
    return NextResponse.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST /api/customers - 고객 생성
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const body: CreateCustomerData = await request.json();

    // 입력 데이터 검증
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: '이름과 이메일은 필수입니다.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식을 입력해주세요.' },
        { status: 400 }
      );
    }

    // 중복 이메일 검사
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('email', body.email)
      .single();

    if (existingCustomer) {
      return NextResponse.json(
        { error: '이미 등록된 이메일입니다.' },
        { status: 409 }
      );
    }

    // 고객 생성
    const { data, error } = await supabase
      .from('customers')
      .insert([
        {
          name: body.name.trim(),
          email: body.email.trim(),
          phone: body.phone?.trim() || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('고객 생성 오류:', error);
      return NextResponse.json(
        { error: '고객 등록에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('서버 오류:', error);
    return NextResponse.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 