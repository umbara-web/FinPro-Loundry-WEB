'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { WorkerStats } from './components/WorkerStats';
import { WorkerTable } from './components/WorkerTable';
import { WorkerFilter } from './components/WorkerFilter';
import { AddWorkerModal } from './components/AddWorkerModal';
import Pagination from '@/src/app/admin/allorder/components/pagination';
import { useWorkers } from './hooks/useWorkers';
import { Worker, WorkerFormData } from './types';

export default function LaundryAdmin() {
  const {
    workers,
    outlets,
    addWorker,
    updateWorker,
    deleteWorker,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    itemsPerPage
  } = useWorkers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState<Worker | undefined>(undefined);

  const handleOpenAddModal = () => {
    setEditingWorker(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (worker: Worker) => {
    setEditingWorker(worker);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: WorkerFormData) => {
    if (editingWorker) {
      updateWorker(editingWorker.id, data);
    } else {
      addWorker(data);
    }
  };

  return (
    <div className="p-8 overflow-y-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="text-xs text-slate-500">
          Admin / <span className="text-slate-300">Kelola Pengguna</span>
        </div>
      </header>

      <section className="mb-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Manajemen Pengguna</h2>
            <p className="text-slate-400 text-sm">Kelola akun untuk Outlet Admin, Pekerja, dan Driver</p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="bg-emerald-400 hover:bg-emerald-500 text-slate-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all hover:cursor-pointer"
          >
            <Plus size={18} /> Tambah Pengguna Baru
          </button>
        </div>

        <WorkerStats />
      </section>

      <WorkerFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        roleFilter={roleFilter}
        onRoleChange={setRoleFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <WorkerTable
        workers={workers}
        onEdit={handleOpenEditModal}
        onDelete={deleteWorker}
      />

      {totalItems > 0 && (
        <div className="mt-6">
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

      <AddWorkerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingWorker}
        isEdit={!!editingWorker}
        outlets={outlets}
      />
    </div>
  );
}