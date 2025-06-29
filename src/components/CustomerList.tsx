'use client';

import { useState, useEffect } from 'react';
import { List, RefreshCw, Edit, Trash2, AlertTriangle, Inbox, Loader2 } from 'lucide-react';
import { Customer } from '@/types/customer';
import { customerApi } from '@/lib/api';
import { toast } from '@/components/ToastContainer';

interface CustomerListProps {
  refreshTrigger: number;
  onEditCustomer: (customer: Customer) => void;
}

export default function CustomerList({ refreshTrigger, onEditCustomer }: CustomerListProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    customer: Customer | null;
    isDeleting: boolean;
  }>({
    isOpen: false,
    customer: null,
    isDeleting: false,
  });

  const loadCustomers = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await customerApi.getAll();
      setCustomers(data);
    } catch (err) {
      console.error('고객 목록 로드 실패:', err);
      setError(err instanceof Error ? err.message : '고객 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [refreshTrigger]);

  const handleDeleteClick = (customer: Customer) => {
    setDeleteModal({
      isOpen: true,
      customer,
      isDeleting: false,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.customer) return;

    setDeleteModal(prev => ({ ...prev, isDeleting: true }));
    
    try {
      await customerApi.delete(deleteModal.customer.id);
      toast.success('고객 삭제 완료', `${deleteModal.customer.name} 고객이 성공적으로 삭제되었습니다.`);
      setDeleteModal({ isOpen: false, customer: null, isDeleting: false });
      loadCustomers(); // 목록 새로고침
    } catch (err) {
      console.error('고객 삭제 실패:', err);
      setError(err instanceof Error ? err.message : '고객 삭제에 실패했습니다.');
      setDeleteModal(prev => ({ ...prev, isDeleting: false }));
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, customer: null, isDeleting: false });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl border-2 border-green-100 shadow-lg p-6 relative overflow-hidden">
        {/* 상단 그라디언트 스트라이프 */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" />
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl mr-3 shadow-md">
              <List className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-green-900">고객 목록</h2>
          </div>
          
          <button
            onClick={loadCustomers}
            disabled={isLoading}
            className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <RefreshCw className={`w-5 h-5 inline mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            새로고침
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <AlertTriangle className="w-5 h-5 inline mr-2" />
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">고객 목록을 불러오는 중...</p>
          </div>
        ) : customers.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-300">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full mx-auto mb-4 shadow-md">
              <Inbox className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-green-700 font-semibold text-lg mb-2">등록된 고객이 없습니다</p>
            <p className="text-gray-600">위의 폼을 사용하여 첫 번째 고객을 등록해보세요!</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl border-2 border-green-100 shadow-md">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-green-50 to-green-100 border-b-2 border-green-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">이름</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">이메일</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">전화번호</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">등록일</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-green-900">작업</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr 
                    key={customer.id} 
                    className={`border-b border-green-50 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-25 transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-green-25'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{customer.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{customer.phone || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(customer.created_at)}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => onEditCustomer(customer)}
                          className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-md"
                        >
                          <Edit className="w-4 h-4 inline mr-1" />
                          수정
                        </button>
                        <button
                          onClick={() => handleDeleteClick(customer)}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-md"
                        >
                          <Trash2 className="w-4 h-4 inline mr-1" />
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 삭제 확인 모달 */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-100 to-orange-200 px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-orange-900 flex items-center">
                <AlertTriangle className="w-6 h-6 text-orange-600 mr-2" />
                고객 삭제 확인
              </h3>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-2">
                <strong>&ldquo;{deleteModal.customer?.name}&rdquo;</strong> 고객을 정말로 삭제하시겠습니까?
              </p>
              <p className="text-red-600 font-semibold text-sm">
                이 작업은 되돌릴 수 없습니다.
              </p>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
              <button
                onClick={handleDeleteCancel}
                disabled={deleteModal.isDeleting}
                className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                취소
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleteModal.isDeleting}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleteModal.isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                    삭제 중...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 inline mr-2" />
                    삭제
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 