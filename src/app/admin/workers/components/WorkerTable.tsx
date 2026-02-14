import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Worker } from '@/app/admin/workers/types';

interface WorkerTableProps {
    workers: Worker[];
    onEdit: (worker: Worker) => void;
    onDelete: (id: string | number) => void;
}

export const WorkerTable: React.FC<WorkerTableProps> = ({ workers, onEdit, onDelete }) => {
    return (
        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/30 text-slate-500 uppercase text-[10px] tracking-wider">
                    <tr>
                        <th className="px-6 py-4">Pengguna</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">No. HP</th>
                        <th className="px-6 py-4">Outlet</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                    {workers.map((worker) => (
                        <tr key={worker.id} className="hover:bg-slate-800/20 transition-colors">
                            <td className="px-6 py-4 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
                                    <img src={`https://ui-avatars.com/api/?name=${worker.name}`} alt="avatar" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">{worker.name}</p>
                                    <p className="text-xs text-slate-500 italic">{worker.email}</p>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded text-[10px] border ${worker.role === 'Admin Outlet'
                                    ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20'
                                    : worker.role === 'Pekerja'
                                        ? 'bg-blue-400/10 text-blue-400 border-blue-400/20'
                                        : 'bg-orange-400/10 text-orange-400 border-orange-400/20'
                                    }`}>
                                    {worker.role}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-slate-400">{worker.phone}</td>
                            <td className="px-6 py-4 text-slate-400 italic text-xs leading-relaxed">{worker.outlet}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)] ${worker.status === 'Active' ? 'bg-emerald-400' : 'bg-red-400'
                                        }`}></div>
                                    <span className="text-xs text-slate-300">{worker.status}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-3 text-slate-500">
                                    <button onClick={() => onEdit(worker)} className="hover:text-white transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => onDelete(worker.id)} className="hover:text-red-400 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {workers.length === 0 && (
                        <tr>
                            <td colSpan={6} className="text-center py-8 text-slate-500">Tidak ada data pengguna found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
