'use client';

import React from 'react';
import { useStaffAssignment } from './hooks/useStaffAssignment';
import OutletList from './components/OutletList';
import AvailableStaff from './components/AvailableStaff';
import AssignedStaff from './components/AssignedStaff';

const StaffManagementPage = () => {
  const {
    loading,
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

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#26E0C8] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
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
  );
};

export default StaffManagementPage;