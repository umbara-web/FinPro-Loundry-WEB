'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';
import StatCard from '../_components/statcard';
import OrderTable from '../_components/ordertable';
import FilterBar from '../_components/FilterBar';
import ProsesOrderModal from '../_components/ProsesOrderModal';
import { useOutletOrders } from '../_hooks/useOutletOrders';
import { toast } from 'sonner';

export default function OrdersPage() {
  const {
    orders,
    allOrders,
    totalOrders,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    filterStatus,
    setFilterStatus,
    dateFilter,
    setDateFilter,
    employeeFilter,
    setEmployeeFilter,
    updateOrder,
    stats,
    employees,
  } = useOutletOrders();

  const [isProsesModalOpen, setIsProsesModalOpen] = useState(false);

  const handleEditOrder = (order: any) => {
    // Could open the proses modal pre-filled if needed
  };

  const handleProsesSubmit = async (orderId: string, status: string) => {
    try {
      await updateOrder(orderId, { pickupStatus: status });
      toast.success('Status order berhasil diperbarui!');
      setIsProsesModalOpen(false);
    } catch (error) {
      toast.error('Gagal memperbarui status order.');
    }
  };

  // Map orders to id/rawId pairs for the dropdown
  const orderIds = allOrders.map((o: any) => ({ id: o.id, rawId: o.rawId }));

  return (
    <div className='min-h-screen bg-[#121212] p-8 font-sans text-white'>
      {/* Header */}
      <div className='mb-8 flex items-start justify-between'>
        <div>
          <nav className='mb-2 text-xs text-gray-500'>
            Home / Orders / <span className='text-gray-300'>All Orders</span>
          </nav>
          <h1 className='mb-1 text-3xl font-bold text-white'>
            Order Management
          </h1>
          <p className='text-sm text-gray-500'>
            Manage and track all laundry orders for Downtown Branch.
          </p>
        </div>
        <button
          onClick={() => setIsProsesModalOpen(true)}
          className='flex items-center gap-2 rounded-lg bg-[#4FD1C5] px-5 py-2.5 font-bold text-[#121212] shadow-lg shadow-teal-500/10 transition-all hover:bg-[#3fb9ae]'
        >
          <Settings size={18} strokeWidth={3} /> Proses Order
        </button>
      </div>

      {/* Stats Grid */}
      <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-4'>
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        dateFilter={dateFilter}
        onDateChange={setDateFilter}
        statusFilter={filterStatus}
        onStatusChange={setFilterStatus}
        employeeFilter={employeeFilter}
        onEmployeeChange={setEmployeeFilter}
        employees={employees}
      />

      {/* Main Table Card */}
      <div className='overflow-hidden rounded-2xl border border-gray-800 bg-[#1E1E1E]'>
        <OrderTable
          orders={orders}
          totalOrders={totalOrders}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onEdit={handleEditOrder}
        />
      </div>

      <ProsesOrderModal
        isOpen={isProsesModalOpen}
        onClose={() => setIsProsesModalOpen(false)}
        onSubmit={handleProsesSubmit}
        orderIds={orderIds}
      />
    </div>
  );
}

