import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ErrorBoundary from '@/components/error-boundary';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

const lexend = Lexend({
  variable: '--font-lexend',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Simple Chat App',
  description: 'NestJS + Next.js demo chat',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ErrorBoundary>
        <body className={`${lexend.variable} antialiased`}>
          <Header />
          <main className="min-h-[80vh] bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center px-2 md:px-0">
            <div className="w-full max-w-5xl mx-auto">{children}</div>
          </main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </body>
      </ErrorBoundary>
    </html>
  );
}
