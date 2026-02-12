'use client';

import React, { useState } from 'react';
import SidebarDashboard from '@/app/components/mainsidebar';
import { Plus } from 'lucide-react';
import { WorkerStats } from './components/WorkerStats';
import { WorkerTable } from './components/WorkerTable';
import { WorkerFilter } from './components/WorkerFilter';
import { AddWorkerModal } from './components/AddWorkerModal';
import { useWorkers } from './hooks/useWorkers';
import { Worker, WorkerFormData } from './types';

export default function LaundryAdmin() {
  const {
    workers,
    addWorker,
    updateWorker,
    deleteWorker,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter
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
    <div className="flex min-h-screen bg-[#0f172a] text-white font-sans">
      <SidebarDashboard />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="text-xs text-slate-500">
            Admin / <span className="text-slate-300">Kelola Pengguna</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0f172a]"></div>
              <div className="p-2 bg-slate-800 rounded-full">🔔</div>
            </div>
            <img src="https://ui-avatars.com/api/?name=Admin" alt="profile" className="w-10 h-10 rounded-full border border-slate-700" />
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
      </main>

      <AddWorkerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingWorker}
        isEdit={!!editingWorker}
      />
    </div>
  );
}