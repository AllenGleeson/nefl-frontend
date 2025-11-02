"use client";

import { ReactNode } from 'react';
import StoreManagementHeader from './StoreManagementHeader';
import StoreManagementNav from './StoreManagementNav';

interface StoreManagementLayoutProps {
  children: ReactNode;
  currentPage: string;
  pageTitle: string;
}

export default function StoreManagementLayout({ 
  children, 
  currentPage, 
  pageTitle 
}: StoreManagementLayoutProps) {
  return (
    <div className="store-management">
      <StoreManagementHeader currentPage={currentPage} pageTitle={pageTitle} />
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <StoreManagementNav currentPage={currentPage} />
        <div className="mt-6 sm:mt-8">
          {children}
        </div>
      </div>
    </div>
  );
}
