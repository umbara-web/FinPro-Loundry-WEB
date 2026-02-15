import React from 'react';
import { MinusCircle, UserCheck } from 'lucide-react';
import { Staff } from '../types';

interface AssignedStaffProps {
    assignedList: Staff[];
    onUnassign: (id: number | string) => void;
}

const AssignedStaff: React.FC<AssignedStaffProps> = ({ assignedList, onUnassign }) => {
    return (
        <div className="col-span-12 lg:col-span-4 bg-[#1C252E] rounded-2xl border border-gray-800 p-6 h-[calc(100vh-200px)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-bold text-lg text-white">Staff Ditugaskan</h3>
                    <p className="text-xs text-gray-500">Staff di outlet terpilih</p>
                </div>
                <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                    <UserCheck size={16} className="text-emerald-500" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                {assignedList.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50 border-2 border-dashed border-gray-800 rounded-xl">
                        <UserCheck size={40} className="mb-2" />
                        <p className="text-sm">Belum ada staff</p>
                        <p className="text-xs">Pilih outlet untuk melihat staff</p>
                    </div>
                ) : (
                    assignedList.map(staff => (
                        <div key={staff.id} className="bg-[#131C25] p-3 rounded-xl border border-gray-800 flex items-center justify-between group hover:border-gray-600 transition-all">
                            <div className="flex items-center gap-3">
                                <img src={staff.avatar} alt={staff.name} className="w-10 h-10 rounded-full border border-gray-700" />
                                <div>
                                    <h4 className="font-bold text-sm text-white">{staff.name}</h4>
                                    <p className="text-xs text-gray-400">{staff.role}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => onUnassign(staff.id)}
                                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                title="Remove Assignment"
                            >
                                <MinusCircle size={18} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {assignedList.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-800 text-center">
                    <p className="text-xs text-gray-500">
                        Total {assignedList.length} staff ditugaskan di outlet ini
                    </p>
                </div>
            )}
        </div>
    );
};

export default AssignedStaff;
