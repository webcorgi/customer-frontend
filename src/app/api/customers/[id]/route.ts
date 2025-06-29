import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, UpdateCustomerData } from '@/lib/supabase';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/customers/[id] - 특정 고객 조회
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const supabase = getSupabaseAdmin();
    const { id } = params;

    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: '고객을 찾을 수 없습니다.' },
          { status: 404 }
        );
      }
      console.error('고객 조회 오류:', error);
      return NextResponse.json(
        { error: '고객 정보를 불러오는데 실패했습니다.' },
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

// PATCH /api/customers/[id] - 고객 정보 수정
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const supabase = getSupabaseAdmin();
    const { id } = params;
    const body: UpdateCustomerData = await request.json();

    // 입력 데이터 검증
    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { error: '올바른 이메일 형식을 입력해주세요.' },
          { status: 400 }
        );
      }

      // 중복 이메일 검사 (자신 제외)
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('id')
        .eq('email', body.email)
        .neq('id', id)
        .single();

      if (existingCustomer) {
        return NextResponse.json(
          { error: '이미 등록된 이메일입니다.' },
          { status: 409 }
        );
      }
    }

    // 업데이트할 데이터 준비
    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.email !== undefined) updateData.email = body.email.trim();
    if (body.phone !== undefined) updateData.phone = body.phone?.trim() || null;
    updateData.updated_at = new Date().toISOString();

    // 고객 정보 수정
    const { data, error } = await supabase
      .from('customers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: '고객을 찾을 수 없습니다.' },
          { status: 404 }
        );
      }
      console.error('고객 수정 오류:', error);
      return NextResponse.json(
        { error: '고객 정보 수정에 실패했습니다.' },
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

// DELETE /api/customers/[id] - 고객 삭제
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const supabase = getSupabaseAdmin();
    const { id } = params;

    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('고객 삭제 오류:', error);
      return NextResponse.json(
        { error: '고객 삭제에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: '고객이 성공적으로 삭제되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('서버 오류:', error);
    return NextResponse.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 