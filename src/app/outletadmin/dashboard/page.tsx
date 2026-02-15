'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import StatCard from '../_components/statcard';
import OrderTable from '../_components/ordertable';
import FilterBar from '../_components/FilterBar';
import CreateOrderModal from '../_components/CreateOrderModal';
import { useOutletOrders } from '../_hooks/useOutletOrders';

export default function OrdersPage() {
  const {
    orders,
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
    createOrder,
    updateOrder,
    stats,
    employees,
  } = useOutletOrders();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null); // Use existing Order type if possible

  const handleEditOrder = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCreateOrder = () => {
    setSelectedOrder(null);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (orderData: any) => {
    if (selectedOrder) {
      // Update existing order
      // We need to pass the ID. OrderData might have it if we spread initialData, but let's be safe.
      // Also need to sanitize data if `updateOrder` expects Partial<Order>.
      const { rawId, id, ...rest } = orderData; // rawId from our hook mapping
      updateOrder(selectedOrder.rawId || selectedOrder.id, rest); // Usage of rawId if available
    } else {
      // Create new order
      createOrder(orderData);
    }
    setIsModalOpen(false);
  };

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
          onClick={handleCreateOrder}
          className='flex items-center gap-2 rounded-lg bg-[#4FD1C5] px-5 py-2.5 font-bold text-[#121212] shadow-lg shadow-teal-500/10 transition-all hover:bg-[#3fb9ae]'
        >
          <Plus size={18} strokeWidth={3} /> Create New Order
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

      <CreateOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={selectedOrder}
      />
    </div>
  );
}
