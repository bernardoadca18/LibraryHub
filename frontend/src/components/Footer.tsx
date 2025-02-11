import React from 'react'
import useAuthStore from '../services/AuthStore.ts';

const Footer = (): React.ReactNode => {
  const { darkTheme } = useAuthStore();

  const colors = darkTheme
    ? {
        background: 'bg-white',
        border: 'border-slate-200',
        text: 'text-slate-600'
      }
    : {
        
        background: 'bg-black',
        border: 'border-gray-700',
        text: 'text-gray-100'
      };

  return (
    <footer className={`${colors.background} border-t ${colors.border} mt-0`}>
      <div className={`max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center ${colors.text}`}>
        <p>© 2025 LibraryHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer