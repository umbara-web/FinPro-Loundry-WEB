'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useOutlets } from './hooks/useOutlets';
import { OutletTable } from './components/OutletTable';
import { OutletFilter } from './components/OutletFilter';
import { EditOutletModal } from './components/EditOutletModal';
import { OutletFormData, Outlet } from './types';

export default function KelolaOutlet() {
  const {
    paginatedOutlets,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    cityFilter,
    setCityFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    cities,
    statusOptions,
    deleteOutlet,
    updateOutlet
  } = useOutlets();

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<OutletFormData>({
    name: '',
    address: '',
    city: '',
    manager: '',
    phone: '',
    openTime: '',
    status: 'ACTIVE'
  });

  const handleEdit = (outlet: Outlet) => {
    setEditingId(outlet.id);
    setEditFormData({
      name: outlet.name,
      address: outlet.address,
      city: outlet.city,
      manager: outlet.manager,
      phone: outlet.phone,
      openTime: outlet.openTime,
      status: outlet.status as 'ACTIVE' | 'CLOSED' | 'RENOVATION'
    });
    setShowEditModal(true);
  };

  const handleSubmitEdit = async (data: OutletFormData) => {
    if (!editingId) return;
    const success = await updateOutlet(editingId, data);
    if (success) {
      setShowEditModal(false);
      setEditingId(null);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-black mb-2 tracking-tight">Kelola Outlet</h1>
            <p className="text-gray-400">Kelola data, lokasi, dan status operasional seluruh cabang laundry.</p>
          </div>

          <Link
            href="/admin/outlet/newoutlet"
            className="bg-[#137FEC] hover:bg-blue-600 px-6 py-3 rounded-xl font-bold flex gap-2 items-center shadow-lg shadow-blue-500/20 hover:cursor-pointer transition-all"
          >
            <Plus size={20} /> Tambah Outlet Baru
          </Link>
        </div>

        <OutletFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          statusOptions={statusOptions}
          cityFilter={cityFilter}
          onCityChange={setCityFilter}
          cityOptions={cities}
        />

        <OutletTable
          outlets={paginatedOutlets}
          loading={loading}
          onEdit={handleEdit}
          onDelete={deleteOutlet}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      </div>

      <EditOutletModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        initialData={editFormData}
        onSubmit={handleSubmitEdit}
        isLoading={loading}
      />
    </div>
  );
}