'use client';

import { useState } from 'react';
import { Users } from 'lucide-react';
import CustomerForm from '@/components/CustomerForm';
import CustomerList from '@/components/CustomerList';
import SystemStatus from '@/components/SystemStatus';
import { Customer } from '@/types/customer';

export default function HomePage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const handleCustomerSaved = () => {
    setRefreshTrigger(prev => prev + 1);
    setEditingCustomer(null);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    // 폼으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingCustomer(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl shadow-lg mr-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              고객 관리 시스템
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Next.js + Tailwind CSS로 구축된 모던한 고객 관리 시스템입니다. 
            고객 정보를 등록, 조회, 수정, 삭제할 수 있습니다.
          </p>
        </div>

        {/* 고객 등록 폼 */}
        <div className="mb-8">
          <CustomerForm
            editingCustomer={editingCustomer}
            onCustomerSaved={handleCustomerSaved}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        {/* 컨텐츠 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 고객 목록 (왼쪽 2/3) */}
          <div className="lg:col-span-2">
            <CustomerList
              refreshTrigger={refreshTrigger}
              onEditCustomer={handleEditCustomer}
            />
          </div>

          {/* 시스템 상태 (오른쪽 1/3) */}
          <div className="lg:col-span-1">
            <SystemStatus />
          </div>
        </div>

        {/* 푸터 */}
        <div className="mt-16 text-center">
          <div className="border-t border-gray-200 pt-8">
            <p className="text-gray-500 text-sm">
              © 2024 고객 관리 시스템. Built with Next.js, Tailwind CSS & NestJS
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Backend API: NestJS + Supabase | Frontend: Next.js + Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
