import React from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { Staff, Outlet } from '../types';

interface AvailableStaffProps {
    staffList: Staff[];
    selectedOutlet: Outlet | null;
    activeTab: string;
    setActiveTab: (tab: 'all' | 'admin' | 'staff' | 'driver') => void;
    searchTerm: string;
    onSearchChange: (val: string) => void;
    onAssign: (id: number | string) => void;
}

const AvailableStaff: React.FC<AvailableStaffProps> = ({
    staffList,
    selectedOutlet,
    activeTab,
    setActiveTab,
    searchTerm,
    onSearchChange,
    onAssign
}) => {
    const tabs = [
        { id: 'all', label: 'Semua' },
        { id: 'admin', label: 'Admin' },
        { id: 'staff', label: 'Pekerja' },
        { id: 'driver', label: 'Kurir' },
    ];

    return (
        <div className="col-span-12 lg:col-span-5 bg-[#1C252E] rounded-2xl border border-gray-800 p-6 h-[calc(100vh-200px)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-bold text-lg text-white">Staff Tersedia</h3>
                    <p className="text-xs text-gray-500">Staff yang belum ditugaskan</p>
                </div>
                <div className="bg-[#131C25] p-2 rounded-lg border border-gray-800">
                    <Filter size={16} className="text-gray-400" />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-[#131C25] p-1 rounded-xl mb-4">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === tab.id
                                ? 'bg-[#26E0C8] text-black shadow-lg'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                    type="text"
                    placeholder="Cari staff..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-[#131C25] border border-gray-700 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white focus:border-[#26E0C8] outline-none"
                />
            </div>

            {/* Staff List */}
            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                {staffList.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 text-sm">
                        Tidak ada staff tersedia
                    </div>
                ) : (
                    staffList.map(staff => (
                        <div key={staff.id} className="bg-[#131C25] p-3 rounded-xl border border-gray-800 flex items-center justify-between group hover:border-gray-600 transition-all">
                            <div className="flex items-center gap-3">
                                <img src={staff.avatar} alt={staff.name} className="w-10 h-10 rounded-full border border-gray-700" />
                                <div>
                                    <h4 className="font-bold text-sm text-white">{staff.name}</h4>
                                    <span className={`text-[10px] px-2 py-0.5 rounded border ${staff.role === 'Admin Outlet' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                            staff.role === 'Driver' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                                'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                        }`}>
                                        {staff.role}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => onAssign(staff.id)}
                                disabled={!selectedOutlet}
                                className={`p-2 rounded-lg transition-all ${selectedOutlet
                                        ? 'bg-[#26E0C8] text-black hover:bg-[#20bd9d] shadow-lg shadow-[#26E0C8]/20'
                                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                    }`}
                                title={selectedOutlet ? "Assign to Outlet" : "Select an outlet first"}
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AvailableStaff;
