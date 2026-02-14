import React from 'react';
import { MapPin, Phone, Clock, Edit2, Trash2 } from 'lucide-react';
import { Outlet } from '../types';
import Pagination from '@/src/app/admin/allorder/components/pagination';

interface OutletTableProps {
    outlets: Outlet[];
    loading: boolean;
    onEdit: (outlet: Outlet) => void;
    onDelete: (id: string) => void;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemsPerPage: number;
    totalItems: number;
}

export const OutletTable: React.FC<OutletTableProps> = ({
    outlets,
    loading,
    onEdit,
    onDelete,
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    totalItems
}) => {
    return (
        <div className="bg-[#1C252E] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
            {loading ? (
                <div className="p-8 text-center text-gray-400">Loading...</div>
            ) : (
                <table className="w-full text-left">
                    <thead className="bg-[#233648]/30 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-800">
                        <tr>
                            <th className="px-8 py-5">Info Outlet</th>
                            <th className="px-6 py-5">Kontak & Manajer</th>
                            <th className="px-6 py-5">Jam Operasional</th>
                            <th className="px-6 py-5">Status</th>
                            <th className="px-6 py-5 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {outlets.map((o) => (
                            <tr key={o.id} className="hover:bg-gray-800/10 transition-all group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gray-700 rounded-xl overflow-hidden hover: cursor-pointer">
                                            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${o.name}`} alt="o" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-white">{o.name}</p>
                                            <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
                                                <MapPin size={12} /> {o.address}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <p className="text-sm font-bold">{o.manager}</p>
                                    <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
                                        <Phone size={12} /> {o.phone}
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <div className="flex items-center gap-2 bg-[#131C25] px-3 py-1.5 rounded-lg border border-gray-800 w-fit">
                                        <Clock size={14} className="text-gray-500" />
                                        <span className="text-xs font-medium text-gray-300">{o.openTime}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <StatusBadge status={o.status} />
                                </td>
                                <td className="px-6 py-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(o)}
                                            className="p-2 text-gray-500 hover:text-white transition-all hover: cursor-pointer"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(o.id)}
                                            className="p-2 text-gray-500 hover:text-red-500 transition-all hover: cursor-pointer"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {outlets.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-gray-500">Belum ada data outlet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {/* Pagination */}
            {totalItems > 0 && (
                <div className="p-6">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        showInfo={true}
                    />
                </div>
            )}
        </div>
    );
};

function StatusBadge({ status }: { status: string }) {
    const styles: any = {
        'ACTIVE': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        'CLOSED': 'bg-red-500/10 text-red-400 border-red-500/20',
        'RENOVATION': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    };
    return (
        <div className={`flex items-start gap-2 px-3 py-1 rounded-full text-[10px] font-bold border w-fit ${styles[status]}`}>
            {status === 'RENOVATION' ? '🔧' : <div className="w-1.5 h-1.5 rounded-full bg-current mt-1" />}
            {status === 'ACTIVE' ? 'Aktif' : status === 'CLOSED' ? 'Tutup' : 'Renovasi'}
        </div>
    );
}
