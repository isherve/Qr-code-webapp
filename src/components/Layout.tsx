
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-qr-light">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-qr-dark mb-2">QR Code Generator</h1>
          <p className="text-gray-600">Generate QR codes for your texts and URLs</p>
        </header>
        <main className="flex justify-center">
          {children}
        </main>
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>© 2025 QR Code Generator | Made wiith hervin &lovable</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
