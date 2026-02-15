'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import SidebarDashboard from '@/src/app/admin/allorder/components/mainsidebar';
import Pagination from '@/src/app/admin/allorder/components/pagination';
import { useItems } from './hooks/useItems';
import ItemFilters from './components/ItemFilters';
import ItemTable from './components/ItemTable';
import EditItemModal from './components/EditItemModal';

export default function ItemsPage() {
  const {
    loading,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    showEditModal,
    setShowEditModal,
    editingItem,
    editFormData,
    uniqueCategories,
    currentItems,
    totalItems,
    totalPages,
    handleDeleteItem,
    handleEditItem,
    handleEditInputChange,
    handleUpdateItem,
  } = useItems();

  return (
    <div className="flex min-h-screen bg-[#101922] font-sans text-white">
      <SidebarDashboard />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto">
          <div className="text-xs text-gray-500 mb-2">
            <span className="hover: cursor-pointer">Dashboard /</span>
            <span className="text-white">Kelola Item Laundry</span>
          </div>

          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight">
                Kelola Item Laundry
              </h1>
              <p className="text-[#92ADC9] mt-1">
                Atur daftar layanan dan kategori laundry Anda
              </p>
            </div>
            <Link href="/admin/item/additem">
              <button className="bg-[#137FEC] hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:cursor-pointer">
                <Plus size={20} strokeWidth={3} />
                Tambah Item
              </button>
            </Link>
          </div>

          {/* Search & Filter Bar */}
          <ItemFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            uniqueCategories={uniqueCategories}
          />

          {/* Table Area */}
          <div className="bg-[#1C252E] rounded-xl border border-gray-800 overflow-hidden shadow-2xl">
            <ItemTable
              items={currentItems}
              loading={loading}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />

            {/* Pagination */}
            <div className="bg-[#233648]/20 px-6 py-4 border-t border-gray-800">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                showInfo={true}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Edit Item Modal */}
      <EditItemModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleUpdateItem}
        editingItem={editingItem}
        formData={editFormData}
        onInputChange={handleEditInputChange}
      />
    </div>
  );
}