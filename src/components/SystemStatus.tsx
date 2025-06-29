'use client';

import { useState, useEffect } from 'react';
import { Activity, Database, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { healthApi } from '@/lib/api';

export default function SystemStatus() {
  const [status, setStatus] = useState<{
    backend: boolean;
    database: boolean;
    lastCheck: Date | null;
    isLoading: boolean;
    message: string;
  }>({
    backend: false,
    database: false,
    lastCheck: null,
    isLoading: false,
    message: '',
  });

  const checkSystemHealth = async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    
    try {
      const result = await healthApi.check();
      setStatus({
        backend: result.status === 'ok',
        database: result.database.supabase,
        lastCheck: new Date(),
        isLoading: false,
        message: result.database.message || '',
      });
    } catch (error) {
      setStatus({
        backend: false,
        database: false,
        lastCheck: new Date(),
        isLoading: false,
        message: error instanceof Error ? error.message : '상태 확인 실패',
      });
    }
  };

  useEffect(() => {
    checkSystemHealth();
    // 30초마다 자동 체크
    const interval = setInterval(checkSystemHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatLastCheck = () => {
    if (!status.lastCheck) return '미확인';
    return status.lastCheck.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-200 shadow-lg p-6 relative overflow-hidden">
      {/* 상단 그라디언트 스트라이프 */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500" />
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl mr-3 shadow-md">
            <Activity className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-semibold text-purple-900">시스템 상태</h2>
        </div>
        
        <button
          onClick={checkSystemHealth}
          disabled={status.isLoading}
          className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <RefreshCw className={`w-5 h-5 inline mr-2 ${status.isLoading ? 'animate-spin' : ''}`} />
          새로고침
        </button>
      </div>

      <div className="space-y-4">
        {/* 백엔드 상태 */}
        <div className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg mr-3 ${
              status.backend 
                ? 'bg-green-100 text-green-600' 
                : 'bg-red-100 text-red-600'
            }`}>
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">백엔드 서버</h3>
              <p className="text-sm text-gray-600">NestJS API 서버</p>
            </div>
          </div>
          
          <div className="flex items-center">
            {status.backend ? (
              <div className="flex items-center text-green-600 font-semibold">
                <CheckCircle className="w-5 h-5 mr-2" />
                정상
              </div>
            ) : (
              <div className="flex items-center text-red-600 font-semibold">
                <XCircle className="w-5 h-5 mr-2" />
                오류
              </div>
            )}
          </div>
        </div>

        {/* 데이터베이스 상태 */}
        <div className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg mr-3 ${
              status.database 
                ? 'bg-green-100 text-green-600' 
                : 'bg-red-100 text-red-600'
            }`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">데이터베이스</h3>
              <p className="text-sm text-gray-600">Supabase PostgreSQL</p>
            </div>
          </div>
          
          <div className="flex items-center">
            {status.database ? (
              <div className="flex items-center text-green-600 font-semibold">
                <CheckCircle className="w-5 h-5 mr-2" />
                정상
              </div>
            ) : (
              <div className="flex items-center text-red-600 font-semibold">
                <XCircle className="w-5 h-5 mr-2" />
                오류
              </div>
            )}
          </div>
        </div>

        {/* 상태 메시지 */}
        {status.message && (
          <div className={`p-4 rounded-xl border-2 ${
            status.backend && status.database
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <p className="text-sm font-medium">{status.message}</p>
          </div>
        )}

        {/* 마지막 확인 시간 */}
        <div className="text-center text-sm text-gray-500 pt-2 border-t border-gray-200">
          마지막 확인: {formatLastCheck()}
        </div>
      </div>
    </div>
  );
} 