'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import SidebarDashboard from '@/app/components/mainsidebar';
import Pagination from '../../components/pagination';
import OrderStats from './components/OrderStats';
import OrderFilters from './components/OrderFilters';
import OrderTable from './components/OrderTable';
import { useOrders } from './hooks/useOrders';

const AllOrderPage = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedOutlet,
    setSelectedOutlet,
    selectedStatus,
    setSelectedStatus,
    currentPage,
    setCurrentPage,
    paginatedOrders,
    totalPages,
    totalItems,
    itemsPerPage,
  } = useOrders();

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white font-sans">
      <SidebarDashboard />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Global Order Management</h1>
            <p className="text-slate-400">Manage and track orders from all laundry outlets in one place.</p>
          </div>
          <button className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700">
            <FileText size={18} /> Export Report
          </button>
        </header>

        {/* STATS CARDS */}
        <OrderStats />

        {/* TABLE SECTION */}
        <div className="bg-[#1e293b] rounded-xl border border-slate-800 overflow-hidden">
          {/* Filter Bar */}
          <OrderFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedOutlet={selectedOutlet}
            setSelectedOutlet={setSelectedOutlet}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />

          {/* Table */}
          <OrderTable orders={paginatedOrders} />

          {/* Pagination */}
          {totalItems > 0 && (
            <div className="p-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                showInfo={true}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllOrderPage;