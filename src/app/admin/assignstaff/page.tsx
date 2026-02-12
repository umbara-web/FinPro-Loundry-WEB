'use client';

import React from 'react';
import { Search, Store } from 'lucide-react';
import SidebarDashboard from '@/app/components/mainsidebar';
import { useStaffAssignment } from './hooks/useStaffAssignment';
import OutletList from './components/OutletList';
import AvailableStaff from './components/AvailableStaff';
import AssignedStaff from './components/AssignedStaff';

const StaffManagementPage = () => {
  const {
    activeTab,
    setActiveTab,
    selectedOutlet,
    selectOutlet,
    outletSearch,
    setOutletSearch,
    staffSearch,
    setStaffSearch,
    assignedStaff,
    filteredOutlets,
    availableStaff,
    assignStaff,
    unassignStaff,
  } = useStaffAssignment();

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white font-sans">
      <SidebarDashboard />

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto">
        {/* Header / Topbar */}
        <header className="h-20 border-b border-gray-800 flex items-center justify-between px-8 bg-[#0D0D0D]">
          <div className="flex items-center gap-3 text-white">
            <div className="bg-[#26E0C8] p-2 rounded-lg text-black">
              <Store size={20} />
            </div>
            <h1 className="text-xl font-bold">Laundry Management</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search anything..."
                className="bg-[#1A1A1A] border border-gray-800 rounded-lg py-2 pl-10 pr-4 w-64 focus:outline-none focus:border-gray-600"
              />
            </div>

          </div>
        </header>

        {/* Content Body */}
        <div className="p-8">
          <div className="mb-8">
            <p className="text-xs text-gray-500 mb-1">Dashboard / Admin / <span className="text-[#26E0C8]">Penempatan Staff</span></p>
            <h2 className="text-3xl font-bold text-white mb-2">Manajemen Outlet Staff</h2>
            <p className="text-gray-500">Pilih outlet dan kelola penugasan admin, pekerja, dan kurir.</p>
          </div>

          <div className="grid grid-cols-12 gap-6 h-full">

            {/* 1. DAFTAR OUTLET */}
            <OutletList
              outlets={filteredOutlets}
              selectedOutlet={selectedOutlet}
              onSelectOutlet={selectOutlet}
              searchTerm={outletSearch}
              onSearchChange={setOutletSearch}
            />

            {/* 2. STAF TERSEDIA */}
            <AvailableStaff
              selectedOutlet={selectedOutlet}
              staffList={availableStaff}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              searchTerm={staffSearch}
              onSearchChange={setStaffSearch}
              onAssign={assignStaff}
            />

            {/* 3. STAF DITUGASKAN */}
            <AssignedStaff
              assignedList={assignedStaff}
              onUnassign={unassignStaff}
            />

          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffManagementPage;