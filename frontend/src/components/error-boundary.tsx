'use client';
import React from 'react';

type Props = { children: React.ReactNode };

type State = { hasError: boolean; error: any };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {}

  render() {
    if (this.state.hasError) {
      if (
        this.state.error?.message === 'BACKEND_UNAVAILABLE' ||
        this.state.error?.toString().includes('BACKEND_UNAVAILABLE')
      ) {
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="text-3xl font-bold text-blue-600 mb-4">
              Không thể kết nối tới máy chủ
            </div>
            <div className="text-slate-500 mb-6">
              Máy chủ hiện không phản hồi. Vui lòng kiểm tra lại kết nối hoặc
              thử lại sau.
            </div>
            <button
              className="px-6 py-2 rounded bg-blue-600 text-white font-semibold"
              onClick={() => window.location.reload()}
            >
              Thử lại
            </button>
          </div>
        );
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="text-2xl font-bold text-red-600 mb-4">
            Đã xảy ra lỗi không mong muốn
          </div>
          <div className="text-slate-500 mb-6">
            {this.state.error?.message || 'Unknown error'}
          </div>
          <button
            className="px-6 py-2 rounded bg-blue-600 text-white font-semibold"
            onClick={() => window.location.reload()}
          >
            Tải lại trang
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
