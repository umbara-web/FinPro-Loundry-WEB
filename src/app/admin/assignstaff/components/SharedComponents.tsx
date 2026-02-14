import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Outlet, Staff } from '@/app/admin/assignstaff/types';

export const OutletCard = ({ name, location, count, active = false, onClick }: Partial<Outlet> & { count?: string; active?: boolean; onClick?: () => void }) => (
    <div onClick={onClick} className={`p-4 rounded-xl border transition-all cursor-pointer ${active ? 'bg-[#1E2C2A] border-[#26E0C8]/50 ring-1 ring-[#26E0C8]' : 'bg-[#111] border-gray-800 hover:border-gray-700'}`}>
        <div className="flex justify-between items-start mb-1">
            <h4 className="text-sm font-bold text-white">{name}</h4>
            <div className={`w-2 h-2 rounded-full ${active ? 'bg-green-500' : 'bg-gray-600'}`}></div>
        </div>
        <p className="text-[11px] text-gray-500 mb-2 truncate">{location}</p>
        <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-gray-400">{count}</span>
    </div>
);

export const StaffRow = ({ staff, onAssign }: { staff: Staff, onAssign: (staff: Staff) => void }) => (
    <div className="flex items-center justify-between group">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border border-gray-800">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${staff.name}`} alt={staff.name} />
            </div>
            <div>
                <h5 className="text-sm font-medium text-white">{staff.name}</h5>
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${staff.role.includes('Admin') ? 'bg-purple-900/40 text-purple-400' : staff.role === 'Driver' ? 'bg-yellow-900/40 text-yellow-400' : 'bg-blue-900/40 text-blue-400'}`}>{staff.role}</span>
                    <span className="text-[11px] text-gray-600"></span>
                </div>
            </div>
        </div>
        <button
            onClick={() => onAssign(staff)}
            className="p-1.5 bg-gray-800 rounded-lg text-gray-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-700 hover:text-[#26E0C8]"
        >
            <Plus size={16} />
        </button>
    </div>
);

export const AssignedCard = ({ staff, onUnassign }: { staff: Staff, onUnassign: (staffId: number) => void }) => (
    <div className="flex items-center justify-between p-3 bg-[#111] border border-gray-800 rounded-xl">
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-800 overflow-hidden relative">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${staff.name}`} alt={staff.name} />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#111] rounded-full"></div>
            </div>
            <div>
                <h5 className="text-xs font-bold text-white">{staff.name}</h5>
                <div className="flex gap-1.5 items-center">
                    <span className="text-[9px] text-purple-400 font-bold uppercase">{staff.role}</span>
                    {/* <span className="text-[9px] text-gray-600">{staff.spec}</span> */}
                </div>
            </div>
        </div>
        <button
            onClick={() => onUnassign(staff.id)}
            className="text-gray-600 hover:text-red-400 transition-colors"
        >
            <Minus size={16} className="bg-gray-800 rounded-full p-0.5" />
        </button>
    </div>
);
