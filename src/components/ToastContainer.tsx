'use client';

import { useState, useCallback, useRef } from 'react';
import Toast, { ToastData } from './Toast';

export interface ToastContextType {
  showToast: (toast: Omit<ToastData, 'id'>) => void;
}

let toastCounter = 0;

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = `toast-${++toastCounter}`;
    const newToast: ToastData = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);
  }, []);

  // 전역적으로 사용할 수 있도록 window 객체에 추가
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).showToast = showToast;
  }

  return (
    <div
      ref={containerRef}
      className="fixed top-4 right-4 z-50 w-full max-w-sm space-y-2 pointer-events-none"
    >
      <div className="space-y-2 pointer-events-auto">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            toast={toast}
            onRemove={removeToast}
          />
        ))}
      </div>
    </div>
  );
}

// 전역 토스트 헬퍼 함수들
export const toast = {
  success: (title: string, message?: string) => {
    if (typeof window !== 'undefined' && (window as Window & { showToast?: (toast: Omit<ToastData, 'id'>) => void }).showToast) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).showToast({ type: 'success', title, message });
    }
  },
  error: (title: string, message?: string) => {
    if (typeof window !== 'undefined' && (window as Window & { showToast?: (toast: Omit<ToastData, 'id'>) => void }).showToast) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).showToast({ type: 'error', title, message });
    }
  },
  warning: (title: string, message?: string) => {
    if (typeof window !== 'undefined' && (window as Window & { showToast?: (toast: Omit<ToastData, 'id'>) => void }).showToast) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).showToast({ type: 'warning', title, message });
    }
  },
  info: (title: string, message?: string) => {
    if (typeof window !== 'undefined' && (window as Window & { showToast?: (toast: Omit<ToastData, 'id'>) => void }).showToast) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).showToast({ type: 'info', title, message });
    }
  },
}; 