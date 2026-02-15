'use client';

import { useState } from "react";
import { Plus } from "lucide-react";
import StatCard from "../_components/statcard";
import OrderTable from "../_components/ordertable";
import FilterBar from "../_components/FilterBar";
import CreateOrderModal from "../_components/CreateOrderModal";
import { useOutletOrders } from "../_hooks/useOutletOrders";
import { STATS_DATA } from "../_constants";

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
        updateOrder
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
        <div className="p-8 bg-[#121212] min-h-screen text-white font-sans">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <nav className="text-xs text-gray-500 mb-2">Home / Orders / <span className="text-gray-300">All Orders</span></nav>
                    <h1 className="text-3xl font-bold text-white mb-1">Order Management</h1>
                    <p className="text-gray-500 text-sm">Manage and track all laundry orders for Downtown Branch.</p>
                </div>
                <button
                    onClick={handleCreateOrder}
                    className="bg-[#4FD1C5] hover:bg-[#3fb9ae] text-[#121212] font-bold py-2.5 px-5 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-teal-500/10"
                >
                    <Plus size={18} strokeWidth={3} /> Create New Order
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {STATS_DATA.map((stat, i) => (
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
            />

            {/* Main Table Card */}
            <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl overflow-hidden">
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
