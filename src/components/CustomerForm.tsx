'use client';

import { useState, useEffect } from 'react';
import { UserPlus, RotateCcw, Edit, Loader2 } from 'lucide-react';
import { Customer, CreateCustomerDto } from '@/types/customer';
import { customerApi } from '@/lib/api';
import { toast } from '@/components/ToastContainer';

interface CustomerFormProps {
  editingCustomer: Customer | null;
  onCustomerSaved: () => void;
  onCancelEdit: () => void;
}

export default function CustomerForm({ 
  editingCustomer, 
  onCustomerSaved, 
  onCancelEdit 
}: CustomerFormProps) {
  const [formData, setFormData] = useState<CreateCustomerDto>({
    name: '',
    email: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingCustomer) {
      setFormData({
        name: editingCustomer.name,
        email: editingCustomer.email,
        phone: editingCustomer.phone || '',
      });
    } else {
      setFormData({ name: '', email: '', phone: '' });
    }
    setErrors({});
  }, [editingCustomer]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름은 필수입니다.';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일은 필수입니다.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const customerData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || undefined,
      };

      if (editingCustomer) {
        await customerApi.update(editingCustomer.id, customerData);
        toast.success('고객 정보 수정 완료', `${customerData.name} 고객의 정보가 성공적으로 수정되었습니다.`);
      } else {
        await customerApi.create(customerData);
        toast.success('고객 등록 완료', `${customerData.name} 고객이 성공적으로 등록되었습니다.`);
      }

      setFormData({ name: '', email: '', phone: '' });
      setErrors({});
      onCustomerSaved();
    } catch (error) {
      console.error('고객 저장 실패:', error);
      setErrors({ 
        submit: error instanceof Error ? error.message : '저장에 실패했습니다.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (editingCustomer) {
      onCancelEdit();
    } else {
      setFormData({ name: '', email: '', phone: '' });
      setErrors({});
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl border-2 border-blue-100 shadow-lg p-6 relative overflow-hidden">
      {/* 상단 그라디언트 스트라이프 */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500" />
      
      <div className="flex items-center mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl mr-3 shadow-md">
          {editingCustomer ? (
            <Edit className="w-6 h-6 text-blue-600" />
          ) : (
            <UserPlus className="w-6 h-6 text-blue-600" />
          )}
        </div>
        <h2 className="text-2xl font-semibold text-blue-900">
          {editingCustomer ? '고객 정보 수정' : '새 고객 등록'}
        </h2>
      </div>

      {errors.submit && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-blue-900 mb-2">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                errors.name 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-blue-200 focus:border-blue-500 hover:border-blue-300'
              }`}
              placeholder="고객 이름을 입력하세요"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-blue-900 mb-2">
              이메일 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                errors.email 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-blue-200 focus:border-blue-500 hover:border-blue-300'
              }`}
              placeholder="example@email.com"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-blue-900 mb-2">
            전화번호
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-blue-300"
            placeholder="010-1234-5678"
            disabled={isLoading}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                처리 중...
              </>
            ) : (
              <>
                {editingCustomer ? (
                  <Edit className="w-5 h-5 inline mr-2" />
                ) : (
                  <UserPlus className="w-5 h-5 inline mr-2" />
                )}
                {editingCustomer ? '수정 완료' : '고객 등록'}
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <RotateCcw className="w-5 h-5 inline mr-2" />
            {editingCustomer ? '수정 취소' : '초기화'}
          </button>
        </div>
      </form>
    </div>
  );
} 