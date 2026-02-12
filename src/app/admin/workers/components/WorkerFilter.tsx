import React from 'react';
import { Search } from 'lucide-react';

interface WorkerFilterProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    roleFilter: string;
    onRoleChange: (value: string) => void;
    statusFilter: string;
    onStatusChange: (value: string) => void;
}

export const WorkerFilter: React.FC<WorkerFilterProps> = ({
    searchTerm,
    onSearchChange,
    roleFilter,
    onRoleChange,
    statusFilter,
    onStatusChange
}) => {
    return (
        <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                    type="text"
                    placeholder="Cari nama, email, atau no. HP"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:border-emerald-400 transition-all placeholder-slate-600"
                />
            </div>
            <select
                value={roleFilter}
                onChange={(e) => onRoleChange(e.target.value)}
                className="bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-300 outline-none focus:border-emerald-400"
            >
                <option value="Semua Role">Semua Role</option>
                <option value="Admin Outlet">Admin Outlet</option>
                <option value="Pekerja">Pekerja</option>
                <option value="Driver">Driver</option>
            </select>
            <select
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value)}
                className="bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-300 outline-none focus:border-emerald-400"
            >
                <option value="Semua Status">Semua Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
        </div>
    );
};
